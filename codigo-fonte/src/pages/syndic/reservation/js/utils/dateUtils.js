import { cleanCalendar } from "../utils/cleanCalendar.js";

export function formatDate(year, month, day) {
	return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseYMDToUTC(dateStr) {
  // espera "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-").map(Number);
  // retorna timestamp em ms da meia-noite UTC daquela data
  return Date.UTC(y, m - 1, d);
}

export function currentReservation(dateInit, dateFinished) {
  // transforma em timestamps UTC (meia-noite)
  const startUTC = parseYMDToUTC(dateInit);
  const endUTC = parseYMDToUTC(dateFinished);

  // timestamp UTC da "hoje" (meia-noite local convertida para UTC)
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((endUTC - startUTC) / msPerDay); // número de dias entre as datas

  // ❌ Não permite reservar mais de 2 dias consecutivos (ex.: diffDays > 1 significa > 2 dias? defina regra)
  // aqui interpretei: permitir no máximo 2 dias consecutivos -> diffDays <= 1 (0 = 1 dia, 1 = 2 dias)
  if (diffDays > 1) {
    cleanCalendar();
    alert("Não é possível reservar mais de 2 dias consecutivos!");
    return true;
  }

  // ❌ Não permite data inicial no passado ou no mesmo dia
  if (startUTC <= todayUTC) {
    cleanCalendar();
    alert("Não é possível fazer reservas em dias anteriores ou no mesmo dia!");
    return true;
  }

  // ❌ Não permite data final antes da inicial
  if (endUTC < startUTC) {
    cleanCalendar();
    alert("A data final não pode ser anterior à data inicial!");
    return true;
  }

  return false; // ✅ Tudo certo
}

