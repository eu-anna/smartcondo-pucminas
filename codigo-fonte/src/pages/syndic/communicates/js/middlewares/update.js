import { updateRecords } from "../repository/repository.js";
import "../../../../../components/loader/loader.js";
import { renderList } from "./render.js";
import { getRecordsById } from "../repository/repository.js";

export function loaderData({ id }) {
	const record = getRecordsById(id);
	document.getElementById("title").value = record.title;
	document.getElementById("text").value = record.text;
	document.getElementById("selectTo").value = record.select;
	document.getElementById("selectTarget").value = record.category;

	document.getElementById("btnNewNotification").style.display = "none";
	document.getElementById("btnSave").style.display = "block";
	document
		.getElementById("btnSave")
		.addEventListener("click", () => update(id));

			//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	appLoader.show({message: "Aguarde carregando dados..."});
	appLoader.hide(1000);
}

function update(id) {
		const title = document.getElementById("title").value.trim();
	const text = document.getElementById("text").value.trim();
	const select = document.getElementById("selectTo").value.trim();
	const category = document.getElementById("selectTarget").value.trim();

	const data = {
		title,
		text,
		category,
		select,
	};

	document.getElementById("btnNewNotification").style.display = "block";
	document.getElementById("btnSave").style.display = "none";

	//Inserindo o loader no corpo da pagina
	const appLoader = document.createElement("app-loader");
	document.body.insertBefore(appLoader, document.body.firstChild);

	appLoader.show();
	appLoader.hide(1000);

	updateRecords(id, data);
	renderList();
}
