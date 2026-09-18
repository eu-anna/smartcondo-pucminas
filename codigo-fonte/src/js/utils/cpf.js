export function validaCPF(cpf) {
	var Soma = 0;
	var Resto;

	var strCPF = String(cpf).replace(/[^\d]/g, "");

	if (strCPF.length !== 11) return false;

	if (
		[
			"00000000000",
			"11111111111",
			"22222222222",
			"33333333333",
			"44444444444",
			"55555555555",
			"66666666666",
			"77777777777",
			"88888888888",
			"99999999999",
		].indexOf(strCPF) !== -1
	)
		return false;

	for (let i = 1; i <= 9; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) Resto = 0;

	if (Resto != parseInt(strCPF.substring(9, 10))) return false;

	Soma = 0;

	for (let i = 1; i <= 10; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) Resto = 0;

	if (Resto != parseInt(strCPF.substring(10, 11))) return false;

	return true;
}

export function mascaraEntrada(cpf) {
		var value = cpf
		var cpfPattern = value
			.replace(/\D/g, "") // Remove qualquer coisa que não seja número
			.replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após o terceiro dígito
			.replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após o sexto dígito
			.replace(/(\d{3})(\d)/, "$1-$2") // Adiciona traço após o nono dígito
			.replace(/(-\d{2})\d+?$/, "$1"); // Impede entrada de mais de 11 dígitos
		return cpfPattern;
}

export function mascaraSaida(cpf) {
		var cpfPattern = cpf
			.replace(/\D/g, "") // Remove qualquer coisa que não seja número
		return cpfPattern;
}
