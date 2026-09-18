import { logout } from "../../pages/login/auth/logout.js";
import { menus } from "./routes.js";
class LayoutSidebar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// 🔹 Define menus de acordo com o papel (role)
		this.menus = menus
	}

	connectedCallback() {
		const role = this.getAttribute("role") || "resident";
		const asideNav = this.shadowRoot.querySelector("aside");
		this.render(role, asideNav);
		this.highlightActiveLink();
	}

	render(role) {
		const items = this.menus[role] || this.menus["resident"];

		// Cria os links principais
		const navItems = items
			.map(
				(item) => `
      <a href="${item.href}">
        ${item.icon} ${item.label}
      </a>
    `
			)
			.join("");

		const template = `
    <link rel="stylesheet" href="../../../css/global.css">
    <link rel="stylesheet" href="../../../components/layoutNavbar/layoutNavbar.css">
    <aside class="sidebar">
      <div class="logo">
        <img src="../../../assets/img/smart.png" alt="Logo SmartCondo">
        <h2>SmartCondo</h2>
      </div>
      <nav class="menu">
        ${navItems}
        <a href="#" class="logout">🚪 Sair</a>
      </nav>
    </aside>
  `;

		this.shadowRoot.innerHTML = template;

		// Ativa o botão "Mais"
		const openMore = this.shadowRoot.querySelector("#openMore");
		const moreMenu = this.shadowRoot.querySelector("#moreMenu");

		if (openMore && moreMenu) {
			openMore.addEventListener("click", () => {
				moreMenu.classList.toggle("active");
			});
		}
	}

	highlightActiveLink() {
		const links = this.shadowRoot.querySelectorAll(".sidebar a");
		const currentPath = window.location.pathname.split("/").at(-2);
		const logOut = this.shadowRoot.querySelector(".logout");

		links.forEach((link) => {
			const linkPath = link.getAttribute("href").split("/").at(-2);
			if (linkPath === currentPath) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});

		logOut.addEventListener("click", () => logout());
	}
}

customElements.define("layout-sidebar", LayoutSidebar);
