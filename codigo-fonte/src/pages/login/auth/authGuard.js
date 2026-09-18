
export function authGuard() {
	const user = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser"));

	// Se não estiver logado → redireciona
	if (!user) {
		showLoaderAndRedirect("../../login/login.html","Usuário não autenticado");
	}

	// Se for morador tentando acessar área de síndico
	if (
		(user.role === "resident" || user.role === "employee") &&
		window.location.pathname.includes("/syndic/")
	) {
		showLoaderAndRedirect("../../resident/home/index.html","Acesso negado. Área restrita ao síndico.");
	}

	// Se for admin tentando acessar página de redefinição de senha (por engano)
	if (
		user.role === "syndic" &&
		window.location.pathname.includes("/resetPassword/")
	) {
		showLoaderAndRedirect("../syndic/dashboard/dashboard-sindico.html","Erro de acesso!");
	}
}

function showLoaderAndRedirect(url, message) {
  // Evita duplicar o loader
  if (!document.querySelector("app-loader")) {
    document.body.insertAdjacentHTML("afterbegin", `<app-loader></app-loader>`);
  }

  const loader = document.querySelector("app-loader");
  if (loader && loader.show && loader.hide) {
    loader.show({ message, type: "loading" });

    setTimeout(() => {
      loader.hide();
      window.location.href = url;
    }, 1500); // 1.5s de delay para suavizar
  } else {
    // fallback caso o componente ainda não esteja carregado
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="simple-loader">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>
    `);
    setTimeout(() => {
      window.location.replace = url;
    }, 1500);
  }
}
