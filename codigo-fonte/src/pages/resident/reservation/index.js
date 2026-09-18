import { renderListReservation } from "../../syndic/reservation/js/middlewares/renderListReservation.js";
import { closeModal, openModal } from "../../syndic/reservation/js/modal/reservationModal.js";
import { dbReady } from "../../syndic/reservation/js/db/dbSetup.js";

document.addEventListener("DOMContentLoaded", async () => {
		// Garante que o banco esteja pronto antes de continuar
	await dbReady;

	const modalButton = document.querySelectorAll(".openModalBtn");
	const buttonCloseModal = document.getElementById("btnClose");

	modalButton.forEach(button => {
		button.addEventListener("click", ()=>{
			const target = button.dataset.target;
			openModal({target})
		})
	});

	buttonCloseModal.addEventListener("click", () => closeModal());
	renderListReservation();
});
