import { addRecords } from "../repository/repository.js";
import { currentReservation } from "../utils/dateUtils.js";
import "../../../../../components/loader/loader.js";


export function records() {
	const id = crypto.randomUUID().split("-").join("");
	const space = document.getElementById("selectSpace").value;
	const dateInit = document.getElementById("dateInit").value;
	const dateFinished = document.getElementById("dateFinished").value;
	const startTime = document.getElementById("startTime").value || "10:00";
	const endTime = document.getElementById("endTime").value || "22:00";
	const modalOverlay = document.querySelector(".modalOverlay");

		// Obtém dados do usuário logado
	const loggedUser = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser"));

	//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	if (
		!space ||
		!dateInit ||
		!dateFinished ||
		(space == "" || dateInit == "", dateFinished == "")
	) {
		appLoader.show({
			message: "Preencha todos os campos obrigatórios!",
			type: "error",
		});
		appLoader.hide(1500);
		return;
	}

	if (currentReservation(dateInit, dateFinished)) return;

	// Caso não exista (por segurança)
	if (!loggedUser || !loggedUser.name) {
		appLoader.show({
			message: "Erro ao identificar usuário logado!",
			type: "error",
		});
		appLoader.hide(2000);
		return;
	}

	// Adiciona o nome ao registro
	const record = {
		id,
		space,
		dateInit,
		dateFinished,
		startTime,
		endTime,
		authorId: loggedUser.id,
		authorName: loggedUser.name, //nome do usuário logado
		status: "pending",
		dateRegistered: new Date().toDateString(),
	};


	modalOverlay.classList.remove("active");
	appLoader.show({
		message: "Reserva salva com sucesso!",
		type: "success",
	});

	addRecords(record);

	appLoader.hide(1100);
}
