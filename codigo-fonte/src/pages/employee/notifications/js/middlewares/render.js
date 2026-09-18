//Importa funcao que faz acesso ao dados.
import "../../../../../components/loader/loader.js";
import { getAllRecords } from "../repository/repository.js";

//Listar todos os cadastros e mostra em tela

export function renderList(limit = null) {
	const listTable = getAllRecords();

	const list = document.getElementById("listRender");
	const myListRender = document.getElementById("myListRender");
	const listMenu = document.getElementById("listRenderMenu");

	//Acessando dados do usuário
	const userLogged = JSON.parse(
		sessionStorage.getItem("smartcondo_loggedInUser")
	);

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

	list.innerHTML = "";

	if (myListRender) myListRender.innerHTML = "";

	// Se houver limite, pega só os últimos 'limit' registros
	const recordsToRender = limit
		? listTable.slice(-limit) // pega os últimos itens
		: listTable;

	// Filtra as notificações enviadas pelo sindico
	const notificationsFromTheBuildingManager = recordsToRender.filter(
		(m) =>
			(m.authorId != userLogged.id && m.targetIdOrAll == userLogged.id) ||
			m.targetIdOrAll === "allEmployees"
	);

	//Filtra as notificações enviadas pelo morador
	const notificationsFromLoggedUser = recordsToRender.filter(
		(m) => m.authorId === userLogged.id
	);

	//Mostra as notificações enviadas pelo sindico
	if (notificationsFromTheBuildingManager) {
		sentByTheBuildingResident(
			notificationsFromTheBuildingManager,
			categories,
			list
		);
	}

	//Mostra as notificações enviadas pelo morador
	if (
		notificationsFromLoggedUser ||
		notificationsFromLoggedUser.length != 0
	) {
		sentByTheBuildingManager(
			notificationsFromLoggedUser,
			categories,
			myListRender
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
    		<img src="../../assets/icon/${value}.svg" alt="${key}">
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

			localStorage.setItem("notifications", JSON.stringify(listTable));
		});
	});
}

function sentByTheBuildingManager(
	notificationsFromLoggedUser,
	categories,
	myListRender
) {
	if (notificationsFromLoggedUser.length > 0) {
		notificationsFromLoggedUser.forEach((element) => {
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
			li.classList.add("list");

			if (newNotification != "" && newNotification != undefined) {
				li.classList.add(newNotification);
			}

			li.innerHTML = `
			<div>
			<div class="alert">${iconIsOpen}</div>
			<img src="../../assets/icon/${icon}.svg" alt="icone">
			</div>
			<strong>${element.title}</strong>
			<p>${element.text}</p>
		`;
			myListRender.appendChild(li);
		});
	} else {
		const li = document.createElement("li");
		li.innerHTML = `
			<strong>Nenhuma mensagem</strong>
		`;
		myListRender.appendChild(li);
	}
}
function sentByTheBuildingResident(
	notificationsFromTheBuildingManager,
	categories,
	list
) {
	console.log(notificationsFromTheBuildingManager);
	if (notificationsFromTheBuildingManager.length > 0) {
		notificationsFromTheBuildingManager.forEach((element) => {
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
			<div>
			<div class="alert">${iconIsOpen}</div>
			<img src="../../assets/icon/${icon}.svg" alt="icone">
			</div>
			<strong>${element.title}</strong>
			<p>${element.text}</p>
		`;

			list.appendChild(li);
		});
	} else {
		const li = document.createElement("li");
		li.innerHTML = `
			<strong>Nenhuma mensagem</strong>
		`;
		list.appendChild(li);
	}
}
