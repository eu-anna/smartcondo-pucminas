import { Bd } from "./login.js";
const bd = new Bd();

document.getElementById("btnSalvar").addEventListener("click", () => {
	const nova = document.getElementById("novaSenha").value.trim();
	const conf = document.getElementById("confirmaSenha").value.trim();
	const email = document.getElementById("email").value.trim();
	const loader = document.querySelector("app-loader");

	if (!nova || nova !== conf) {
		loader.show({ message: "Senha não confere!", type: "error" });
		loader.hide(1500);
		return;
	}

	// Pega todos os registros
	const table = bd.recuperarTodosRegistros();
	const index = table.findIndex((m) => m.email === email);

	if (index === -1) {
		loader.show({ message: "Usuário não encontrado.", type: "error" });
		loader.hide(1500);
		return;
	}

	// Atualiza dados do usuário
	table[index].password = nova;
	table[index].firstLogin = false;

	const user = table[index];

	// Atualiza na tabela correta
	if (user.role === "employee") {
		const employees = JSON.parse(localStorage.getItem("smartcondo_employees")) || [];
		const empIndex = employees.findIndex((e) => e.email === email);

		if (empIndex !== -1) employees[empIndex] = user;
		localStorage.setItem("smartcondo_employees", JSON.stringify(employees));

		loader.show({ message: "Redirecionando...", type: "loading" });
		return setTimeout(() => {
			window.location.replace("../employee/dashboard.html");
		}, 1500);
	}

	if (user.role === "resident" || user.role === "syndic" || user.bond) {
		const users = JSON.parse(localStorage.getItem("smartcondo_users")) || [];
		const moradores = JSON.parse(localStorage.getItem("smartcondo_moradores")) || [];

		// Tenta atualizar primeiro em smartcondo_moradores
		let updated = false;
		const moradorIndex = moradores.findIndex((m) => m.email === email);
		if (moradorIndex !== -1) {
			moradores[moradorIndex] = user;
			localStorage.setItem("smartcondo_moradores", JSON.stringify(moradores));
			updated = true;
		}

		// Se não achou nos dinâmicos, atualiza nos estáticos
		if (!updated) {
			const userIndex = users.findIndex((u) => u.email === email);
			if (userIndex !== -1) {
				users[userIndex] = user;
				localStorage.setItem("smartcondo_users", JSON.stringify(users));
			}
		}

		loader.show({ message: "Redirecionando...", type: "loading" });
		return setTimeout(() => {
			window.location.replace("../resident/home/index.html");
		}, 1500);
	}

	// Caso o role seja inválido
	loader.show({ message: "Erro: tipo de usuário inválido.", type: "error" });
	loader.hide(2000);
});
