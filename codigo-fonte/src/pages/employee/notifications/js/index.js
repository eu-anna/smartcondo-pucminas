import { authGuard } from "../../../login/auth/authGuard.js";
import { renderList } from "../js/middlewares/render.js";
import { dbReady } from "../js/db/dbSetup.js";
import { newNotification } from "../js/middlewares/create.js";


document.addEventListener("DOMContentLoaded", async () => {
	authGuard();
		// Garante que o banco esteja pronto antes de continuar
	await dbReady;
	renderList();

	const btnOpen = document.getElementById('open');
	const btnClose = document.getElementById('close');
	const containerList = document.querySelector(".myNotifications")
	btnOpen.addEventListener('click', ()=>{
		btnOpen.style.display = 'none';
		btnClose.style.display = 'block';
		containerList.classList.add("active");
	});

	btnClose.addEventListener('click', ()=>{
		btnOpen.style.display = 'block';
		btnClose.style.display = 'none';
		containerList.classList.remove("active");
	});

	document.getElementById("btnNewNotification").addEventListener("click", (event) =>{
		newNotification(event);
	} )
});
