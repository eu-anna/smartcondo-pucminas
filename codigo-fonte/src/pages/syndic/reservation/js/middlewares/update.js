import { updateRecords } from "../repository/repository.js";
import { renderListReservation } from "../middlewares/renderListReservation.js";
import { currentReservation } from "../utils/dateUtils.js";
import "../../../../../components/loader/loader.js";

export function update(id) {
	const space = document.getElementById("selectSpace").value;
	const dateInit = document.getElementById("dateInit").value;
	const dateFinished = document.getElementById("dateFinished").value;
	const startTime = document.getElementById("startTime").value || "10:00";
	const endTime = document.getElementById("endTime").value || "22:00";

	//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	if (currentReservation(dateInit, dateFinished)) return;

	const data = {
		space,
		dateInit,
		dateFinished,
		startTime,
		endTime,
	};

	appLoader.show();
	appLoader.hide(1000);

	updateRecords(id, data);
	document.querySelector(".modalOverlay").classList.remove("active");
	renderListReservation();
}
