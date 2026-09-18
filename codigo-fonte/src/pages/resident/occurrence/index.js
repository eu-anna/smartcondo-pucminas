import { authGuard } from "../../login/auth/authGuard.js";
import { renderList } from "./js/render.js";

window.addEventListener("DOMContentLoaded", () => {
	authGuard(); //Válida a página e garante que o usuario esta logado
	renderList(3); //Lista os ultimos 3 cadastros
	renderModalReservation(); // Carrega o modal com minhas reservas

	const btnNewReservation = document.querySelector(".newReservation");
	btnNewReservation.addEventListener("click", () => {
		window.location.href = "../reservation/reservation.html";
	});
	const btnNewOccurrence = document.querySelector(".newOccurrence");
	btnNewOccurrence.addEventListener("click", () => {
		window.location.href = "./dashboard/dashboard-resident-occurrence.html";
	});
});

function renderModalReservation() {
	const userLogged = JSON.parse(
		sessionStorage.getItem("smartcondo_loggedInUser")
	);

	const reservation = localStorage.getItem("smartcondo_reservations")
		? JSON.parse(localStorage.getItem("smartcondo_reservations"))
		: [];

	const modalReservation = document.querySelector(".reservations");
	modalReservation.innerHTML = "";

	const myReservation = reservation?.filter(
		(m) => m.authorId == userLogged.id
	);

	if (!myReservation || myReservation.length <= 0) {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = "";

		card.innerHTML = `
			<img src="../../../assets/icon/calendar.svg" alt="" />
				<div class="info">
					<h4>Você ainda não cadastrou nenhuma reserva!</h4>
				</div>
		`;
		modalReservation.appendChild(card);
	}

	myReservation.forEach((e) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = "";

		card.innerHTML = `
			<img src="../../../assets/icon/calendar.svg" alt="" />
				<div class="info">
					<h4>${e.space}</h4>
					<span>Data: ${e.dateInit}</span>
					<span>Horário: ${e.startTime}</span>
				</div>
				<a class="chevronRight" href="#">
					<img
					src="../../../assets/icon/chevron-right.svg" alt=""/>
				</a>

		`;
		modalReservation.appendChild(card);
	});
}
