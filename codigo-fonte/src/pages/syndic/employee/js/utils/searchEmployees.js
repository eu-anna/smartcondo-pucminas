import { Repository } from "../index.js";
import { functionCrud } from "../middlewares/employeeCrud.js";

export function searchEmployee() {
	const searchInput = document.querySelector(".searchInput");
	const searchValue = searchInput.value.trim().toLowerCase();
	const listEmployee = document.getElementById("listEmployee");
	const employees = Repository.getAll();

	listEmployee.innerHTML = "";

	// 🔹 Se o campo estiver vazio, renderiza a lista completa
	if (searchValue === "") {
		functionCrud.renderAllEmployees(employees, listEmployee);
		return;
	}

	// 🔹 Filtra por nome OU cargo
	const filtered = employees.filter((emp) => {
		const nameMatch = emp.name.toLowerCase().includes(searchValue);
		const positionMatch = emp.position.toLowerCase().includes(searchValue);
		return nameMatch || positionMatch;
	});

	// 🔹 Se não houver resultados
	if (filtered.length === 0) {
		const li = document.createElement("li");
		li.classList.add("card", "empty");
		li.textContent = "Nenhum funcionário encontrado.";
		listEmployee.appendChild(li);
		return;
	}

	// 🔹 Renderiza os resultados encontrados
	functionCrud.renderAllEmployees(filtered, listEmployee);
}
