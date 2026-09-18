export function logout() {
  sessionStorage.removeItem("smartcondo_loggedInUser");
  window.location.replace("../../login/login.html");
  console.log('cheguei')
}
