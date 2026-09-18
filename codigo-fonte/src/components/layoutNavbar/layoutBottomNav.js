import { menus } from "./routes.js";
import { logout } from "../../pages/login/auth/logout.js";

class LayoutBottomNav extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.menus = menus;
	}

	connectedCallback() {
		const role = this.getAttribute("role") || "resident";
		this.render(role);
	}

	render(role) {
		const items = this.menus[role] || this.menus["resident"];
		let mainItems = null;
		let extraItems = null;

		if (items.length <= 4) {
			mainItems = items.slice(0, 3);
			extraItems = items.slice(3);
		} else {
			mainItems = items.slice(0, 4);
			extraItems = items.slice(4);
		}

		const navItems = mainItems
			.map(
				(i) =>
					`<a href="${i.href}"><span>${i.icon}</span><p>${i.label}</p></a>`
			)
			.join("");

		const moreButton = extraItems.length
			? `<button class="more-btn" id="openMore">
	  		<span>➕</span>
			<p>Mais</p>
		</button>`
			: "";

		const moreMenu = extraItems.length
			? `<div class="more-menu" id="moreMenu">
          ${extraItems
				.map((i) => `<a href="${i.href}">${i.icon} ${i.label}</a>`)
				.join("")}
		  <a href="#" class="logout">🚪 Sair</a>
        </div>`
			: "";

		const template = `
      <link rel="stylesheet" href="../../../css/global.css">
      <link rel="stylesheet" href="../../../../src/components/layoutNavbar/layoutNavbar.css">
      <nav class="bottom-nav">
        ${navItems}
        ${moreButton}
      </nav>
      ${moreMenu}
    `;

		this.shadowRoot.innerHTML = template;

		// interações
		this.shadowRoot.querySelectorAll(".nav-item").forEach((btn) => {
			btn.addEventListener("click", () => {
				const href = btn.dataset.href;
				if (href) window.location.hash = href;
			});
		});

		this.shadowRoot
			.querySelector(".logout")
			.addEventListener("click", () => logout());

		const openMore = this.shadowRoot.querySelector("#openMore");
		const moreMenuElement = this.shadowRoot.querySelector("#moreMenu");

		if (openMore && moreMenuElement) {
			openMore.addEventListener("click", () => {
				moreMenuElement.classList.toggle("show");
			});
		}
	}
}

customElements.define("layout-bottom-nav", LayoutBottomNav);
