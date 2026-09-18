import { logout } from "../pages/login/auth/logout.js";

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================
  // ELEMENTOS E VARIÁVEIS
  // ========================================================
  const modalOverlay = document.getElementById("modalOverlay");
  const abrirBtn = document.querySelector(".add-btn");
  const cancelarBtn = document.getElementById("cancelarModal");
  const tabelaOrdens = document.getElementById("tabelaOrdens");
  const form = document.getElementById("formOrdemServico");

  const modalVer = document.getElementById("modalVerOS");
  const btnCancelarVer = document.getElementById("btnCancelarVer");
  const btnAlterar = document.getElementById("btnAlterar");
  const btnSalvarAlteracoes = document.getElementById("btnSalvarAlteracoes");
  const btnConcluir = document.getElementById("btnConcluir");

  // Campo de pesquisa e botão
  const campoPesquisa = document.getElementById("campoPesquisa");
  const btnPesquisar = document.getElementById("btnPesquisar");
  let termoPesquisaOS = "";

  let osIndexAtual = null;

  // ========================================================
  // PAGINAÇÃO
  // ========================================================
  let OS_PER_PAGE = window.innerWidth <= 768 ? 8 : 10;
  let currentPageOS = 1;

  // Atualiza quantidade por página conforme o tamanho da tela
  window.addEventListener("resize", () => {
    const novoValor = window.innerWidth <= 768 ? 5 : 10;
    if (novoValor !== OS_PER_PAGE) {
      OS_PER_PAGE = novoValor;
      currentPageOS = 1;
      carregarOrdens();
    }
  });

  // ========================================================
  // CHAVES DE STORAGE
  // ========================================================
  const OS_KEY = "smartcondo_ordensServico";
  const OCORR_KEY = "smartcondo_ocorrencias";
  const EMP_KEY = "smartcondo_employees";

  const getOrdens = () => JSON.parse(localStorage.getItem(OS_KEY) || "[]");
  const setOrdens = (arr) => localStorage.setItem(OS_KEY, JSON.stringify(arr));

  const getOcorrencias = () =>
    JSON.parse(localStorage.getItem(OCORR_KEY) || "[]");
  const setOcorrencias = (arr) =>
    localStorage.setItem(OCORR_KEY, JSON.stringify(arr));

  const getEmployees = () => {
    try {
      const raw = localStorage.getItem(EMP_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      console.log("👷 smartcondo_employees:", arr);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      console.warn("Erro ao ler smartcondo_employees:", e);
      return [];
    }
  };

  // ========================================================
  // CONFIGURAR MIN DA DATA SUGERIDA
  // ========================================================
  const inputData = document.getElementById("dataSugerida");
  if (inputData) {
    const hojeISO = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    inputData.min = hojeISO;
  }

  // ========================================================
  // SINCRONIZAR OCORRÊNCIA
  // ========================================================
  function sincronizarOcorrencia(protocolo, novoStatus, novaPrioridade) {
    if (!protocolo) return;

    const ocorrencias = getOcorrencias();
    const idx = ocorrencias.findIndex(
      (o) =>
        o.protocolo &&
        o.protocolo.trim().toLowerCase() === protocolo.trim().toLowerCase()
    );

    if (idx !== -1) {
      const ocorrencia = ocorrencias[idx];
      if (novoStatus) ocorrencia.status = novoStatus;
      if (novaPrioridade) ocorrencia.prioridade = novaPrioridade;
      setOcorrencias(ocorrencias);
      console.log(`✅ Ocorrência sincronizada [${ocorrencia.protocolo}]`);
    }
  }

  // ========================================================
  // GERAR NÚMERO DE O.S.
  // ========================================================
  function gerarNumeroOS() {
    const ano = new Date().getFullYear();
    const ordens = getOrdens();
    const novoId = (ordens.length + 1).toString().padStart(3, "0");
    return `${ano}-OS-${novoId}`;
  }

  // ========================================================
  // CARREGAR FUNCIONÁRIOS NO SELECT
  // ========================================================
  function carregarResponsaveis() {
    const select = document.getElementById("responsavel");
    if (!select) {
      console.warn("⚠️ Select #responsavel não encontrado");
      return;
    }

    const employees = getEmployees();
    console.log("👷 Funcionários encontrados p/ select:", employees);

    if (!employees || employees.length === 0) {
      select.innerHTML =
        '<option value="">Nenhum funcionário cadastrado</option>';
      return;
    }

    select.innerHTML =
      '<option value="" disabled selected>Selecione um responsável</option>';

    employees.forEach((emp) => {
      const id = String(emp.id ?? emp.ID ?? Math.random());
      const nome = emp.name || emp.nome || emp.fullName || "Sem nome";
      const cargo = emp.position || emp.cargo || emp.funcao || "Funcionário";

      const option = document.createElement("option");
      option.value = id;
      option.textContent = `${nome} - ${cargo}`;
      select.appendChild(option);
    });
  }

  // ========================================================
  // PAGINAÇÃO O.S.
  // ========================================================
  function renderPaginacaoOS(totalPages) {
    let pagContainer = document.getElementById("paginacaoOS");

    if (!pagContainer) {
      pagContainer = document.createElement("div");
      pagContainer.id = "paginacaoOS";
      pagContainer.className = "paginacao";

      const tabelaWrapper =
        document.querySelector(".table-container") || tabelaOrdens.parentNode;

      tabelaWrapper.appendChild(pagContainer);
    }

    pagContainer.innerHTML = "";
    if (totalPages <= 1) return;

    const wrapper = document.createElement("div");
    wrapper.className = "pagination";

    const prev = document.createElement("button");
    prev.textContent = "⬅ Anterior";
    prev.className = "page-btn";
    prev.disabled = currentPageOS === 1;

    const info = document.createElement("span");
    info.textContent = `Página ${currentPageOS} de ${totalPages}`;

    const next = document.createElement("button");
    next.textContent = "Próximo ➡";
    next.className = "page-btn";
    next.disabled = currentPageOS === totalPages;

    prev.onclick = () => {
      if (currentPageOS > 1) {
        currentPageOS--;
        carregarOrdens();
      }
    };

    next.onclick = () => {
      if (currentPageOS < totalPages) {
        currentPageOS++;
        carregarOrdens();
      }
    };

    wrapper.append(prev, info, next);
    pagContainer.appendChild(wrapper);
  }

  // ========================================================
  // CARREGAR TABELA DE O.S. (com paginação + pesquisa)
  // ========================================================
  function carregarOrdens() {
    const ordens = getOrdens();
    tabelaOrdens.innerHTML = "";

    const pagContainer = document.getElementById("paginacaoOS");

    // Lista com índice original para manter o data-index correto
    let listaFiltrada = ordens.map((os, idx) => ({ os, idx }));

    // Aplica filtro de pesquisa por O.S., título, categoria, responsável e status
    if (termoPesquisaOS && termoPesquisaOS.trim() !== "") {
      const q = termoPesquisaOS.toLowerCase();

      listaFiltrada = listaFiltrada.filter(({ os }) => {
        const numero = (os.numero || "").toLowerCase();
        const titulo = (os.titulo || "").toLowerCase();
        const categoria = (os.categoria || "").toLowerCase();
        const responsavel = (os.responsavelNome || "").toLowerCase();
        const status = (os.status || "").toLowerCase();

        return (
          numero.includes(q) ||
          titulo.includes(q) ||
          categoria.includes(q) ||
          responsavel.includes(q) ||
          status.includes(q)
        );
      });
    }

    if (!listaFiltrada.length) {
      tabelaOrdens.innerHTML =
        `<tr><td colspan="7">${ordens.length
          ? "Nenhuma ordem encontrada para a pesquisa."
          : "Nenhuma ordem registrada."
        }</td></tr>`;
      if (pagContainer) pagContainer.innerHTML = "";
      return;
    }

    const totalPages = Math.ceil(listaFiltrada.length / OS_PER_PAGE);
    if (currentPageOS > totalPages) currentPageOS = totalPages || 1;

    const start = (currentPageOS - 1) * OS_PER_PAGE;
    const pageItems = listaFiltrada.slice(start, start + OS_PER_PAGE);

    pageItems.forEach(({ os, idx }) => {
      const statusTexto = os.status || "—";
      const rawStatus = statusTexto.toLowerCase().trim();
      let statusClass = "";

      switch (rawStatus) {
        case "aberta":
        case "aberto":
          statusClass = "status-aberta";
          break;

        case "pendente":
          statusClass = "status-pendente";
          break;

        case "em andamento":
          statusClass = "status-andamento";
          break;

        case "concluída":
        case "concluida":
        case "concluído":
        case "concluido":
          statusClass = "status-concluida";
          break;

        default:
          statusClass = "status-aberta";
      }

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${os.numero}</td>
        <td>${os.titulo}</td>
        <td>${os.categoria}</td>
        <td>${os.responsavelNome || "—"}</td>
        <td class="status ${statusClass}">${statusTexto}</td>
        <td>${os.prioridade || "—"}</td>
        <td><button class="ver-btn" data-index="${idx}">Ver</button></td>
      `;
      tabelaOrdens.appendChild(tr);
    });

    document.querySelectorAll(".ver-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        abrirModalVer(index);
      });
    });

    renderPaginacaoOS(totalPages);
  }

  // ========================================================
  // ABRIR MODAL "VER"
  // ========================================================
  function abrirModalVer(index) {
    const ordens = getOrdens();
    const os = ordens[index];
    if (!os) return alert("Ordem não encontrada.");

    osIndexAtual = index;

    document.getElementById("verNumero").value = os.numero || "";
    document.getElementById("verTitulo").value = os.titulo || "";
    document.getElementById("verCategoria").value = os.categoria || "";
    document.getElementById("verResponsavel").value =
      os.responsavelNome || "";
    document.getElementById("verPrioridade").value =
      os.prioridade || "";
    document.getElementById("verDescricao").value =
      os.descricao || "";
    document.getElementById("verOcorrencia").value =
      os.ocorrencia || "";
    document.getElementById("verData").value =
      os.dataSugerida || "";
    document.getElementById("verLocal").value = os.local || "";

    const status = (os.status || "").toLowerCase().trim();

    if (
      ["concluída", "concluida", "concluido", "concluído"].includes(
        status
      )
    ) {
      btnConcluir.style.display = "none";
      btnAlterar.disabled = true;
      bloquearCamposVer(true);
    } else {
      btnConcluir.style.display = "inline-block";
      btnAlterar.disabled = false;
      bloquearCamposVer(true);
    }

    modalVer.classList.add("active");
  }

  // ========================================================
  // BLOQUEAR / DESBLOQUEAR CAMPOS
  // ========================================================
  function bloquearCamposVer(bloquear = true) {
    const campos = modalVer.querySelectorAll("input, textarea, select");
    campos.forEach((campo) => {
      campo.readOnly = bloquear;
      campo.disabled = bloquear;
      campo.classList.toggle("readonly", bloquear);
    });
  }

  // ========================================================
  // BOTÕES DO MODAL "VER"
  // ========================================================
  if (btnCancelarVer) {
    btnCancelarVer.addEventListener("click", () => {
      modalVer.classList.remove("active");
      bloquearCamposVer(true);
    });
  }

  if (btnAlterar) {
    btnAlterar.addEventListener("click", () => {
      bloquearCamposVer(false);
      btnSalvarAlteracoes.style.display = "inline-block";
      btnAlterar.style.display = "none";
    });
  }

  if (btnSalvarAlteracoes) {
    btnSalvarAlteracoes.addEventListener("click", () => {
      const ordens = getOrdens();
      const os = ordens[osIndexAtual];
      if (!os) return;

      os.titulo = document.getElementById("verTitulo").value;
      os.categoria = document.getElementById("verCategoria").value;
      os.responsavelNome =
        document.getElementById("verResponsavel").value;
      os.prioridade = document.getElementById("verPrioridade").value;
      os.local = document.getElementById("verLocal").value;
      os.descricao = document.getElementById("verDescricao").value;
      os.dataSugerida = document.getElementById("verData").value;

      setOrdens(ordens);
      bloquearCamposVer(true);

      btnSalvarAlteracoes.style.display = "none";
      btnAlterar.style.display = "inline-block";

      alert("✅ Alterações salvas com sucesso!");
      carregarOrdens();
    });
  }

  if (btnConcluir) {
    btnConcluir.addEventListener("click", () => {
      const ordens = getOrdens();
      const os = ordens[osIndexAtual];
      if (!os) return;

      os.status = "Concluído";
      setOrdens(ordens);

      sincronizarOcorrencia(os.ocorrencia, "Concluído", os.prioridade);

      alert("✅ Ordem de serviço concluída!");
      modalVer.classList.remove("active");
      carregarOrdens();
    });
  }

  // ========================================================
  // ABRIR MODAL DE NOVA O.S.
  // ========================================================
  function abrirModalNovaOS(prefill = null) {
    modalOverlay.classList.add("active");
    carregarResponsaveis();
    document.getElementById("numeroOS").value = gerarNumeroOS();

    const vincInput = document.getElementById("ocorrencia");
    if (vincInput) vincInput.dataset.protocolo = "";

    if (prefill) {
      document.getElementById("titulo").value = prefill.titulo || "";
      document.getElementById("categoria").value =
        prefill.categoria || "";
      document.getElementById("descricao").value =
        prefill.descricao || "";
      document.getElementById("ocorrencia").value = `${
        prefill.protocolo || ""
      } - ${prefill.solicitante?.nome || ""} - ${
        prefill.solicitante?.apartamento || ""
      }`;
      document.getElementById("ocorrencia").dataset.protocolo =
        prefill.protocolo || "";
      if (prefill.prioridade) {
        document.getElementById("prioridade").value =
          prefill.prioridade;
      }
    }
  }

  if (abrirBtn) {
    abrirBtn.addEventListener("click", () => abrirModalNovaOS(null));
  }

  if (cancelarBtn) {
    cancelarBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
      form.reset();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
        form.reset();
      }
    });
  }

  // ========================================================
  // CRIAR NOVA O.S. (SUBMIT)
  // ========================================================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero = document.getElementById("numeroOS").value;
    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const responsavelId =
      document.getElementById("responsavel").value;
    const local = document.getElementById("local").value.trim();
    const descricao =
      document.getElementById("descricao").value.trim();
    const dataSugerida =
      document.getElementById("dataSugerida").value;

    const protocoloOcorrencia =
      document.getElementById("ocorrencia").dataset.protocolo?.trim() ||
      document
        .getElementById("ocorrencia")
        .value?.split(" - ")[0]
        ?.trim() ||
      "";

    const camposVazios = [];
    if (!titulo) camposVazios.push("Título");
    if (!categoria) camposVazios.push("Categoria");
    if (!prioridade) camposVazios.push("Prioridade");
    if (!responsavelId) camposVazios.push("Responsável");
    if (!dataSugerida) camposVazios.push("Data Sugerida");

    if (camposVazios.length) {
      alert(
        "Preencha os campos obrigatórios: " + camposVazios.join(", ")
      );
      return;
    }

    // VALIDAÇÃO: DATA SUGERIDA NÃO PODE SER ANTERIOR A HOJE
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataEscolhida = new Date(dataSugerida + "T00:00:00");

    if (dataEscolhida < hoje) {
      alert("A data sugerida deve ser hoje ou uma data futura.");
      return;
    }

    const employees = getEmployees();
    const responsavel = employees.find(
      (e) => String(e.id) === String(responsavelId)
    );

    const responsavelNome = responsavel
      ? `${responsavel.name || responsavel.nome || "Sem nome"} - ${
          responsavel.position ||
          responsavel.cargo ||
          responsavel.funcao ||
          "Funcionário"
        }`
      : "Não atribuído";

    const novaOS = {
      numero,
      titulo,
      categoria,
      prioridade,
      responsavelId,
      responsavelNome,
      local,
      descricao,
      ocorrencia: protocoloOcorrencia,
      status: "Aberta",
      dataSugerida,
      dataCriacao: new Date().toLocaleDateString("pt-BR"),
    };

    const ordens = getOrdens();
    ordens.unshift(novaOS);
    setOrdens(ordens);

    if (protocoloOcorrencia) {
      sincronizarOcorrencia(
        protocoloOcorrencia,
        "Em andamento",
        prioridade
      );
    }

    alert("✅ Ordem de serviço criada com sucesso!");
    modalOverlay.classList.remove("active");
    form.reset();

    currentPageOS = 1;
    carregarOrdens();
  });

  // ========================================================
  // PESQUISA: BOTÃO + INPUT EM TEMPO REAL
  // ========================================================
  if (btnPesquisar) {
    btnPesquisar.addEventListener("click", () => {
      termoPesquisaOS = (campoPesquisa?.value || "").trim();
      currentPageOS = 1;
      carregarOrdens();
    });
  }

  if (campoPesquisa) {
    // Filtra a cada alteração no texto
    campoPesquisa.addEventListener("input", () => {
      termoPesquisaOS = campoPesquisa.value.trim();
      currentPageOS = 1;
      carregarOrdens();
    });

    // Escape limpa o campo e reseta a lista
    campoPesquisa.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        campoPesquisa.value = "";
        termoPesquisaOS = "";
        currentPageOS = 1;
        carregarOrdens();
      }
    });
  }

  // ========================================================
  // ABRIR AUTOMATICAMENTE VINDO DE OCORRÊNCIA
  // ========================================================
  (function abrirAutomaticoSeVindoDaOcorrencia() {
    const deveAbrir = localStorage.getItem("abrirModalOS");
    if (deveAbrir !== "true") {
      carregarOrdens();
      return;
    }

    const dados = JSON.parse(
      localStorage.getItem("ocorrenciaSelecionada") || "null"
    );
    localStorage.removeItem("abrirModalOS");
    localStorage.removeItem("ocorrenciaSelecionada");

    abrirModalNovaOS(dados || null);
    carregarOrdens();

    setTimeout(() => {
      document.querySelectorAll(".ver-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          abrirModalVer(index);
        });
      });
    }, 500);
  })();

  carregarOrdens();
});

// Logout (botão da sidebar)
document.getElementById("btnLogout")?.addEventListener("click", () => {
  logout();
});
