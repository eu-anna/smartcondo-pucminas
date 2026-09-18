function loginMorador(email, senha) {
    const bd = new Bd();
    const moradores = bd.recuperarTodosRegistros();

    const morador = moradores.find(m => m.email === email && m.password === senha);

    if (morador) {
        localStorage.setItem("usuarioLogado", JSON.stringify(morador));
        alert(`Bem-vindo, ${morador.firstName}!`);
        window.location.href = "dashboard-morador.html"; // ou a página que você quiser
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

document.getElementById("btnLogin").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();
    loginMorador(email, senha);
});
