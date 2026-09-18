import { authGuard } from "../../../login/auth/authGuard.js";
import { renderListReservation } from "../js/middlewares/renderListReservation.js";
import { closeModal, openModal } from "../js/modal/reservationModal.js";
import { dbReady } from "./db/dbSetup.js";


document.addEventListener("DOMContentLoaded", async () => {
	authGuard();
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
