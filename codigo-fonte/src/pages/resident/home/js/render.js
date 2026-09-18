//Importa funcao que faz acesso ao dados.
import "../../../../components/loader/loader.js";
import { getAllRecords } from "../../../syndic/communicates/js/repository/repository.js";

//Listar todos os cadastros e mostra em tela

export function renderList(limit = null) {
	const listTable = getAllRecords();
	const list = document.getElementById("listRender");
	const listMenu = document.getElementById("listRenderMenu");

	//Acessando dados do usuário
	const userLogged = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser") || []);

	//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	const categories = {
		comunicado: "rectangle",
		reserva: "reservation",
		seguranca: "securityShield",
		financeiro: "money",
		assembleia: "greekTemple",
		ocorrencia: "tools",
		evento: "partyPopper",
		mensagem: "emailOpen",
	};

	if(list){
		list.innerHTML = "";
	}

	// Se houver limite, pega só os últimos 'limit' registros
	const recordsToRender = limit
		? listTable.slice(-limit) // pega os últimos itens
		: listTable;

	// Filtra as notificações enviadas pelo sindico
	const notificationsFromTheBuildingManager = recordsToRender.filter(
		(m) =>
			(m.authorId != userLogged.id && m.targetIdOrAll == userLogged.id) ||
			m.targetIdOrAll === "all"
	);

	//Mostra as notificações enviadas pelo sindico
	if (notificationsFromTheBuildingManager) {
		sentByTheBuildingResident(
			notificationsFromTheBuildingManager,
			categories,
			list
		);
	}

	//Exibi uma referencia com todas as categorias de mensagens que podem ser enviadas
	// Carrega  a lista de categorias para enviar uma nova notificação.

	if (listMenu) {
		const selectTarget = document.getElementById("selectTarget");
		listMenu.innerHTML = "";

		Object.entries(categories).forEach(([key, value]) => {
			const li = document.createElement("li");

			li.innerHTML = `
			<img src="../../../assets/icon/${value}.svg" alt="${key}">
			 <strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong>
		`;

			listMenu.appendChild(li);

			const newOption = document.createElement("option");
			newOption.setAttribute("value", key);
			newOption.innerText = key.charAt(0).toUpperCase() + key.slice(1);

			selectTarget.appendChild(newOption);
		});
	}

	// Seleciona todas as notificações
	const listActive = document.querySelectorAll("#listRender .list");
	listActive.forEach((m) => {
		m.addEventListener("click", () => {
			m.classList.toggle("active");
			m.querySelector(".alert").innerText = "✅";

			const id = m.dataset.id;
			const index = listTable.findIndex(
				(n) => String(n.id) == String(id)
			);
			if (index === -1) return false;
			listTable[index].isNewNotification = false;

			localStorage.setItem("smartcondo_notifications", JSON.stringify(listTable));
		});
	});
}

function sentByTheBuildingResident(
	notificationsFromTheBuildingManager,
	categories,
	list
) {
	const newNotification = notificationsFromTheBuildingManager.filter(
		(e) => e.isNewNotification === true
	);
	const titlePage = document.createElement("h4");
	titlePage.innerText = "Novas notificações";

	if (newNotification.length <= 0) {
		titlePage.innerText = "Você não tem notificações!";

		list.appendChild(titlePage);
	}

	newNotification.forEach((element) => {
		const category = element.category;
		const icon = categories[category] || "default-icon"; // fallback
		let iconIsOpen = "❗";
		let newNotification;

		if (element.isNewNotification === true) {
			newNotification = "active";
			iconIsOpen = "❗";
		} else {
			iconIsOpen = "✅";
		}

		const li = document.createElement("li");
		li.dataset.id = element.id;
		li.classList.add("list");

		if (newNotification != "" && newNotification != undefined) {
			li.classList.add(newNotification);
		}

		li.innerHTML = `
			<div class="alert">${iconIsOpen}</div>
			<img src="../../../assets/icon/${icon}.svg" alt="icone">
			<strong>${element.title}</strong>
			<p>${element.text}</p>
		`;

		list.insertBefore(titlePage, list.firstChild)
		list.appendChild(li);
	});
}
