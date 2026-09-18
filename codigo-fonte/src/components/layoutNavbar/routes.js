// Define as rotas do projeto
//Todos os botões clicaveis do menu desktop e do mobile usam essa lista como referencia
export const menus = {
	resident: [
		{ href: "../home/index.html", icon: "🏠", label: "Home" },
		{
			href: "./../communicates/communicates.html",
			icon: "✉️",
			label: "Comunicados",
		},
		{
			href: "../reservation/reservation.html",
			icon: "🏢",
			label: "Reservas",
		},
		{
			href: "../occurrence/occurrence.html",
			icon: "📋",
			label: "Ocorrências",
		},
	],
	syndic: [
		{
			href: "../dashboard/dashboard-sindico.html",
			icon: "🏠",
			label: "Visão geral",
		},
		{
			href: "../dashboard/dashboard-sindico-morador.html",
			icon: "👥",
			label: "Moradores",
		},
		{
			href: "../employee/employee.html",
			icon: "👨‍💼",
			label: "Funcionários",
		},
		{
			href: "./../communicates/communicates.html",
			icon: "✉️",
			label: "Comunicados",
		},
		{
			href: "../dashboard/dashboard-sindico-occurrence.html",
			icon: "📋",
			label: "Ocorrências",
		},
		{
			href: "../dashboard/dashboard-sindico-ordem-servico.html",
			icon: "🛠️",
			label: "Ordem de serviços",
		},
		{
			href: "../dashboard/dashboard-sindico-gestao.html",
			icon: "📅",
			label: "Gestão de reservas",
		},
		{
			href: "../reservation/reservation.html",
			icon: "📅",
			label: "Reservas",
		},
	],
	employee: [
		{
			href: "../../pages/employee/dashboard.html",
			icon: "📋",
			label: "Ocorrências",
		},
		{
			href: "#",
			icon: "🛠️",
			label: "Ordem de Serviço",
		},
		{
			href: "./../communicates/communicates.html",
			icon: "✉️",
			label: "Comunicados",
		},
	],
};
