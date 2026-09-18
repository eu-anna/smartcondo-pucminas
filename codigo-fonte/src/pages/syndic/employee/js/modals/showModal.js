import { EmployeeRepository } from "../repository/employee.js";
import { functionCrud } from "../middlewares/employeeCrud.js";

export function openModal(id = null) {
	let currentEditId = null;
	const employeeRepository = new EmployeeRepository();
	const modalOverlay = document.querySelector(".modalOverlay");
	const btnSave = document.querySelector(".btnSave");
	const inputs = document.querySelectorAll("input");
	inputs.forEach(input => input.value = "");

	modalOverlay.classList.add("active");

	if (id) {
		currentEditId = id;
		const emp = employeeRepository.getById(id);
		if (!emp) return alert("Funcionário não encontrado!");

		document.querySelector("#name").value = emp.name;
		document.querySelector("#cpf").value = emp.cpf;
		document.querySelector("#email").value = emp.email;
		document.querySelector("#startTime").value = emp.startTime;
		document.querySelector("#endTime").value = emp.endTime;
		document.querySelector("#position").value = emp.position;
		document.querySelector("#contact").value = emp.contact;
	} else {
		currentEditId = null;
	}

	const newBtn = btnSave.cloneNode(true);
	btnSave.parentNode.replaceChild(newBtn, btnSave);

	newBtn.addEventListener("click", () => {
		if (currentEditId) functionCrud.updateEmployee(currentEditId);
		else functionCrud.recordEmployee();
	});
}

export function closeModal() {
	document.querySelector(".modalOverlay").classList.remove("active");
}
