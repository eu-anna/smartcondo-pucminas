import { mascaraSaida } from "../../../js/utils/cpf.js";
import { validatedEmail } from "../../../js/utils/validatedEmail.js";
import { StorageManager } from "./storage.js"; // ← seu módulo utilitário

export class Bd {
	constructor() {
		document.addEventListener("DOMContentLoaded", () => this.init());
		this.nameTable = "smartcondo_users";
		this.DB_KEY = "smartcondo_moradores";

		// Recupera o email lembrado (com fallback seguro)
		const rememberedEmail = StorageManager.getItem(
			"rememberedEmail",
			"local"
		);
		const lembrar = document.getElementById("lembrar");
		if (rememberedEmail && lembrar) {
			document.getElementById("email").value = rememberedEmail;
			lembrar.checked = true;
		}

		// Garante que a tabela dinâmica exista
		if (!StorageManager.getItem(this.DB_KEY, "local"))
			StorageManager.setItem(this.DB_KEY, [], "local");
	}

	recuperarTodosRegistros() {
		try {
			const standardUsers =
				StorageManager.getItem(this.nameTable, "local") || [];
			const registeredUsers =
				StorageManager.getItem(this.DB_KEY, "local") || [];
			const employeeList =
				StorageManager.getItem("smartcondo_employees", "local") || [];

			if (
				!Array.isArray(standardUsers) ||
				!Array.isArray(registeredUsers) ||
				!Array.isArray(employeeList)
			) {
				console.error("Erro: dados corrompidos no localStorage");
				return [];
			}

			return [...standardUsers, ...employeeList, ...registeredUsers];
		} catch (e) {
			console.error("Erro ao recuperar registros:", e);
			return [];
		}
	}

	async init() {
		try {
			const response = await fetch("../../db/db.json");
			const data = await response.json();
			if (!StorageManager.getItem(this.nameTable, "local")) {
				StorageManager.setItem(
					this.nameTable,
					data[this.nameTable] || [],
					"local"
				);
			}
		} catch (error) {
			console.error("Erro ao carregar base estática:", error);
		}
	}
}

const db = new Bd();

export async function login(event) {
	event.preventDefault();
	const loader = document.querySelector("app-loader");

	try {
		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();
		const lembrarCheckbox = document.getElementById("lembrar");
		const list = db.recuperarTodosRegistros();

		const adminName = "lidianer@gmail.com";
		const adminSenha = "12345";

		if (!email) {
			loader.show({ message: "Preencha o campo email!", type: "error" });
			loader.hide(1500);
			return;
		}
		if (!password) {
			loader.show({ message: "Preencha o campo senha!", type: "error" });
			loader.hide(1500);
			return;
		}

		if (!validatedEmail(email)) {
			loader.show({
				message: "Por favor digite o email corretamente",
				type: "error",
			});
			loader.hide(1500);
			return;
		}

		// Salvar/Remover email lembrado usando StorageManager
		if (lembrarCheckbox.checked) {
			StorageManager.setItem("rememberedEmail", email, "local");
		} else {
			StorageManager.removeItem("rememberedEmail", "local");
		}

		const syndic = list.find(
			(m) => m.email?.toLowerCase() === email.toLowerCase()
		);

		// Login do síndico
		if (
			email === adminName &&
			password === adminSenha &&
			syndic?.role === "syndic"
		) {
			const userData = {
				id: syndic.id,
				name: syndic.name,
				unit: syndic.unit,
				role: syndic.role,
			};

			StorageManager.setItem(
				"smartcondo_loggedInUser",
				userData,
				"session"
			);

			loader.show({ message: "Redirecionando..." });
			return setTimeout(() => {
				window.location.replace(
					"../syndic/dashboard/dashboard-sindico.html"
				);
			}, 1500);
		}

		//Login morador ou funcionário
		let user = null;
		let passwordError = null;
		let existRecord = null;

		if (Array.isArray(list) && list.length > 0) {
			passwordError = list.find(
				(m) =>
					m.email?.toLowerCase() === email.toLowerCase() &&
					m.password?.toLowerCase() !== password &&
					m.password !== ""
			);

			existRecord = list.find(
				(m) => m.email?.toLowerCase() === email.toLowerCase()
			);

			if (!existRecord) {
				loader.show({
					message: "Não existe um cadastro com o email informado!",
					type: "error",
				});
				loader.hide(1500);
				return;
			}

			user = list.find(
				(m) =>
					m.email?.toLowerCase() === email.toLowerCase() &&
					m.password?.toLowerCase() === password
			);

			if (!user) {
				user = list.find(
					(m) =>
						m.email?.toLowerCase() === email.toLowerCase() &&
						m.firstLogin
				);
			}

			if (!user) {
				user = list.find(
					(m) =>
						m.email?.toLowerCase() === email.toLowerCase() &&
						m.password?.toLowerCase() === ""
				);
			}

			if (!user && passwordError) {
				loader.show({ message: "Senha incorreta!", type: "error" });
				loader.hide(1500);
				return;
			}
		} else {
			loader.show({
				message: "Erro no banco de dados, nenhum usuário encontrado!",
				type: "error",
			});
			loader.hide(1500);
			return;
		}

		if (!user) {
			loader.show({
				message: "Email ou senha incorretos",
				type: "error",
			});
			loader.hide(1500);
			return;
		}

		const userData = {
			id: user.id,
			name: user.name || user.firstName,
			role: user.role || "resident",
			unit: user.unit || "",
		};

		StorageManager.setItem("smartcondo_loggedInUser", userData, "session");

		loader.show({ message: "Redirecionando..." });
		console.log(user);
		if (user.firstLogin) {
			setTimeout(() => {
				window.location.replace("../login/resetPassword.html");
			}, 1600);
		} else if (
			user.role === "resident" ||
			user.bond === "Proprietário" ||
			(user.bond === "Inquilino" && user.firstLogin === false)
		) {
			setTimeout(() => {
				window.location.replace("../resident/home/index.html");
			}, 1600);
		} else if (user.role === "employee" && user.firstLogin === false) {
			setTimeout(() => {
				window.location.replace("../employee/dashboard.html");
			}, 1600);
		} else {
			loader.show({
				message:
					"Erro no redirecionamento, tente novamente em alguns minutos...",
				type: "error",
			});
			setTimeout(() => {
				window.location.replace("../login/login.html");
			}, 1600);
		}
	} catch (error) {
		console.error("Erro inesperado no login:", error);
		loader.show({
			message: "Ocorreu um erro inesperado ao tentar fazer login.",
			type: "error",
		});
		loader.hide(2000);
	}
}
