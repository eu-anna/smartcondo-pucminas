export function showConfirm(message) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirmOverlay");
    const msg = document.getElementById("confirmMessage");
    const btnYes = document.getElementById("confirmYes");
    const btnNo = document.getElementById("confirmNo");

    msg.textContent = message;
    overlay.classList.add("active");

    const close = (result) => {
      overlay.classList.remove("active");
      btnYes.removeEventListener("click", onYes);
      btnNo.removeEventListener("click", onNo);
      resolve(result);
    };

    const onYes = () => close(true);
    const onNo = () => close(false);

    btnYes.addEventListener("click", onYes);
    btnNo.addEventListener("click", onNo);
  });
}
