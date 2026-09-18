export class AppLoader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.isVisible = false;
		this.message =
			this.getAttribute("message") || "Carregando SmartCondo...";
		this.type = this.getAttribute("type") || "loading"; // "loading" | "success" | "error"

		this.render();
	}

	static get observedAttributes() {
		return ["message", "type"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === "message") this.message = newValue;
			if (name === "type") this.type = newValue;
			this.updateUI();
		}
	}

	render() {
		const basePath = `${window.location.origin}/codigo-fonte`;
		let logoPath = `${basePath}/src/assets/img/smart.png`;

		if (
			window.location.hostname === "127.0.0.1" ||
			window.location.hostname === "localhost"
		) {
			// Ambiente local (Live Server, por exemplo)
			logoPath = `${window.location.origin}/codigo-fonte/src/assets/img/smart.png`;
		} else {
			// Ambiente de produção (GitHub Pages)
			logoPath =
				"https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/assets/img/smart.png";
		}

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: ${this.isVisible ? "flex" : "none"};
					position: fixed;
					inset: 0;
					background-color: rgba(0, 0, 0, 0.6);
					z-index: 9999;
					align-items: center;
					justify-content: center;
					transition: opacity 0.3s ease;
				}

				.loader-content {
					text-align: center;
					color: #fff;
					font-family: "Poppins", sans-serif;
				}

				.loader-logo {
					width: 80px;
					margin-bottom: 15px;
					animation: pulse 2s infinite ease-in-out;
				}

				.loader-ring {
					width: 60px;
					height: 60px;
					border: 4px solid rgba(255, 255, 255, 0.3);
					border-top-color: #ffffff;
					border-radius: 50%;
					animation: spin 1s linear infinite;
					margin: 0 auto 15px;
				}

				p {
					font-size: 1.1rem;
					letter-spacing: 0.5px;
					margin: 0;
				}

				.success-icon,
				.error-icon {
					font-size: 3rem;
					margin-bottom: 10px;
					display: none;
				}

				.success-icon {
					color: #4caf50;
				}
				.error-icon {
					color: #f44336;
				}

				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes pulse {
					0%, 100% { opacity: 0.7; transform: scale(1); }
					50% { opacity: 1; transform: scale(1.1); }
				}
			</style>

			<div class="loader-content">
				<img src="${logoPath}" alt="SmartCondo" class="loader-logo">
				<div class="loader-ring"></div>
				<div class="success-icon">✅</div>
				<div class="error-icon">❌</div>
				<p>${this.message}</p>
			</div>
		`;
	}

	updateUI() {
		const ring = this.shadowRoot.querySelector(".loader-ring");
		const success = this.shadowRoot.querySelector(".success-icon");
		const error = this.shadowRoot.querySelector(".error-icon");
		const messageEl = this.shadowRoot.querySelector("p");

		messageEl.textContent = this.message;
		ring.style.display = this.type === "loading" ? "block" : "none";
		success.style.display = this.type === "success" ? "block" : "none";
		error.style.display = this.type === "error" ? "block" : "none";
	}

	show({ message = "Carregando SmartCondo...", type = "loading" } = {}) {
		this.message = message;
		this.type = type;
		this.isVisible = true;
		this.setAttribute("message", message);
		this.setAttribute("type", type);
		this.style.display = "flex";
		this.updateUI();
	}

	hide(delay = 0) {
		setTimeout(() => {
			this.isVisible = false;
			this.style.display = "none";
		}, delay);
	}
}

customElements.define("app-loader", AppLoader);
