import { getAllRecords } from "../../repository/repository.js";
import { formatDate } from "../../utils/dateUtils.js";

const loggedUser = JSON.parse(
	sessionStorage.getItem("smartcondo_loggedInUser")
);
const userId = loggedUser ? String(loggedUser.id) : null;

export function renderCalendar({ space, month, year }) {
	const calendarDays = document.getElementById("calendarDays");
	calendarDays.innerHTML = "";

	const reservations = getAllRecords();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	for (let i = 0; i < firstDay; i++) {
		const empty = document.createElement("div");
		calendarDays.appendChild(empty);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const dateStr = formatDate(year, month + 1, day);
		const dayDiv = document.createElement("div");
		dayDiv.classList.add("day");
		dayDiv.textContent = day;

		if (day == new Date().getDate()) dayDiv.classList.add("today");

		const reservation = reservations.find((res) => {
			return (
				res.dateInit === dateStr &&
				res.space === space &&
				String(res.authorId) !== String(userId)
			);
		});

		const myReservation = reservations.find((res) => {
			return (
				res.dateInit === dateStr &&
				res.space === space &&
				String(res.authorId) === String(userId)
			);
		});

		setStatusDay(reservation, myReservation, dayDiv, userId);

		if (
			["reserved", "approved", "pending"].some((cls) =>
				dayDiv.classList.contains(cls)
			)
		) {
			dayDiv.style.pointerEvents = "none";
		}

		dayDiv.addEventListener("click", () => setDate(dayDiv, month, year));

		calendarDays.appendChild(dayDiv);
	}
}

export function initCalendar({ space }) {
	const monthSelect = document.getElementById("monthSelect");

	const monthNames = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	monthSelect.innerHTML = "";

	// Preenche o select com os meses
	monthNames.forEach((month, index) => {
		const option = document.createElement("option");
		option.value = index;
		option.textContent = month;
		monthSelect.appendChild(option);
	});

	// Define o mês atual no select
	const currentDate = new Date();
	monthSelect.value = currentDate.getMonth();

	// Renderiza o calendário ao iniciar
	renderCalendar({
		space,
		month: currentDate.getMonth(),
		year: currentDate.getFullYear(),
	});

	// Atualiza o calendário ao trocar o mês
	monthSelect.addEventListener("change", () => {
		const year = new Date().getFullYear();
		const month = parseInt(monthSelect.value);
		renderCalendar({ space, month, year });
	});
}

function setDate(day, month, year) {
	day.classList.toggle("active");

	const startDate = document.getElementById("dateInit");
	const endDate = document.getElementById("dateFinished");

	const formattedMonth = String(month + 1).padStart(2, "0");
	const formattedDay = String(day.innerText).padStart(2, "0");

	const currentDate = `${year}-${formattedMonth}-${formattedDay}`;

	if (startDate.value !== "") {
		endDate.value = currentDate;
	} else {
		startDate.value = currentDate;
		endDate.value = currentDate;
	}
}

function setStatusDay(reservation, myReservation, dayDiv, userId = null) {
	if (reservation) {
		if (["pending", "approved"].includes(reservation.status)) {
			dayDiv.classList.add("reserved");
		}
	}
	if (myReservation) {
		if (["pending", "approved"].includes(myReservation.status)) {
			dayDiv.classList.add(myReservation.status);
		} else if (
			myReservation.status === "rejected" ||
			myReservation.status === "reject"
		) {
			dayDiv.classList.add("rejected");
		}
	}
}
