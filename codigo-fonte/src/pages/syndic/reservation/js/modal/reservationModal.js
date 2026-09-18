import { initCalendar } from "../components/calendar/calendar.js";
import { update } from "../middlewares/update.js";
import { getRecordsById } from "../repository/repository.js";
import { records } from "../middlewares/records.js";
import { renderListReservation } from "../middlewares/renderListReservation.js";

export function openModal({ id = null, target = null }) {
	let currentEditId = null;
	const modal = document.querySelector(".modalOverlay");
	const btnSave = document.querySelector(".btnSave");
	const select = document.querySelector("#selectSpace");
	const inputs = document.querySelectorAll("input");

	// Limpando os inputs
	inputs.forEach((input) => (input.value = ""));
	select.value = "";

	let space = null;

	if (target === "salao") space = "Salão de festas";
	if (target === "gourmet") space = "Espaço gourmet";
	if (target === "quadra") space = "Quadra";

	if (space) select.value = space;

	// Renderiza o calendário ao iniciar
	initCalendar({ space });

	modal.classList.add("active");

	if (id) {
		currentEditId = id;
		const editTable = getRecordsById(id);

		if (!editTable) return alert("Funcionário não encontrado!");

		document.getElementById("selectSpace").value = editTable.space;
		document.getElementById("dateInit").value = editTable.dateInit;
		document.getElementById("dateFinished").value = editTable.dateFinished;
		document.getElementById("startTime").value = editTable.startTime;
		document.getElementById("endTime").value = editTable.endTime;
	} else {
		currentEditId = null;
	}
	//Removendo Listeners
	const newBtn = btnSave.cloneNode(false);
	while (btnSave.firstChild) newBtn.appendChild(btnSave.firstChild);
	btnSave.replaceWith(newBtn);

	newBtn.addEventListener("click", () => {
		if (currentEditId) update(currentEditId);
		else {
			records();
			renderListReservation();
		}
	});
	/* 	btnSave.replaceWith(btnSave.cloneNode(true));
	const newBtn = document.querySelector(".btnSave"); */

	/* 	newBtn.addEventListener("click", () => {
		if (currentEditId)
			update(currentEditId);
		else {
			records();
			renderListReservation();
		}
	}); */
}

export function closeModal() {
	document.querySelector(".modalOverlay").classList.remove("active");
}
