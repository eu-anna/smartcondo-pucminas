(function () {
  const STORAGE_KEY = "smartcondo_ocorrencias";
  let currentPage = 1;

  // =========================
  // ITENS POR PÁGINA (desktop x mobile)
  // =========================
  function getPerPage() {
    return window.innerWidth <= 700 ? 4 : 6;
  }

  // (opcional) se mudar o tamanho da tela, volta para página 1
  window.addEventListener("resize", () => {
    currentPage = 1;
    renderOcorrencias();
  });

  // =========================
  // INICIALIZAÇÃO
  // =========================
  document.addEventListener("DOMContentLoaded", () => {
    ensureStorage();
    renderOcorrencias();

    // Preenche nome no header, se existir
    const usuario = JSON.parse(
      sessionStorage.getItem("smartcondo_loggedInUser") || "null"
    );
    const span = document.getElementById("usuarioLogado");

    if (span && usuario && usuario.name && usuario.role) {
      span.textContent = `${usuario.name}, ${
        usuario.role === "syndic" ? "Síndico" : "Morador"
      }`;
    }

    const form = document.getElementById("formOcorrencia");
    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const categoria = document.getElementById("categoria").value;
        const descricao = document.getElementById("descricao").value.trim();

        if (!titulo || !categoria || !descricao) {
          alert("Preencha todos os campos!");
          return;
        }

        criarOcorrencia({ titulo, categoria, descricao });

        form.reset();
        currentPage = 1;
        renderOcorrencias();
      });
    }

    const lista = document.getElementById("listaOcorrencias");
    if (lista) {
      lista.addEventListener("click", (ev) => {
        const btnExcluir = ev.target.closest(".btn-excluir");
        const card = ev.target.closest(".report-card");

        if (!card) return;
        const id = card.dataset.id;

        if (btnExcluir) {
          if (confirm("Deseja excluir esta ocorrência?")) {
            excluirOcorrencia(id);
            renderOcorrencias();
          }
        }
      });
    }
  });

  // =========================
  // STORAGE
  // =========================
  function ensureStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }

  function getAllOcorrencias() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function salvarOcorrencias(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  // =========================
  // GERAR ID (01, 02, 03...)
  // =========================
  function gerarId() {
    const KEY = "smartcondo_ocorrencias_lastId";
    const ultimo = parseInt(localStorage.getItem(KEY), 10) || 0;
    const novo = ultimo + 1;
    localStorage.setItem(KEY, novo.toString());
    return novo.toString().padStart(2, "0");
  }

  // =========================
  // GERAR PROTOCOLO AAAAMMDD-001
  // =========================
  function gerarProtocolo() {
    const KEY = "smartcondo_ocorrencias_protocolo";

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    const dataStr = `${ano}${mes}${dia}`;

    let ultimo = { data: null, seq: 0 };

    try {
      ultimo = JSON.parse(localStorage.getItem(KEY)) || ultimo;
    } catch {}

    const seq = ultimo.data === dataStr ? ultimo.seq + 1 : 1;

    localStorage.setItem(KEY, JSON.stringify({ data: dataStr, seq }));

    return `${dataStr}-${String(seq).padStart(3, "0")}`;
  }

  // =========================
  // USUÁRIO LOGADO
  // =========================
  function getLoggedUser() {
    try {
      const raw = sessionStorage.getItem("smartcondo_loggedInUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // =========================
  // FORMATAÇÃO
  // =========================
  function formatarDataHoraBR(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function normalizarStatusTexto(st) {
    const s = (st || "").toLowerCase().trim();

    if (["aberto", "aberta", "pendente"].includes(s)) return "Aberta";
    if (s === "em andamento") return "Em andamento";
    if (["em execução", "em execucao"].includes(s)) return "Em execução";
    if (["concluído", "concluido", "concluída", "concluida"].includes(s))
      return "Concluída";

    return st || "Aberta";
  }

  // =========================
  // CRIAR OCORRÊNCIA
  // =========================
  function criarOcorrencia({ titulo, categoria, descricao }) {
    const lista = getAllOcorrencias();
    const usuario = getLoggedUser();

    let nome = "Morador";
    let sobrenome = "";

    if (usuario) {
      if (usuario.firstName && usuario.lastName) {
        nome = usuario.firstName;
        sobrenome = usuario.lastName;
      } else if (usuario.name) {
        const partes = usuario.name.trim().split(" ");
        nome = partes[0];
        sobrenome = partes.slice(1).join(" ");
      }
    }

    const apartamento =
      usuario?.unit ||
      usuario?.apartment ||
      usuario?.unidade ||
      usuario?.unitNumber ||
      "—";

    const nova = {
      id: gerarId(),
      protocolo: gerarProtocolo(),
      titulo,
      categoria,
      descricao,
      status: "Aberta",
      criadaEm: new Date().toISOString(),
      resolvidaEm: null,

      authorId: usuario?.id ?? null,
      authorName: usuario?.name || `${nome} ${sobrenome}`,

      solicitante: { nome, sobrenome, apartamento },
    };

    lista.push(nova);
    salvarOcorrencias(lista);
    return nova;
  }

  // =========================
  // EXCLUIR
  // =========================
  function excluirOcorrencia(id) {
    const lista = getAllOcorrencias();
    salvarOcorrencias(lista.filter((o) => o.id !== id));
  }

  // =========================
  // FILTRA OCORRÊNCIAS DO USUÁRIO
  // =========================
  function filtrarPorUsuario(lista) {
    const usuario = getLoggedUser();
    if (!usuario) return lista;
    return lista.filter((o) => o.authorId === usuario.id);
  }

  // =========================
  // PAGINAÇÃO
  // =========================
  function renderPaginacao(totalPages) {
    const pagContainer = document.getElementById("paginacaoOcorrencias");
    if (!pagContainer) return;

    pagContainer.innerHTML = "";
    if (totalPages <= 1) return;

    const wrapper = document.createElement("div");
    wrapper.className = "pagination";

    const prev = document.createElement("button");
    prev.textContent = "⬅ Anterior";
    prev.classList.add("page-btn");
    prev.disabled = currentPage === 1;

    const info = document.createElement("span");
    info.textContent = `Página ${currentPage} de ${totalPages}`;

    const next = document.createElement("button");
    next.textContent = "Próximo ➡";
    next.classList.add("page-btn");
    next.disabled = currentPage === totalPages;

    prev.onclick = () => {
      currentPage--;
      renderOcorrencias();
    };

    next.onclick = () => {
      currentPage++;
      renderOcorrencias();
    };

    wrapper.append(prev, info, next);
    pagContainer.append(wrapper);
  }

  // =========================
  // RENDERIZAR
  // =========================
  function renderOcorrencias() {
    const container = document.getElementById("listaOcorrencias");
    if (!container) return;

    const todas = getAllOcorrencias();
    const lista = filtrarPorUsuario(todas);

    container.innerHTML = "";

    if (!lista.length) {
      container.innerHTML =
        "<p>Você ainda não registrou nenhuma ocorrência.</p>";
      return;
    }

    lista.sort((a, b) => new Date(b.criadaEm) - new Date(a.criadaEm));

    const perPage = getPerPage();
    const totalPages = Math.ceil(lista.length / perPage);
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * perPage;
    const pageItems = lista.slice(start, start + perPage);

    pageItems.forEach((o) => {
      const card = document.createElement("div");
      card.className = "report-card";
      card.dataset.id = o.id;

      const rawStatus = o.status || "";
      const s = rawStatus.toLowerCase().trim();
      const statusLabel = normalizarStatusTexto(rawStatus);

      let statusClass = "";
      if (["aberta", "aberto", "pendente"].includes(s))
        statusClass = "status-aberto";
      else if (s === "em andamento") statusClass = "status-andamento";
      else if (s === "em execução" || s === "em execucao")
        statusClass = "status-execucao";
      else if (
        ["concluída", "concluida", "concluído", "concluido"].includes(s)
      )
        statusClass = "status-concluido";
      else statusClass = "status-aberto";

      card.innerHTML = `
        <h4>${o.titulo}</h4>
        <p><strong>Protocolo:</strong> #${o.protocolo}</p>
        <p><strong>Categoria:</strong> ${o.categoria}</p>
        <p><strong>Descrição:</strong> ${o.descricao}</p>
        <p><strong>Situação:</strong> <span class="status ${statusClass}">${statusLabel}</span></p>
        <p><strong>Registrada em:</strong> ${formatarDataHoraBR(o.criadaEm)}</p>
        ${
          o.resolvidaEm
            ? `<p><strong>Resolvida em:</strong> ${formatarDataHoraBR(
                o.resolvidaEm
              )}</p>`
            : ""
        }
        <div class="acoes">          
          <button class="btn-excluir">Excluir</button>
        </div>
      `;

      container.appendChild(card);
    });

    renderPaginacao(totalPages);
  }
})();

// Logout
const btnLogoutSidebar = document.getElementById("btnLogout");
if (btnLogoutSidebar) {
  btnLogoutSidebar.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
