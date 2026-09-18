import { DbSetup } from "../db/dbSetup.js";

const db = new DbSetup();

export function getAllRecords() {
	return db.getTable();
}

export function getRecordsById(id) {
	return db.getTableById(id);
}

export function addRecords(record) {
	return db.addRecord(record);
}

export function updateRecords(id, data) {
	return db.updateTable(id, data);
}

export function deleteRecords(id) {
	return db.deleteRecord(id);
}
