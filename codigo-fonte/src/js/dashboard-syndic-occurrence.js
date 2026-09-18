// =========================================================
// SMARTCONDO - DASHBOARD SÍNDICO - OCORRÊNCIAS
// =========================================================

class BdOcorrencia {
  recuperarTodos() {
    return JSON.parse(localStorage.getItem("smartcondo_ocorrencias")) || [];
  }

  salvarTodos(lista) {
    localStorage.setItem("smartcondo_ocorrencias", JSON.stringify(lista));
  }
}

const bdOcorrencia = new BdOcorrencia();

// =========================
// HELPERS
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

// Nome completo do solicitante (primeiro + último)
function montarNomeCompletoSolicitante(oc) {
  if (oc.solicitante?.nome && oc.solicitante?.sobrenome) {
    return `${oc.solicitante.nome} ${oc.solicitante.sobrenome}`;
  }

  if (oc.solicitante?.nome) {
    const partes = oc.solicitante.nome.trim().split(" ");
    if (partes.length > 1) {
      return `${partes[0]} ${partes[partes.length - 1]}`;
    }
    return partes[0];
  }

  if (oc.authorName) {
    const partes = oc.authorName.trim().split(" ");
    if (partes.length > 1) {
      return `${partes[0]} ${partes[partes.length - 1]}`;
    }
    return partes[0];
  }

  return "—";
}

// Apartamento / unidade do solicitante
function montarApartamentoSolicitante(oc) {
  return (
    oc.solicitante?.apartamento || // ocorrência criada na tela do morador
    oc.apartamento ||              // algum campo solto
    oc.unit ||                     // fallback
    "—"
  );
}

// =========================
// NORMALIZAÇÃO DE STATUS
// =========================

// Categoria para cards e classes (aberta / andamento / execucao / concluida)
function normalizarStatusCategoria(status) {
  const s = (status || "").toLowerCase().trim();

  if (!s || ["aberto", "aberta", "pendente"].includes(s)) return "aberta";

  if (s === "em andamento") return "andamento";

  if (s === "em execução" || s === "em execucao") return "execucao";

  if (
    ["concluído", "concluido", "concluída", "concluida"].includes(s)
  ) {
    return "concluida";
  }

  // fallback
  return "aberta";
}

// Texto “bonito” para exibir na tabela
function normalizarStatusTexto(status) {
  const categoria = normalizarStatusCategoria(status);

  switch (categoria) {
    case "aberta":
      return "Aberta";
    case "andamento":
      return "Em andamento";
    case "execucao":
      return "Em execução";
    case "concluida":
      return "Concluída";
    default:
      return "Aberta";
  }
}

// Class CSS de cor baseada na categoria
function obterClasseStatus(status) {
  const categoria = normalizarStatusCategoria(status);

  switch (categoria) {
    case "aberta":
      return "status-aberta";     // amarelo
    case "andamento":
      return "status-andamento";  // azul claro
    case "execucao":
      return "status-execucao";   // azul escuro
    case "concluida":
      return "status-concluida";  // verde
    default:
      return "status-aberta";
  }
}

// =========================================================
/* TABELA DE OCORRÊNCIAS COM FILTRO */
// =========================================================
function carregarTabelaOcorrencias(filtro = "") {
  const tbody = document.querySelector(".table-ocorrencias tbody");
  if (!tbody) return;

  const ocorrencias = bdOcorrencia.recuperarTodos().slice().reverse();

  let listaFiltrada = ocorrencias;

  const termo = filtro.trim().toLowerCase();

  if (termo) {
    listaFiltrada = ocorrencias.filter((o) => {
      const idStr = String(o.id ?? "").padStart(2, "0").toLowerCase();
      const titulo = (o.titulo || "").toLowerCase();
      const categoria = (o.categoria || "").toLowerCase();
      const statusTexto = normalizarStatusTexto(o.status).toLowerCase();

      return (
        idStr.includes(termo) ||
        titulo.includes(termo) ||
        categoria.includes(termo) ||
        statusTexto.includes(termo)
      );
    });
  }

  tbody.innerHTML = "";

  if (!listaFiltrada.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">
          ${termo ? "Nenhuma ocorrência encontrada para a pesquisa." : "Nenhuma ocorrência registrada."}
        </td>
      </tr>`;
    return;
  }

  listaFiltrada.forEach((o) => {
    const statusTexto = normalizarStatusTexto(o.status);
    const statusClass = obterClasseStatus(o.status);
    const prioridade = o.prioridade || "—";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="col-id">${String(o.id).padStart(2, "0")}</td>
      <td class="col-titulo">${o.titulo || "—"}</td>
      <td class="col-categoria">${o.categoria || "—"}</td>
      <td class="status ${statusClass}">${statusTexto}</td>
      <td class="col-prioridade">${prioridade}</td>
      <td><button class="btn-ver" data-protocolo="${o.protocolo || ""}">Ver</button></td>
    `;

    tbody.appendChild(tr);
  });

  // Eventos do botão "Ver"
  document.querySelectorAll(".btn-ver").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      abrirModalPorProtocolo(e.target.dataset.protocolo)
    );
  });
}

// =========================================================
/* CARDS RESUMO */
// =========================================================
function atualizarCardsResumo() {
  const ocorrencias = bdOcorrencia.recuperarTodos();

  let abertas = 0;
  let andamento = 0;
  let execucao = 0;
  let concluidas = 0;

  ocorrencias.forEach((o) => {
    const cat = normalizarStatusCategoria(o.status);

    if (cat === "aberta") abertas++;
    else if (cat === "andamento") andamento++;
    else if (cat === "execucao") execucao++;
    else if (cat === "concluida") concluidas++;
  });

  const elAbertas = document.getElementById("count-abertas");
  const elAndamento = document.getElementById("count-andamento");
  const elExecucao = document.getElementById("count-execucao");
  const elConcluidas = document.getElementById("count-concluidas");

  if (elAbertas) elAbertas.textContent = abertas;
  if (elAndamento) elAndamento.textContent = andamento;
  if (elExecucao) elExecucao.textContent = execucao;
  if (elConcluidas) elConcluidas.textContent = concluidas;
}

// =========================================================
/* MODAL — ABRIR POR PROTOCOLO */
// =========================================================
function abrirModalPorProtocolo(protocolo) {
  if (!protocolo) return;

  const ocorrencias = bdOcorrencia.recuperarTodos();
  const oc = ocorrencias.find(
    (o) => String(o.protocolo).trim() === String(protocolo).trim()
  );
  if (!oc) return;

  // Título e protocolo
  const elTitulo = document.getElementById("modalTitulo");
  if (elTitulo) elTitulo.textContent = oc.titulo || "—";

  const elProtocolo = document.getElementById("modalProtocolo");
  if (elProtocolo) elProtocolo.textContent = oc.protocolo || "—";

  // Solicitante (Nome - Apto/Unidade)
  const nome = montarNomeCompletoSolicitante(oc);
  const apto = montarApartamentoSolicitante(oc);
  const elSolicitante = document.getElementById("modalSolicitante");
  if (elSolicitante) {
    elSolicitante.textContent = `${nome} - ${apto}`;
  }

  // Data de abertura
  let dataAbertura = oc.dataAbertura;
  if (!dataAbertura && oc.criadaEm) {
    dataAbertura = formatarDataHoraBR(oc.criadaEm);
  }
  const elData = document.getElementById("modalData");
  if (elData) elData.textContent = dataAbertura || "—";

  // STATUS → mapear para opções do select
  const selectStatus = document.getElementById("modalStatus");
  if (selectStatus) {
    const original = (oc.status || "").toLowerCase().trim();
    let statusSelect = "Aberta";

    if (["", "aberto", "aberta", "pendente"].includes(original)) {
      statusSelect = "Aberta";
    } else if (original === "em andamento") {
      statusSelect = "Em andamento";
    } else if (original === "em execução" || original === "em execucao") {
      statusSelect = "Em execução";
    } else if (
      ["concluído", "concluido", "concluída", "concluida"].includes(
        original
      )
    ) {
      statusSelect = "Concluído";
    }

    selectStatus.value = statusSelect;

    // Botão Abrir O.S só aparece se estiver "Aberta"
    const btnAbrirOS = document.getElementById("btnAbrirOS");
    if (btnAbrirOS) {
      const podeAbrir = statusSelect === "Aberta";
      btnAbrirOS.disabled = !podeAbrir;
      btnAbrirOS.classList.toggle("disabled", !podeAbrir);
      btnAbrirOS.style.display = podeAbrir ? "inline-flex" : "none";
    }
  }

  // PRIORIDADE → se já existir, seleciona, senão deixa "Selecione..."
  const selectPrioridade = document.getElementById("modalPrioridade");
  if (selectPrioridade) {
    if (oc.prioridade) {
      selectPrioridade.value = oc.prioridade;
    } else {
      selectPrioridade.value = "";
    }
  }

  // Descrição (somente leitura)
  const elDescricao = document.getElementById("modalDescricao");
  if (elDescricao) elDescricao.value = oc.descricao || "—";

  // Guardar protocolo aberto no overlay
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.dataset.protocoloAberto = protocolo;
  overlay.classList.add("active");
}

// =========================================================
/* BOTÕES DO MODAL */
// =========================================================
document.getElementById("closeModal")?.addEventListener("click", () => {
  document.getElementById("modalOverlay")?.classList.remove("active");
});

// Salvar alterações de status/prioridade
document.getElementById("btnSalvarModal")?.addEventListener("click", () => {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;

  const protocolo = overlay.dataset.protocoloAberto;
  if (!protocolo) return;

  const selectStatus = document.getElementById("modalStatus");
  const selectPrioridade = document.getElementById("modalPrioridade");

  const novoStatus = selectStatus ? selectStatus.value : "";
  const novaPrioridade = selectPrioridade ? selectPrioridade.value : "";

  if (!novaPrioridade) {
    alert("Selecione uma prioridade antes de salvar.");
    return;
  }

  const ocorrencias = bdOcorrencia.recuperarTodos();
  const idx = ocorrencias.findIndex(
    (o) => String(o.protocolo).trim() === String(protocolo).trim()
  );
  if (idx === -1) return;

  if (novoStatus) ocorrencias[idx].status = novoStatus;
  ocorrencias[idx].prioridade = novaPrioridade;

  bdOcorrencia.salvarTodos(ocorrencias);

  overlay.classList.remove("active");
  carregarTabelaOcorrencias(); // recarrega sem filtro
  atualizarCardsResumo();
  alert("Alterações salvas com sucesso!");
});

// Abrir O.S. a partir da ocorrência
document.getElementById("btnAbrirOS")?.addEventListener("click", () => {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;

  const protocolo = overlay.dataset.protocoloAberto;
  if (!protocolo) return;

  const selectStatus = document.getElementById("modalStatus");
  const selectPrioridade = document.getElementById("modalPrioridade");

  const status = selectStatus ? selectStatus.value : "";
  const prioridade = selectPrioridade ? selectPrioridade.value : "";

  // Regra: só pode abrir O.S. se a ocorrência estiver "Aberta"
  if (status !== "Aberta") {
    alert("Só é possível abrir uma O.S. para ocorrências com status 'Aberta'.");
    return;
  }

  if (!prioridade) {
    alert("Selecione uma prioridade antes de abrir uma O.S.");
    return;
  }

  const ocorrencias = bdOcorrencia.recuperarTodos();
  const oc = ocorrencias.find(
    (o) => String(o.protocolo).trim() === String(protocolo).trim()
  );
  if (!oc) return;

  if (!oc.protocolo) {
    alert("Erro: ocorrência sem protocolo.");
    return;
  }

  const dadosOcorrencia = {
    titulo: oc.titulo,
    categoria: oc.categoria,
    descricao: oc.descricao,
    protocolo: oc.protocolo,
    solicitante: oc.solicitante || {
      nome: montarNomeCompletoSolicitante(oc),
      apartamento: montarApartamentoSolicitante(oc),
    },
    status: status || oc.status || "Aberta",
    prioridade: prioridade,
    id: oc.id,
  };

  localStorage.setItem("ocorrenciaSelecionada", JSON.stringify(dadosOcorrencia));
  localStorage.setItem("abrirModalOS", "true");

  overlay.classList.remove("active");
  window.location.href = "dashboard-sindico-ordem-servico.html";
});

// =========================================================
/* INICIALIZAÇÃO */
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  carregarTabelaOcorrencias();
  atualizarCardsResumo();

  // Busca por ID, título, categoria e status
  const campoPesquisa = document.getElementById("campoPesquisa");
  const btnPesquisar = document.getElementById("btnPesquisar");

  if (btnPesquisar && campoPesquisa) {
    btnPesquisar.addEventListener("click", () => {
      const termo = campoPesquisa.value || "";
      carregarTabelaOcorrencias(termo);
    });
  }

  if (campoPesquisa) {
    // Filtra em tempo real enquanto digita
    campoPesquisa.addEventListener("keyup", (e) => {
      const termo = campoPesquisa.value || "";
      carregarTabelaOcorrencias(termo);
    });
  }

  // Atualiza o botão Abrir O.S. quando o status for alterado no select
  const selectStatus = document.getElementById("modalStatus");
  const btnAbrirOS = document.getElementById("btnAbrirOS");

  if (selectStatus && btnAbrirOS) {
    const podeAbrirInicial = selectStatus.value === "Aberta";
    btnAbrirOS.disabled = !podeAbrirInicial;
    btnAbrirOS.classList.toggle("disabled", !podeAbrirInicial);
    btnAbrirOS.style.display = podeAbrirInicial ? "inline-flex" : "none";

    selectStatus.addEventListener("change", () => {
      const podeAbrir = selectStatus.value === "Aberta";
      btnAbrirOS.disabled = !podeAbrir;
      btnAbrirOS.classList.toggle("disabled", !podeAbrir);
      btnAbrirOS.style.display = podeAbrir ? "inline-flex" : "none";
    });
  }
});
