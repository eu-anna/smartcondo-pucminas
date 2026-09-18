//Importa funcao que faz acesso ao dados.
import "../../../../../components/loader/loader.js";
import { getAllRecords } from "../repository/repository.js";
import { deleteRecord } from "./delete.js";
import { showConfirm } from "../../../../../js/modal/showConfirm.js";
import { loaderData } from "./update.js";

//Listar todos os cadastros e mostra em tela

export function renderList() {
	const { listTable, list, myListRender, listMenu, AllUsers, syndicId } =
		accessLocalStorage();

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

	if(list) list.innerHTML = "";
	if(myListRender) myListRender.innerHTML = "";
	if(listMenu) listMenu.innerHTML = "";

	loadCategories(AllUsers);

	// Filtra as notificações enviadas pelo sindico
	const notificationsFromTheBuildingManager = listTable.filter(
		(m) =>
			(m.authorId == syndicId)
	);

	//Filtra as notificações enviadas pelo morador
	const notificationsFromResidents = listTable.filter(
		(m) => m.authorId != syndicId
	);

	//Mostra as notificações enviadas pelo sindico
	if (notificationsFromTheBuildingManager) {
		sentByTheBuildingManager(
			notificationsFromTheBuildingManager,
			categories,
			myListRender,
			listMenu
		);
	}

	//Mostra as notificações enviadas pelo morador
	if (notificationsFromResidents) {
		sentByTheBuildingResident(
			notificationsFromResidents,
			categories,
			list,
			listMenu
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

	// Ao clicar marca a mensagem como lida
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

//Acessando dados armazenados no storage.

function accessLocalStorage() {
	const DB_KEY = "smartcondo_moradores";

	// Dados principais
	const listTable = getAllRecords();
	const list = document.getElementById("listRender");
	const myListRender = document.getElementById("myListRender");
	const listMenu = document.getElementById("listRenderMenu");

		// Dados locais
	const standardUsers = JSON.parse(localStorage.getItem("smartcondo_users")) || [];
	const employees = JSON.parse(localStorage.getItem("smartcondo_employees")) || [];
	const registeredUsers = JSON.parse(localStorage.getItem(DB_KEY)) || [];

	// Usuário síndico
	const syndic = standardUsers.filter(
		(u) => u.role === "syndic"
	);
	const syndicId = syndic[0] ? syndic[0].id : null;

	// Usuário logado
	const userLogged = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser"));



	// Une ambas as listas sem duplicar (baseado em 'id')
	const combined = [...standardUsers,...employees ,...registeredUsers];
	const uniqueUsers = Array.from(new Map(combined.map((u) => [u.id, u])).values());

	return {
		listTable,
		list,
		myListRender,
		listMenu,
		userLogged,
		AllUsers: uniqueUsers,
		syndicId,
	};
}

// Função para formatar nomes corretamente (ex: "joão da silva" -> "João Da Silva")
function formatName(name = "") {
	return name
		.toLowerCase()
		.split(" ")
		.filter((w) => w.trim() !== "")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

// Carrega categorias de usuários no select (moradores e funcionários)
function loadCategories(users) {
	const categories = document.getElementById("selectTo");
	if (!categories) return;

	categories.innerHTML = ""; // limpa o select

	// Criar grupos separados
	const residentsGroup = document.createElement("optgroup");
	residentsGroup.label = "Moradores";

	const employeesGroup = document.createElement("optgroup");
	employeesGroup.label = "Funcionários";

	// Adiciona opção padrão "Todos"
	const allOption = document.createElement("option");
	allOption.value = "all";
	allOption.textContent = "Todos";
	categories.appendChild(allOption);

	// Filtra os usuários (exclui o síndico)
	const sendUsers = users.filter((u) => u.role !== "syndic");

	sendUsers.forEach((u) => {
		const option = document.createElement("option");

		// Nome formatado
		const fullName = formatName(u.name || `${u.firstName || ""} ${u.lastName || ""}`);

		// Identificação por tipo
		if (u.role === "resident" || u.bond) {
			option.value = u.id;
			option.textContent = `${fullName} (${u.unit ? "Morador " + u.unit : "Morador"})`;
			residentsGroup.appendChild(option);
		} else if (u.role === "employee") {
			option.value = u.id;
			option.textContent = `${fullName} (${u.position ? "Funcionário " + u.position : "Funcionário"})`;
			employeesGroup.appendChild(option);
		}
	});

	// Anexa os grupos ao select
	if (residentsGroup.children.length > 0) categories.appendChild(residentsGroup);
	if (employeesGroup.children.length > 0) categories.appendChild(employeesGroup);
}

function sentByTheBuildingResident(
	notificationsFromResidents,
	categories,
	list,
	listMenu
) {
	if (list) {
		notificationsFromResidents.forEach((element) => {
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

			listMenu.innerHTML = "";
			const li = document.createElement("li");
			li.dataset.id = element.id;
			li.classList.add("list");

			if (newNotification != "" && newNotification != undefined) {
				li.classList.add(newNotification);
			}

			li.innerHTML = `
			<div class="icons">
			<div class="alert">${iconIsOpen}</div>
			<div><img src="../../../assets/icon/${icon}.svg" alt="icone"></div>
			<div><strong>${element.title}</strong></div>
			</div>
			<div><p>${element.text}</p></div>
			<div><strong>(de: ${element.targetName})</strong></div>
		`;
			list.appendChild(li);
		});
	}
}

function sentByTheBuildingManager(
	notificationsFromTheBuildingManager,
	categories,
	myListRender,
	listMenu
) {
	if (myListRender) {
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
			listMenu.innerHTML = "";
			const li = document.createElement("li");
			li.dataset.id = element.id;
			li.classList.add("list");

			if (newNotification != "" && newNotification != undefined) {
				li.classList.add(newNotification);
			}
			li.innerHTML = "";
			li.innerHTML = `
			<div class="icons">
			<div class="alert">${iconIsOpen}</div>
			<div><img src="../../../assets/icon/${icon}.svg" alt="icone"></div>
			<div><strong>${element.title}</strong></div>
			</div>
			<div><p>${element.text}</p></div>
			<div><strong>(para: ${element.targetName})</strong></div>

			<div class="actions">
				<button class="btn-edit")">
          			<img src="../../../assets/icon/edit.svg" alt="Editar">
        		</button>
        		<button class="btn-delete">
          			<img src="../../../assets/icon/delete.svg" alt="Excluir">
        		</button>
			</div>
		`;
			// Adiciona eventos
			li.querySelector(".btn-edit").addEventListener("click", () =>
				loaderData({ id: element.id })
			);
			li.querySelector(".btn-delete").addEventListener(
				"click",
				async () => {
					const confirmDelete = await showConfirm(
						"Você tem certeza que deseja excluir esta reserva?"
					);
					if (confirmDelete) {
						deleteRecord(element.id);
						appLoader.show();
						appLoader.hide(1000);
						renderList();
					}
				}
			);

			myListRender.appendChild(li);
		});
	}
}
