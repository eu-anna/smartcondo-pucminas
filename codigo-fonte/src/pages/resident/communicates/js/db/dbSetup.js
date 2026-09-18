export class DbSetup {

	constructor() {
		this.nameTable = "smartcondo_notifications";
	}

	async init() {
		const response = await fetch("../../../db/db.json");
		const data = await response.json();

		if (!localStorage.getItem(this.nameTable)) {
			localStorage.setItem(
				this.nameTable,
				JSON.stringify(data[this.nameTable] || [])
			);
		}
	}

	// Função para buscar todos os dados de uma tabela
	getTable() {
		return JSON.parse(localStorage.getItem(this.nameTable)) || [];
	}

	// Função para buscar um dado específico na tabela
	getTableById(id) {
		const table = JSON.parse(localStorage.getItem(this.nameTable)) || [];
		return table.find((i) => i.id === id);
	}

	// Função para salvar uma tabela
	saveTable(tableName, data) {
		localStorage.setItem(tableName, JSON.stringify(data));
	}

	// Função para adicionar um novo item
	addRecord(record) {
		const table = this.getTable();
		table.push(record);
		this.saveTable(this.nameTable, table);
	}

	// Função para editar uma tabela
	updateTable(id, data) {
		const table = this.getTable();
		const index = table.findIndex((item) => String(item.id) === String(id));

		if (index === -1) {
			console.warn(`Notificação com ID ${id} não encontrado.`);
			return false;
		}

		// Atualiza apenas os campos enviados
		table[index] = { ...table[index], ...data };

		this.saveTable(this.nameTable, table);

		console.log(`Notificação ${id} atualizado com sucesso!`);
		return true;
	}

	// Função para deletar uma tabela
	deleteRecord(id) {
		const table = this.getTable().filter((item) => item.id !== id);
		this.saveTable(this.nameTable, table);
	}
}

// Exporta uma instância já inicializada como Promise
export const dbReady = (async () => {
	const db = new DbSetup();
	await db.init();
	return db;
})();
