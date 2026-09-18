import { authGuard } from "../../../../login/auth/authGuard.js";

export class EmployeeRepository {
	constructor() {
		authGuard();
		this.nameTable = "smartcondo_employees";
	}

	async init() {

		const response = await fetch("../../../db/db.json");
		const data = await response.json();

		if (!localStorage.getItem(this.nameTable)) {
			localStorage.setItem(this.nameTable, JSON.stringify(data[this.nameTable] || []));
		}
	}

	getAll() {
		return JSON.parse(localStorage.getItem(this.nameTable)) || [];
	}

	getById(id) {
		return this.getAll().find(item => item.id === id);
	}

	saveAll(data) {
		localStorage.setItem(this.nameTable, JSON.stringify(data));
	}

	add(record) {
		const table = this.getAll();
		table.push(record);
		this.saveAll(table);
	}

	update(id, newData) {
		const table = this.getAll();
		const index = table.findIndex(item => String(item.id) === String(id));
		if (index === -1) return false;
		table[index] = { ...table[index], ...newData };
		this.saveAll(table);
		return true;
	}

	delete(id) {
		const table = this.getAll().filter(item => item.id !== id);
		this.saveAll(table);
	}
}

export const EmployeeRepositoryReady = (async () => {
	const db = new EmployeeRepository();
	await db.init();
	return db;
})();
