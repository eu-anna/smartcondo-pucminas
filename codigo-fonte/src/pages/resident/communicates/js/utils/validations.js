export function validate(data) {
	let isValid = true;
	clearFieldErrors();

	if (!data.title || data.title.value === '') showFieldError(data.title, "O título é obrigatório"), isValid = false;
	if (!data.text || data.text.value === '') showFieldError(data.text, "O texto é obrigatório"), isValid = false;
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
	inputEl.style.border = "1px";
	inputEl.style.borderStyle = "solid";
	inputEl.style.borderColor = "red";
}

export function clearFieldErrors() {
	document.querySelectorAll(".error-message").forEach(el => el.remove());
	document.querySelectorAll("input").forEach(input => (input.style.borderColor = "#ddd"));
}
