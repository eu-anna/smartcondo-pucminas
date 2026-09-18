import { authGuard } from "../../../login/auth/authGuard.js";
import { renderList } from "./middlewares/render.js";
import { dbReady } from "./db/dbSetup.js";
import { newNotification } from "./middlewares/create.js";
const btnNewNotification = document.getElementById("btnNewNotification");

document.addEventListener("DOMContentLoaded", async () => {
	authGuard();
	// Garante que o banco esteja pronto antes de continuar
	await dbReady;
	renderList();

	const btnOpen = document.getElementById("received");
	const btnClose = document.getElementById("sent");
	const containerList = document.querySelector(".containerList");
	const myContainerList = document.querySelector(".my.containerList");

	if (btnOpen) {
		btnOpen.addEventListener("click", () => {
			containerList.setAttribute("isVisible", "show");
			myContainerList.setAttribute("isVisible", "hide");

			btnOpen.classList.add("active");
			btnClose.classList.remove("active");
		});
	}
	if (btnClose) {
		btnClose.addEventListener("click", () => {
			containerList.setAttribute("isVisible", "hide");
			myContainerList.setAttribute("isVisible", "show");

			btnOpen.classList.remove("active");
			btnClose.classList.add("active");
		});
	}
	if (btnNewNotification) {
		btnNewNotification.addEventListener("click", (event) => {
			newNotification(event);
		});
	}
});
