export function cleanCalendar(){
	const day = document.querySelectorAll(".day");
	day.forEach((e) => {
		e.classList.remove("active");
	});
	document.getElementById("dateInit").value = "";
	document.getElementById("dateFinished").value = "";
}
