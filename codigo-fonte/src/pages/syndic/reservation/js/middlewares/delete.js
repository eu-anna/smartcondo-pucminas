import { getAllRecords, deleteRecords } from "../repository/repository";

export function deleteRecord(id) {
		deleteRecords(id);
		getAllRecords();
		alert("Sua reserva foi excluída com sucesso!");

}
