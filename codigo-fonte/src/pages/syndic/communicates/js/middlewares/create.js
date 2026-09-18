import { addRecords } from "../repository/repository.js";
import "../../../../../components/loader/loader.js";
import { validate } from "../utils/validations.js";
import { renderList } from "./render.js";

const appLoader = document.createElement("app-loader");
//Inserindo o loader no corpo da pagina
document.body.insertBefore(appLoader, document.body.firstChild);

export function newNotification(e) {
	e.preventDefault();

	const newId = crypto.randomUUID().split("-").join("");
	const title = document.getElementById("title");
	const text = document.getElementById("text");
	const category = document.getElementById("selectTarget").value.trim();
	const author = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser"));
	const select = document.getElementById("selectTo");
	const selectedOption = select.options[select.selectedIndex]; // opção selecionada

	const recipientId = selectedOption.getAttribute("value"); // pega o atributo 'value'
	const recipientName = selectedOption.text; // pega o texto visível no option

	const data = {
		id: newId,
		title: title.value.trim(),
		text: text.value.trim(),
		category: category,
		authorId: author.id,
		targetName: recipientName,
		date: new Date(),
		isNewNotification: true,
		targetIdOrAll: recipientId,
	};

	if (!validate({ title, text })) return;

	appLoader.show({ message: "Enviando..." });
	appLoader.hide(1500);
	//Envia os dados para serem salvos;
	addRecords(data);

	renderList();

	//Limpa os dados após serem salvos
	title.value = "";
	text.value = "";
}
