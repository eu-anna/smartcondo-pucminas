export function validateEmployee(data) {
	let isValid = true;
	clearFieldErrors();

	if (!data.name.value.trim())
		showFieldError(data.name, "O nome é obrigatório"), (isValid = false);
	if (!data.cpf.value.trim())
		showFieldError(data.cpf, "O CPF é obrigatório"), (isValid = false);
	if (!data.email.value.trim())
		showFieldError(data.email, "O e-mail é obrigatório"), (isValid = false);
	if (!data.position.value.trim())
		showFieldError(data.position, "Informe o cargo"), (isValid = false);
	if (!data.contact.value.trim())
		showFieldError(data.contact, "Informe o contato"), (isValid = false);
	if (!validarHoraMinuto(data.startTime.value))
		showFieldError(data.startTime, "Informe a hora corretamente ex: 07:00"),
			(isValid = false);
	if (!validarHoraMinuto(data.endTime.value))
		showFieldError(data.endTime, "Informe a hora corretamente ex 19:00"),
			(isValid = false);

	return isValid;
}

export function showFieldError(inputEl, message) {
	const parent = inputEl.closest(".form-group");
	if (!parent) return;
	const oldError = parent.querySelector(".error-message");
	if (oldError) oldError.remove();

	const error = document.createElement("span");
	error.classList.add("error-message");
	error.textContent = message;
	parent.appendChild(error);
	inputEl.style.borderColor = "red";
}

export function clearFieldErrors() {
	document.querySelectorAll(".error-message").forEach((el) => el.remove());
	document
		.querySelectorAll("input")
		.forEach((input) => (input.style.borderColor = "#ddd"));
}

function validarHoraMinuto(current) {
	if (current != "") {
		const s = String(current).trim(); // garante string sem espaços
		// regex: horas 0-23 (com ou sem zero à esquerda) : minutos 00-59
		const re = /^(?:[01]?\d|2[0-3]):[0-5]\d$/;
		return re.test(s);
	}
}

export function formatToHHMM(input) {
	const s = String(input.value).trim();
	// tenta casar H:MM ou HH:MM
	const m = s.match(/^([0-2]?\d):([0-5]?\d)$/);
	if (!m) return null;
	let h = Number(m[1]);
	let min = Number(m[2]);
	if (h > 23 || min > 59) return null;
	return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}
