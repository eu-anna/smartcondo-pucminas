import { capitalizeFullName } from "../../js/utils/captalizeFullName.js";
import "../loader/loader.js";
class LayoutHeader extends HTMLElement {
	connectedCallback() {
		this.render();

	}

	render() {
		const userLogged = JSON.parse(sessionStorage.getItem("smartcondo_loggedInUser"));
		const userName = capitalizeFullName(userLogged.name) || "Usuário";
		const apartment = userLogged.unit || "Ap";

		this.innerHTML = `
		<link rel="stylesheet" href="../../../css/global.css">
		<link rel="stylesheet" href="../../../components/layoutHeader/layoutHeader.css">
      	<header class="header">
        	<h2>${this.getAttribute("title") || "Home"}</h2>
        	<div class="userIcon">
          		<img src="../../../../src/assets/icon/profile.svg" alt="Foto do Usuário">
          		<span>${userName}, ${apartment}</span>
        	</div>
      	</header>
    `;
	}
}

customElements.define("layout-header", LayoutHeader);
