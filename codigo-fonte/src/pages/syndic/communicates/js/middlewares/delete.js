import { getAllRecords, deleteRecords } from "../repository/repository.js";

export function deleteRecord(id) {
		deleteRecords(id);
		getAllRecords();
		alert("Sua reserva foi excluída com sucesso!");

}
