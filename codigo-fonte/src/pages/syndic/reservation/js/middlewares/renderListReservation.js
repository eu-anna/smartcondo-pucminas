//Importa funcao que faz acesso ao dados.
import { getAllRecords, deleteRecords } from "../repository/repository.js";
import { openModal } from "../modal/reservationModal.js";
import { showConfirm } from "../../../../../js/modal/showConfirm.js";
import "../../../../../components/loader/loader.js";

//Listar todos os cadastros e mostra em tela
export function renderListReservation() {
	const listTable = getAllRecords();
	const list = document.getElementById("listReservation");
	const loggedUser = JSON.parse(
		sessionStorage.getItem("smartcondo_loggedInUser")
	);

	//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	list.innerHTML = "";
	const now = new Date();
	const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

	const filtered = listTable.filter(
		(m) =>
			String(m.authorId) === String(loggedUser.id) &&
			parseYMDToUTC(m.dateInit) > todayUTC
	);

	if (filtered === "" || !filtered || filtered.length == 0) {
		const li = document.createElement("li");
		li.classList.add("cardList");

		li.innerHTML = `
		<div>Você ainda não tem nenhuma reserva!</div>
		`;

		list.appendChild(li);
	}

	filtered.forEach((element) => {
		const date = new Date(element.dateInit);
		const day = String(date.getDate() + 1).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const dateInit = `${day}/${month}`;
		const date2 = new Date(element.dateFinished);
		const day2 = String(date2.getDate() + 1).padStart(2, "0");
		const month2 = String(date2.getMonth() + 1).padStart(2, "0");
		const finished = `${day2}/${month2}`;
		let status = "";

		if (element.status == "pending") {
			status = "Pendente";
		} else if (element.status == "approved") {
			status = "Aprovado";
		} else if (element.status == "reject" || element.status == "rejected") {
			status = "Rejeitado";
		}

		const dateCurrent = `
			De <strong>${dateInit}</strong> ás ${element.startTime} até <strong>${finished}</strong> ás ${element.endTime}
  		`;

		const li = document.createElement("li");
		li.classList.add("cardList");

		//Mostra em tela as reservas
		li.innerHTML = `
			<div class="info">
				<div>${element.space}</div> <div>${dateCurrent}</div>
			</div>

			<div class="actions">
			<span class="infoStatus ${element.status}">${status}</span>
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
			openModal({ id: element.id })
		);
		li.querySelector(".btn-delete").addEventListener("click", async () => {
			const confirmDelete = await showConfirm(
				"Você tem certeza que deseja excluir esta reserva?"
			);
			if (confirmDelete) {
				deleteRecords(element.id);
				appLoader.show();
				appLoader.hide(1000);
				renderListReservation();
			}
		});

		list.appendChild(li);
	});
}

function parseYMDToUTC(dateStr) {
	// espera "YYYY-MM-DD"
	const [y, m, d] = dateStr.split("-").map(Number);
	// retorna timestamp em ms da meia-noite UTC daquela data
	return Date.UTC(y, m - 1, d);
}
