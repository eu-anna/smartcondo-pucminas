import { Repository } from "../index.js";
import { showConfirm } from "../../../../../js/modal/showConfirm.js";
import { openModal, closeModal } from "../modals/showModal.js";
import { Employee } from "../models/employee.js";
import { validateEmployee, formatToHHMM } from "../utils/validations.js";
import {
	validaCPF,
	mascaraEntrada,
	mascaraSaida,
} from "../../../../../js/utils/cpf.js";
import { verify } from "../utils/verifyEmailCpf.js";
class FunctionsCrud {
	//Renderizar em tela todos os cadastros
	renderEmployeeList() {
		const listEmployee = document.getElementById("listEmployee");
		const employees = Repository.getAll();

		listEmployee.innerHTML = "";

		employees.forEach((employee) => {
			const li = document.createElement("li");
			li.classList.add("card");
			li.innerHTML = `
			<div class="info"><strong>Nome:</strong> ${employee.name}</div>
			<div class="info"><strong>Cpf:</strong> ${mascaraEntrada(employee.cpf)}</div>
			<div class="info"><strong>Email:</strong> ${employee.email}</div>
			<div class="info"><strong>Turno:</strong> ${employee.startTime} as ${
				employee.endTime
			}
			</div>
			<div class="info"><strong>Cargo:</strong> ${employee.position}</div>
			<div class="info"><strong>Contato:</strong> ${employee.contact}</div>
			<div class="actions">
				<button class="btn-edit">
					<img src="../../../assets/icon/edit.svg" alt="Editar">
				</button>
				<button class="btn-delete">
					<img src="../../../assets/icon/delete.svg" alt="Excluir">
				</button>
			</div>
		`;

			// Adiciona eventos
			li.querySelector(".btn-edit").addEventListener("click", () =>
				openModal(employee.id)
			);
			li.querySelector(".btn-delete").addEventListener(
				"click",
				async () => {
					const confirmDelete = await showConfirm(
						"Você tem certeza que deseja excluir esta reserva?"
					);
					if (confirmDelete) {
						this.deleteRecords(employee.id);
						this.renderEmployeeList();
					}
				}
			);
			listEmployee.appendChild(li);
		});
	}

	//Salvar os cadastros
	async recordEmployee() {
		const loader = document.querySelector("app-loader");
		const name = document.querySelector("#name");
		const cpf = document.querySelector("#cpf");
		const email = document.querySelector("#email");
		const startTime = document.querySelector("#startTime");
		const endTime = document.querySelector("#endTime");
		const position = document.querySelector("#position");
		const contact = document.querySelector("#contact");
		const unformattedCPF = mascaraSaida(cpf.value.trim());
		const newPassword = "";
		const role = "employee";
		const firstLogin = true;

		if (
			!validateEmployee({
				name,
				cpf,
				email,
				startTime,
				endTime,
				position,
				contact,
			})
		)
			return;

		//Verifica se já existe um email algum cadastro com o email e com o cpf fornecido
		const exist = verify(email, cpf)
		if (exist) {
			loader.show({ message: exist });
			loader.hide(1500);
			return;
		}

		//Gera um novo objeto após validar o cpf
		if (validaCPF(cpf.value)) {
			const newEmployee = new Employee(
				crypto.randomUUID().replace(/-/g, ""),
				name.value,
				unformattedCPF,
				email.value,
				formatToHHMM(startTime),
				formatToHHMM(endTime),
				position.value,
				contact.value,
				newPassword,
				role,
				firstLogin
			);

			//Cadastra no banco de dados os dados validados
			Repository.add(newEmployee);

			loader.show({ message: "Salvando funcionário!" });
			loader.hide(1500);

			closeModal();
			this.renderEmployeeList();
		} else {
			await showConfirm("CPF inválido");
		}
	}

	//Atualizar os cadastros
	updateEmployee(id) {
		const loader = document.querySelector("app-loader");
		const unformattedCPF = mascaraSaida(
			document.querySelector("#cpf").value
		);
		const data = {
			name: document.querySelector("#name").value,
			cpf: unformattedCPF,
			email: document.querySelector("#email").value,
			startTime: document.querySelector("#startTime").value,
			endTime: document.querySelector("#endTime").value,
			position: document.querySelector("#position").value,
			contact: document.querySelector("#contact").value,
		};
		Repository.update(id, data);

		loader.show({ message: "Atualizando, aguarde..." });
		loader.hide(1500);

		closeModal();
		this.renderEmployeeList();
	}

	//Deletar os cadastros
	deleteRecords(id) {
		const loader = document.querySelector("app-loader");
		Repository.delete(id);

		loader.show({ message: "Deletando, aguarde..." });
		loader.hide(1500);

		this.renderEmployeeList();
	}

	// Função auxiliar pra renderizar a lista (evita duplicar código)
	renderAllEmployees(list, container) {
		list.forEach((emp) => {
			const li = document.createElement("li");
			li.classList.add("card");
			li.innerHTML = `
			<div class="info"><strong>Nome:</strong> ${emp.name}</div>
			<div class="info"><strong>Cpf:</strong> ${emp.cpf}</div>
			<div class="info"><strong>Email:</strong> ${emp.email}</div>
			<div class="info"><strong>Turno:</strong> ${emp.startTime} a ${emp.endTime}</div>
			<div class="info"><strong>Cargo:</strong> ${emp.position}</div>
			<div class="info"><strong>Contato:</strong> ${emp.contact}</div>
			<div class="actions">
				<button class="btn-edit" onclick="openModal('${emp.id}')">
					<img src="../../../assets/icon/edit.svg" alt="Editar">
				</button>
				<button class="btn-delete" onclick="deleteRecord('${emp.id}')">
					<img src="../../../assets/icon/delete.svg" alt="Excluir">
				</button>
			</div>
		`;

			// Adiciona eventos
			li.querySelector(".btn-edit").addEventListener("click", () =>
				openModal(emp.id)
			);
			li.querySelector(".btn-delete").addEventListener(
				"click",
				async () => {
					const confirmDelete = await showConfirm(
						"Você tem certeza que deseja excluir esta reserva?"
					);
					if (confirmDelete) {
						this.deleteRecords(emp.id);
						this.renderEmployeeList();
					}
				}
			);
			container.appendChild(li);
		});
	}
}

export const functionCrud = new FunctionsCrud();
