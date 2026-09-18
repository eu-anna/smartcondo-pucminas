// =============================================
// CONFIGURAÇÃO DE STORAGE / CHAVES
// =============================================
const OS_KEY = "smartcondo_ordensServico";
const OCORR_KEY = "smartcondo_ocorrencias";
const LOGGED_KEY = "smartcondo_loggedInUser";
const EMP_KEY = "smartcondo_employees"; // <-- tabela de funcionários

// =============================================
// DADOS FAKE APENAS PARA A PARTE DE OCORRÊNCIAS
// (tela interna do funcionário)
// =============================================
let occurrencesData = [
  {
    id: 1,
    title: "Lâmpada queimada no corredor do 5º andar (Bloco A)",
    date: "28/09/2025",
    status: "Aberta",
  },
  {
    id: 2,
    title: "Troca de disjuntor",
    date: "18/09/2025",
    status: "Concluída",
  },
  {
    id: 3,
    title: "Portão da garagem não fechou automaticamente",
    date: "05/08/2025",
    status: "Concluída",
  },
  {
    id: 4,
    title: "Instalação de refletores externos",
    date: "19/09/2025",
    status: "Concluída",
  },
  {
    id: 5,
    title: "Revisão de tomadas queimadas",
    date: "10/09/2025",
    status: "Concluída",
  },
  {
    id: 6,
    title: "Verificação de curto-circuito",
    date: "12/09/2025",
    status: "Concluída",
  },
];

// =============================================
// ESTADO GLOBAL DA APLICAÇÃO
// =============================================
let appState = {
  currentUser: {
    name: "João Pereira",
    role: "Eletricista",
    avatar:
      "https://img.icons8.com/ios-filled/100/000000/user-male-circle.png",
  },
  loggedIn: false,
  currentView: "login", // login | orders | occurrence | message
  selectedOS: null,
};

// Lista de O.S atualmente exibida (já filtrada para o funcionário)
let currentOrdersView = [];

// =============================================
// FUNÇÕES DE ACESSO AO STORAGE
// =============================================
function getAllOrders() {
  try {
    return JSON.parse(localStorage.getItem(OS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setAllOrders(arr) {
  localStorage.setItem(OS_KEY, JSON.stringify(arr));
}

function getAllOcorrencias() {
  try {
    return JSON.parse(localStorage.getItem(OCORR_KEY) || "[]");
  } catch {
    return [];
  }
}

function setAllOcorrencias(arr) {
  localStorage.setItem(OCORR_KEY, JSON.stringify(arr));
}

function getAllEmployees() {
  try {
    return JSON.parse(localStorage.getItem(EMP_KEY) || "[]");
  } catch {
    return [];
  }
}

// Usuário logado (funcionário) vindo do login real
function getLoggedUserFromSession() {
  try {
    return JSON.parse(sessionStorage.getItem(LOGGED_KEY) || "null");
  } catch {
    return null;
  }
}

// =============================================
// GERADORES PARA OCORRÊNCIAS (COMPATÍVEL COM O RESTO DO SISTEMA)
// =============================================
function gerarIdOcorrencia() {
  const KEY = "smartcondo_ocorrencias_lastId";
  const ultimo = parseInt(localStorage.getItem(KEY), 10) || 0;
  const novo = ultimo + 1;
  localStorage.setItem(KEY, novo.toString());
  return novo.toString().padStart(2, "0");
}

function gerarProtocoloOcorrencia() {
  const KEY = "smartcondo_ocorrencias_protocolo";

  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const dataStr = `${ano}${mes}${dia}`; // ex: 20251115

  let ultimo = { data: null, seq: 0 };

  try {
    ultimo = JSON.parse(localStorage.getItem(KEY)) || ultimo;
  } catch {}

  const seq = ultimo.data === dataStr ? ultimo.seq + 1 : 1;

  localStorage.setItem(KEY, JSON.stringify({ data: dataStr, seq }));

  return `${dataStr}-${String(seq).padStart(3, "0")}`; // 20251115-001
}

// =============================================
// AJUDANTES
// =============================================

// Normaliza o texto do status para exibição (sempre a forma "bonita")
function normalizarStatusTexto(st) {
  const s = (st || "").toLowerCase().trim();

  // Tudo isso aparece como "Aberta"
  if (["aberto", "aberta", "pendente"].includes(s)) return "Aberta";

  if (s === "em andamento") return "Em andamento";

  if (["em execução", "em execucao", "execução", "execucao"].includes(s)) {
    return "Em execução";
  }

  if (
    ["concluída", "concluida", "concluido", "concluído", "resolvido"].includes(
      s
    )
  ) {
    return "Concluída";
  }

  // fallback
  return st || "Aberta";
}

function statusToHtml(status) {
  const statusNorm = normalizarStatusTexto(status);
  const s = statusNorm.toLowerCase();

  // Concluída = verde
  if (s === "concluída" || s === "concluida") {
    return `<span style="color:green;">${statusNorm}</span>`;
  }

  // Aberta = azul (ou cor que você preferir)
  if (s === "aberta") {
    return `<span style="color:#1d67a4;">${statusNorm}</span>`;
  }

  // Em andamento = laranja
  if (s === "em andamento") {
    return `<span style="color:#f4a261;">${statusNorm}</span>`;
  }

  // Em execução = roxo/azul forte
  if (s === "em execução") {
    return `<span style="color:#5b3cc4;">${statusNorm}</span>`;
  }

  return statusNorm;
}

// Pega o nome/cargo para exibir no header
function updateUserDisplayFromLoggedUser() {
  const userEl = document.getElementById("userName");
  if (!userEl) return;

  const logged = getLoggedUserFromSession();
  if (logged && logged.name) {
    let cargo = logged.position || "";

    if (!cargo) {
      const employees = getAllEmployees();
      const emp = employees.find((e) => String(e.id) === String(logged.id));
      if (emp) {
        cargo = emp.position || emp.cargo || emp.role || "";
      }
    }

    userEl.textContent = cargo ? `${logged.name}, ${cargo}` : logged.name;
  } else {
    userEl.textContent = `${appState.currentUser.name}, ${appState.currentUser.role}`;
  }
}

// Filtra as ordens de serviço para o funcionário logado
function getOrdersForLoggedEmployee() {
  const all = getAllOrders();
  const logged = getLoggedUserFromSession();

  if (!logged) {
    return all;
  }

  const loggedId = logged.id != null ? String(logged.id) : null;
  const loggedName = (logged.name || "").toLowerCase();

  const filtered = all.filter((os) => {
    const responsavelId =
      os.responsavelId != null ? String(os.responsavelId) : null;
    const responsavelNome = (os.responsavelNome || os.responsible || "")
      .toLowerCase()
      .trim();

    if (loggedId && responsavelId && loggedId === responsavelId) {
      return true;
    }

    if (loggedName && responsavelNome.includes(loggedName)) {
      return true;
    }

    return false;
  });

  return filtered;
}

// Atualiza status de uma OS no localStorage
function updateOrderStatus(os, newStatus) {
  const all = getAllOrders();
  if (!all.length || !os) return;

  const numero = os.numero || os.id;

  const idx = all.findIndex((item) => {
    const itemNumero = item.numero || item.id;
    return itemNumero && numero && String(itemNumero) === String(numero);
  });

  if (idx === -1) return;

  all[idx].status = newStatus;
  setAllOrders(all);
}

// Sincronizar ocorrência vinculada (status)
function syncLinkedOccurrence(os, novoStatus) {
  if (!os || !os.ocorrencia) return;

  const protocolo = String(os.ocorrencia).trim();
  if (!protocolo) return;

  const ocorrencias = getAllOcorrencias();
  const idx = ocorrencias.findIndex(
    (o) =>
      o.protocolo &&
      String(o.protocolo).trim().toLowerCase() === protocolo.toLowerCase()
  );
  if (idx === -1) return;

  ocorrencias[idx].status = novoStatus;
  setAllOcorrencias(ocorrencias);
}

// =============================================
// TABELA DE ORDENS DE SERVIÇO
// =============================================
function renderOrdersTable() {
  const tbody = document.getElementById("ordersTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  currentOrdersView = getOrdersForLoggedEmployee();

  if (!currentOrdersView.length) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhuma ordem de serviço atribuída para você.</td></tr>`;
    return;
  }

  currentOrdersView.forEach((order, idx) => {
    const tr = document.createElement("tr");

    const idOS = order.numero || order.id || "";
    const titulo = order.titulo || order.title || "";
    const categoria = order.categoria || order.category || "";
    const status = order.status || "—";
    const prioridade = order.prioridade || order.priority || "—";

    tr.innerHTML = `
      <td>${idOS}</td>
      <td>${titulo}</td>
      <td>${categoria}</td>
      <td>${statusToHtml(status)}</td>
      <td class="priority">${prioridade}</td>
      <td><button class="ver-btn" data-index="${idx}">Ver</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".ver-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.index);
      openOSDetails(idx);
    });
  });
}

// =============================================
// MODAL DE DETALHES DA O.S.
// =============================================
function openOSDetails(index) {
  appState.selectedOS = currentOrdersView[index];
  const os = appState.selectedOS;
  if (!os) return;

  document.getElementById("osNumber").value = os.numero || os.id || "";
  document.getElementById("osPriority").value =
    os.prioridade || os.priority || "";
  document.getElementById("osTitle").value = os.titulo || os.title || "";
  document.getElementById("osOccurrence").value =
    os.ocorrencia || os.occurrence || "";
  document.getElementById("osDateSuggested").value =
    os.dataSugerida || os.dateSuggested || "";
  document.getElementById("osResponsible").value =
    os.responsavelNome || os.responsible || "";
  document.getElementById("osLocal").value = os.local || "";
  document.getElementById("osDescription").value =
    os.descricao || os.description || "";

  const statusOriginal = os.status || "";
  const statusAtual = statusOriginal.toLowerCase().trim();

  const btnIniciar = document.getElementById("startOSBtn");
  const btnConcluir = document.getElementById("completeOSBtn");

  // ====== REGRA DO BOTÃO INICIAR ======
  // Só aparece se status for Aberta / Aberto / Pendente
  if (btnIniciar) {
    if (
      statusAtual === "aberta" ||
      statusAtual === "aberto" ||
      statusAtual === "pendente"
    ) {
      btnIniciar.style.display = "inline-block";
    } else {
      btnIniciar.style.display = "none";
    }
  }

  // ====== BOTÃO CONCLUIR ======
  // Só aparece se estiver "em andamento"
  if (btnConcluir) {
    if (statusAtual === "em andamento") {
      btnConcluir.style.display = "inline-block";
      btnConcluir.disabled = false;
    } else {
      btnConcluir.style.display = "none";
    }
  }

  document.getElementById("modalOSDetails").classList.add("active");
}

function closeOSDetails() {
  document.getElementById("modalOSDetails").classList.remove("active");
  appState.selectedOS = null;
}

// =============================================
// AÇÕES SOBRE A O.S. (INICIAR / VOLTAR / CONCLUIR)
// =============================================
function iniciarOS() {
  if (!appState.selectedOS) return;
  const statusAtual = (appState.selectedOS.status || "").toLowerCase().trim();

  // Garante que só inicia se estiver Aberta / Aberto / Pendente
  if (
    statusAtual !== "aberta" &&
    statusAtual !== "aberto" &&
    statusAtual !== "pendente"
  ) {
    alert('Só é possível iniciar ordens de serviço com status "Aberta".');
    return;
  }

  appState.selectedOS.status = "Em andamento";
  updateOrderStatus(appState.selectedOS, "Em andamento");

  // Ocorrência vinculada vai para "Em execução"
  syncLinkedOccurrence(appState.selectedOS, "Em execução");

  alert(
    `Ordem de serviço ${
      appState.selectedOS.numero || appState.selectedOS.id
    } iniciada.`
  );

  renderOrdersTable();

  // Atualiza os botões do modal (caso o modal permaneça aberto)
  const btnIniciar = document.getElementById("startOSBtn");
  const btnConcluir = document.getElementById("completeOSBtn");

  if (btnIniciar) {
    btnIniciar.style.display = "none";
  }

  if (btnConcluir) {
    btnConcluir.style.display = "inline-block";
    btnConcluir.disabled = false;
  }

  // Se quiser fechar o modal após iniciar, mantenha esta linha.
  closeOSDetails();
}

function voltarOS() {
  closeOSDetails();
}

function concluirOS() {
  if (!appState.selectedOS) return;
  const statusAtual = (appState.selectedOS.status || "").toLowerCase().trim();

  if (statusAtual !== "em andamento") {
    alert("Esta OS precisa estar em andamento antes de ser concluída.");
    return;
  }

  appState.selectedOS.status = "Concluído";
  updateOrderStatus(appState.selectedOS, "Concluído");

  syncLinkedOccurrence(appState.selectedOS, "Concluído");

  alert(
    `Ordem de serviço ${
      appState.selectedOS.numero || appState.selectedOS.id
    } concluída.`
  );
  renderOrdersTable();
  closeOSDetails();
}

// =============================================
// NAVEGAÇÃO ENTRE TELAS
// =============================================
function showOrdersView() {
  appState.currentView = "orders";
  document.getElementById("ordersSection").style.display = "block";
  document.getElementById("occurrenceSection").style.display = "none";
  document.getElementById("messageSection").style.display = "none";

  updateUserDisplayFromLoggedUser();
  setSidebarActive("btnOrders");
  closeOSDetails();
  renderOrdersTable();
}

function showOccurrenceView() {
  appState.currentView = "occurrence";
  document.getElementById("ordersSection").style.display = "none";
  document.getElementById("messageSection").style.display = "none";
  document.getElementById("occurrenceSection").style.display = "block";

  updateUserDisplayFromLoggedUser();
  setSidebarActive("btnOccurrence");
  closeOSDetails();
  renderOccurrenceCards();
}

function showMessageView() {
  appState.currentView = "message";
  document.getElementById("ordersSection").style.display = "none";
  document.getElementById("occurrenceSection").style.display = "none";
  document.getElementById("messageSection").style.display = "block";

  updateUserDisplayFromLoggedUser();
  setSidebarActive("btnMessage");
  closeOSDetails();
  renderOccurrenceCards();
}

function updateUserDisplay(text) {
  const el = document.getElementById("userName");
  if (el) el.textContent = text;
}

function setSidebarActive(btnId) {
  ["btnOrders", "btnOccurrence", "btnMessage"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) activeBtn.classList.add("active");
}

// =============================================
// OCORRÊNCIAS (PARTE DA TELA DO FUNCIONÁRIO)
// =============================================
function renderOccurrenceCards() {
  const container = document.getElementById("occurrenceCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  occurrencesData.forEach((occ) => {
    const card = document.createElement("div");
    card.className = "occurrence-card";

    const labelStatus = normalizarStatusTexto(occ.status);
    const s = labelStatus.toLowerCase();

    let statusClass = "";
    switch (s) {
      case "aberta":
        statusClass = "status-pendente"; // reaproveita cor já existente
        break;
      case "concluída":
      case "concluida":
        statusClass = "status-resolvido";
        break;
      case "em andamento":
        statusClass = "status-em-andamento";
        break;
      case "em execução":
        statusClass = "status-em-execucao";
        break;
      default:
        statusClass = "";
    }

    card.innerHTML = `
      <strong>${occ.title}</strong>
      <small>Registrado em ${occ.date}</small>
      <span class="status-pill ${statusClass}">${labelStatus}</span>
    `;

    container.appendChild(card);
  });
}

// Submit de nova ocorrência pelo funcionário
function handleOccurrenceSubmit(event) {
  event.preventDefault();
  const title = document.getElementById("occTitle").value.trim();
  const category = document.getElementById("occCategory").value;
  const description = document.getElementById("occDescription").value.trim();

  if (!title || !category || !description) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const now = new Date();
  const todayFormatted = now.toLocaleDateString("pt-BR");

  // 1) Adiciona na listinha local (tela funcionário)
  const newId = occurrencesData.length
    ? occurrencesData[occurrencesData.length - 1].id + 1
    : 1;

  occurrencesData.push({
    id: newId,
    title: title,
    category: category,
    description: description,
    date: todayFormatted,
    status: "Aberta", // padrão visual que você quer
  });

  // 2) Registra em smartcondo_ocorrencias
  const logged = getLoggedUserFromSession();
  const employees = getAllEmployees();

  let nome = "Funcionário";
  let sobrenome = "";
  let posicao = "Funcionário";

  if (logged && logged.name) {
    const partes = logged.name.trim().split(" ");
    nome = partes[0];
    sobrenome = partes.slice(1).join(" ");
  }

  if (logged && logged.position) {
    posicao = logged.position;
  } else if (logged) {
    const emp = employees.find((e) => String(e.id) === String(logged.id));
    if (emp) {
      posicao = emp.position || emp.cargo || emp.role || posicao;
    }
  }

  const listaOc = getAllOcorrencias();

  const novaOcorrencia = {
    id: gerarIdOcorrencia(),
    protocolo: gerarProtocoloOcorrencia(),
    titulo: title,
    categoria: category,
    descricao: description,
    status: "Aberta",
    criadaEm: new Date().toISOString(),
    resolvidaEm: null,

    authorId: logged?.id ?? null,
    authorName: logged?.name || `${nome} ${sobrenome}`,

    solicitante: {
      nome,
      sobrenome,
      apartamento: posicao,
    },
  };

  listaOc.push(novaOcorrencia);
  setAllOcorrencias(listaOc);

  document.getElementById("occurrenceForm").reset();
  renderOccurrenceCards();

  alert(
    `Ocorrência registrada com sucesso para ${nome} ${sobrenome} - ${posicao}.`
  );
}

// =============================================
// TELA DE LOGIN / APP
// =============================================
function showLoginScreen() {
  appState.loggedIn = false;
  appState.currentView = "login";
  document.getElementById("login-page").style.display = "flex";
  document.getElementById("app").style.display = "none";
}

function showAppScreen() {
  appState.loggedIn = true;
  appState.currentView = "orders";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("app").style.display = "flex";

  updateUserDisplayFromLoggedUser();
  renderOrdersTable();
  showOrdersView();
}

// =============================================
// EVENTOS DE INTERFACE
// =============================================
function setupEventListeners() {
  document.getElementById("btnOrders").onclick = showOrdersView;
  document.getElementById("btnOccurrence").onclick = showOccurrenceView;
  document.getElementById("btnMessage").onclick = showMessageView;

  document.getElementById("btnLogout").onclick = () => {
    if (confirm("Deseja realmente sair?")) {
      window.location.href = "../login/login.html";
    }
  };

  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.onclick = () => {
      showAppScreen();
    };
  }

  document.getElementById("startOSBtn").onclick = iniciarOS;
  document.getElementById("backOSBtn").onclick = voltarOS;
  document.getElementById("completeOSBtn").onclick = concluirOS;

  const occForm = document.getElementById("occurrenceForm");
  if (occForm) {
    occForm.addEventListener("submit", handleOccurrenceSubmit);
  }

  const modalOS = document.getElementById("modalOSDetails");
  if (modalOS) {
    modalOS.onclick = (e) => {
      if (e.target === modalOS) {
        closeOSDetails();
      }
    };
  }
}

// =============================================
// INICIALIZAÇÃO
// =============================================
window.onload = () => {
  setupEventListeners();

  const logged = getLoggedUserFromSession();
  if (logged && logged.role === "employee") {
    const employees = getAllEmployees();
    const emp = employees.find((e) => String(e.id) === String(logged.id));

    appState.currentUser.name = logged.name || appState.currentUser.name;
    appState.currentUser.role =
      logged.position ||
      emp?.position ||
      emp?.cargo ||
      logged.role ||
      appState.currentUser.role;

    showAppScreen();
  } else {
    showLoginScreen();
  }
};
