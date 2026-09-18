export function verify(email, cpf) {
	const employees = JSON.parse(localStorage.getItem("smartcondo_employees")) || [];
	const residents =
		JSON.parse(localStorage.getItem("smartcondo_moradores")) || [];
	const combined = [...employees, ...residents];
	let message = false;

	const existRecordEmail = combined.filter(
		(m) => m.email === email.value.trim()
	);
	const existRecordCPF = combined.filter((m) => m.cpf === cpf.value.trim());

	if (existRecordCPF.length != 0) {
		return message = `Já existe um usuário com o cpf ${cpf.value.trim()}`;

	}
	if (existRecordEmail.length != 0) {
		return message = `Já existe um usuário com o email ${email.value.trim()}`;

	}

	return message;
}
