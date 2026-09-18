import { authGuard } from "../../../login/auth/authGuard.js";
import { functionCrud } from "./middlewares/employeeCrud.js";
import { openModal, closeModal } from "./modals/showModal.js";
import {
	EmployeeRepository,
	EmployeeRepositoryReady,
} from "./repository/employee.js";
import { searchEmployee } from "./utils/searchEmployees.js";

document.addEventListener("DOMContentLoaded", async () => {
	authGuard();
	await EmployeeRepositoryReady;
	const modalButton = document.querySelector(".openModalBtn");
	const buttonCloseModal = document.getElementById("btnClose");
	const search = document.querySelector(".searchInput");

	modalButton.addEventListener("click", () => openModal());
	buttonCloseModal.addEventListener("click", () => closeModal());
	search.addEventListener("keyup", () => searchEmployee());

	functionCrud.renderEmployeeList();
});

export const Repository = new EmployeeRepository();
