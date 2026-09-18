import { logout } from "../pages/login/auth/logout.js";

// Chaves usadas no localStorage
const STATIC_KEY = "reservations";
const DYNAMIC_KEY = "smartcondo_reservations";

// -------------------------------
// NORMALIZAR STATUS (uso interno)
// -------------------------------
const normalizeStatus = (s) => {
  const v = String(s || "").toLowerCase().trim();

  // Reservas
  if (["approved", "approve", "aprovado"].includes(v)) return "approved";
  if (["rejected", "reject", "recusado"].includes(v)) return "rejected";

  // Ocorrências concluídas
  if (
    [
      "resolvido",
      "resolvida",
      "concluido",
      "concluida",
      "concluído",
      "concluída",
      "fechado",
      "fechada",
    ].includes(v)
  ) return "approved";

  // Ocorrências recusadas/canceladas
  if (["recusado", "recusada", "cancelado", "cancelada"].includes(v))
    return "rejected";

  // O restante é pendente
  return "pending";
};

// ----------------------------------------
// STATUS VISUAL **APENAS PARA COMUNICADOS**
// ----------------------------------------
const getOcorrenciaStatusView = (rawStatus) => {
  const v = String(rawStatus || "").toLowerCase().trim();

  if (v === "aberta" || v === "aberto")
    return { label: "Aberta", classe: "status-aberta" };

  if (v === "em andamento" || v === "andamento")
    return { label: "Em andamento", classe: "status-andamento" };

  if (["em execução", "em execucao", "execução", "execucao"].includes(v))
    return { label: "Em execução", classe: "status-execucao" };

  if (v === "pendente")
    return { label: "Pendente", classe: "status-pendente" };

  if (
    [
      "concluida",
      "concluido",
      "concluída",
      "concluído",
      "resolvido",
      "resolvida",
      "fechado",
      "fechada",
    ].includes(v)
  )
    return { label: "Concluída", classe: "status-concluida" };

  return { label: rawStatus || "Aberta", classe: "status-aberta" };
};

// Ocorrências
const getOcorrencias = () =>
  JSON.parse(localStorage.getItem("smartcondo_ocorrencias") || "[]");

// Gera chave única para reservas
const makeKey = (r) =>
  [
    r.id,
    r.space,
    r.dateInit,
    r.startTime,
    r.dateFinished,
    r.endTime,
    r.authorId || "",
  ].join("|");

// Junta reservas estáticas + dinâmicas
const getMergedReservations = () => {
  let staticData = [];
  let dynamicData = [];

  try { staticData = JSON.parse(localStorage.getItem(STATIC_KEY) || "[]"); } catch {}
  try { dynamicData = JSON.parse(localStorage.getItem(DYNAMIC_KEY) || "[]"); } catch {}

  const all = [...dynamicData, ...staticData];
  const seen = new Set();
  const out = [];

  for (const r of all) {
    if (!r) continue;
    const key = makeKey(r);
    if (seen.has(key)) continue;
    seen.add(key);

    out.push({ ...r, status: normalizeStatus(r.status) });
  }

  return out;
};

// Obtém array válido de múltiplas chaves
const getArrayFromKeys = (keys) => {
  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    } catch {}
  }
  return [];
};

// ----------------------------------------
// CARD DO TOP — COMUNICADOS PENDENTES// 
// ----------------------------------------
function atualizarCardsDashboard() {
  const moradores = getArrayFromKeys(["smartcondo_moradores", "moradores"]);
  const funcionarios = getArrayFromKeys(["smartcondo_employees", "employees"]);
  const ocorrencias = getOcorrencias();
  const reservas = getMergedReservations();

  // 👉 SOMENTE status "Aberta" contam
  const pendOc = ocorrencias.filter((o) => {
    const s = String(o.status || "").toLowerCase().trim();
    return s === "aberta" || s === "aberto";
  }).length;

  const pendRv = reservas.filter((r) => r.status === "pending").length;

  const cardMoradores = document.getElementById("cardMoradores");
  const cardFuncionarios = document.getElementById("cardFuncionarios");
  const cardSolicitacoes = document.getElementById("cardSolicitacoes");
  const cardReservas = document.getElementById("cardReservas");

  if (cardMoradores) cardMoradores.textContent = moradores.length;
  if (cardFuncionarios) cardFuncionarios.textContent = funcionarios.length;
  if (cardSolicitacoes) cardSolicitacoes.textContent = pendOc;
  if (cardReservas) cardReservas.textContent = pendRv;
}

// ----------------------------------------
//          COMUNICADOS RECENTES
// ----------------------------------------
function atualizarComunicados() {
  const arr = getOcorrencias();
  const ul = document.getElementById("listaComunicados");
  if (!ul) return;

  ul.innerHTML = "";

  if (!arr.length) {
    ul.innerHTML = "<li>Nenhum comunicado recente.</li>";
    return;
  }

  arr.slice(-4).reverse().forEach((o) => {
    const titulo = o.titulo || "Ocorrência";
    const descricao = o.descricao || "";
    const categoria = o.categoria || "Informativo";

    const { label, classe } = getOcorrenciaStatusView(o.status);

    ul.innerHTML += `
      <li class="comunicado-item">
        <div class="comunicado-left">
          <span class="comunicado-titulo"><strong>${titulo}</strong></span>
          ${descricao ? `<span class="comunicado-descricao">- ${descricao}</span>` : ""}
        </div>

        <div class="comunicado-right">
          <span class="comunicado-badge">${categoria}</span>
          <span class="status-badge ${classe}">${label}</span>
        </div>
      </li>
    `;
  });
}

// ----------------------------------------
//         RESERVAS RECENTES
// ----------------------------------------
function atualizarReservasRecentes() {
  const reservas = getMergedReservations();
  const ul = document.getElementById("listaReservasRecentes");
  if (!ul) return;

  if (!reservas.length) {
    ul.innerHTML = "<li>Nenhuma reserva recente.</li>";
    return;
  }

  ul.innerHTML = reservas
    .slice(-4)
    .reverse()
    .map((r) => {
      const st = r.status;

      const label =
        st === "approved"
          ? "Aprovado"
          : st === "rejected"
          ? "Recusado"
          : "Pendente";

      const classe =
        st === "approved"
          ? "status-aprovado"
          : st === "rejected"
          ? "status-recusado"
          : "status-pendente";

      const nome = r.authorName || "Morador";
      const espaco = r.space || "Área comum";

      return `
        <li class="reserva-item">
          <span class="reserva-text">
            <strong>${nome}</strong> - ${espaco}
          </span>
          <span class="status-badge ${classe}">${label}</span>
        </li>
      `;
    })
    .join("");
}

// ----------------------------------------
//         ATUALIZA TUDO
// ----------------------------------------
function atualizarDashboard() {
  atualizarCardsDashboard();
  atualizarComunicados();
  atualizarReservasRecentes();
}

// Menu flutuante
const btnMore = document.getElementById("openMore");
const moreMenu = document.getElementById("moreMenu");

if (btnMore && moreMenu) {
  btnMore.addEventListener("click", (e) => {
    e.stopPropagation();
    moreMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => moreMenu.classList.remove("show"));
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const rawUser = sessionStorage.getItem("smartcondo_loggedInUser") || "null";
  let u = null;

  try { u = JSON.parse(rawUser); } catch {}

const spanUsuario = document.getElementById("usuarioLogado");
if (spanUsuario) {
  if (!u) {
    spanUsuario.textContent = "Usuário";
  } else {
    let cargo = "";

    switch (u.role) {
      case "syndic":
        cargo = "Síndico";
        break;
      case "resident":
        cargo = "Morador";
        break;
      case "employee":
        // se o funcionário tiver posição (Porteiro, Zelador, etc), usa ela
        cargo = u.position || "Funcionário";
        break;
      default:
        cargo = "";
        break;
    }

    spanUsuario.textContent = cargo
      ? `${u.name}, ${cargo}`
      : u.name;
  }
}

  atualizarDashboard();
});

// Logout
const btnLogoutSidebar = document.getElementById("btnLogout");
if (btnLogoutSidebar) {
  btnLogoutSidebar.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
