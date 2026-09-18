import { authGuard } from "../login/auth/authGuard.js";
// ---------- EXTENSÃO PARA CARREGAR OCORRÊNCIAS COMPARTILHADAS  ----------

// Sobrescreve a função renderOccurrenceCards para incluir ocorrências do localStorage
const originalRenderOccurrenceCards = renderOccurrenceCards;
renderOccurrenceCards = function () {
	// Chama a função original primeiro
	originalRenderOccurrenceCards();

	// Adiciona ocorrências do localStorage (de moradores/síndicos)
	const sharedOccurrences =
		JSON.parse(localStorage.getItem("occurrences")) || [];
	const container = document.getElementById("occurrenceCardsContainer");

	// Adiciona apenas as novas ocorrências (evita duplicatas)
	sharedOccurrences.forEach((occ) => {
		// Verifica se já existe no container (para não duplicar)
		const existingCard = container.querySelector(`[data-id="${occ.id}"]`);
		if (!existingCard) {
			const card = document.createElement("div");
			card.className = "occurrence-card";
			card.setAttribute("data-id", occ.id); // Atributo para identificar

			let statusClass = "";
			switch (occ.status.toLowerCase()) {
				case "pendente":
					statusClass = "status-pendente";
					break;
				case "resolvido":
					statusClass = "status-resolvido";
					break;
				case "em andamento":
					statusClass = "status-em-andamento";
					break;
				default:
					statusClass = "";
			}

			card.innerHTML = `
        <strong>${occ.title}</strong>
        <small>Registrado em ${occ.date} por ${
				occ.createdBy || "Usuário"
			}</small>
        <span class="status-pill ${statusClass}">${occ.status}</span>
      `;

			container.appendChild(card);
		}
	});
};

// Sobrescreve handleOccurrenceSubmit para salvar no localStorage
const originalHandleOccurrenceSubmit = handleOccurrenceSubmit;
handleOccurrenceSubmit = function (event) {
	// Chama a função original
	originalHandleOccurrenceSubmit(event);

	// Após o processamento original, salva no localStorage
	const title = document.getElementById("occTitle").value.trim();
	const category = document.getElementById("occCategory").value;
	const description = document.getElementById("occDescription").value.trim();

	if (title && category && description) {
		const user = JSON.parse(localStorage.getItem("usuarioLogado"));
		const sharedOccurrences =
			JSON.parse(localStorage.getItem("occurrences")) || [];
		const newId = sharedOccurrences.length
			? sharedOccurrences[sharedOccurrences.length - 1].id + 1
			: 1;
		const now = new Date();
		const todayFormatted = now.toLocaleDateString("pt-BR");

		const newOccurrence = {
			id: newId,
			title,
			category,
			description,
			date: todayFormatted,
			status: "Pendente",
			createdBy: user ? user.name : "Funcionário",
		};

		sharedOccurrences.push(newOccurrence);
		localStorage.setItem("occurrences", JSON.stringify(sharedOccurrences));
	}
};

// Adiciona verificação de acesso no carregamento da página (sem modificar o original)
document.addEventListener("DOMContentLoaded", () => {
	authGuard(); //Verfica se tem usuario logado


	/*   const user = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!user) {
    alert('Faça login primeiro!');
    window.location.href = '../login/login.html';
    return;
  }
  if (user.role !== 'employee' && user.role !== 'syndic') {
    alert('Acesso negado! Apenas funcionários ou síndicos podem acessar.');
    window.location.href = '../login/login.html';
    return;
  }

  // Atualiza nome do usuário dinamicamente
  const userName = document.getElementById('userName');
  if (userName && user) {
    userName.textContent = `${user.name}, ${user.role}`;
  } */

	// Renderiza ocorrências compartilhadas
	renderOccurrenceCards();
});

// Corrige o logout para o caminho correto
document.getElementById("btnLogout").onclick = () => {
	if (confirm("Deseja realmente sair?")) {
		window.location.href = "../../login/login.html"; // Direcionamento correto para a pagina de login
	}
};


