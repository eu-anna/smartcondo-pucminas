import { login } from "./auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
	initPasswordToggles();
	const loginButton = document.getElementById("loginButton");
	//Ao clicar no botão de login executa a função login
	loginButton.addEventListener("click", login);
});

	// passwordToggle.js
function initPasswordToggles({ selector = ".toggle-password" } = {}) {

  // usa delegation para funcionar em elementos adicionados dinamicamente
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(selector);

    if (!btn) return;

    // previne que o botão dentro de um form dispare submit
    ev.preventDefault();

    // data-target pode ser um seletor (ex: "#senha") ou o input pode ser sibling
    const targetSelector = btn.dataset.target;
    let input;
    if (targetSelector) {
      input = document.querySelector(targetSelector);
    } else {
      // fallback: procura input[type="password" ou text] mais próximo na mesma .password-group
      const group = btn.closest(".password-group");
      if (group) input = group.querySelector('input[type="password"], input[type="text"]');
    }
    if (!input) return;

    // alterna tipo
    const isPassword = input.getAttribute("type") === "password";
    input.setAttribute("type", isPassword ? "text" : "password");

    // atualiza aria-label e texto/icone do botão
    if (isPassword) {
      btn.setAttribute("aria-label", "Ocultar senha");
      btn.dataset.state = "shown";
      // você pode trocar o ícone aqui:
      btn.innerHTML = `<img src="https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-2/256/eye-closed-fill-512.png">`;
    } else {
      btn.setAttribute("aria-label", "Mostrar senha");
      btn.dataset.state = "hidden";
      btn.innerHTML = `<img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png">`;
    }
  });

}

