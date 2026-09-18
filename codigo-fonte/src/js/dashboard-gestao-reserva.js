import { logout } from "../pages/login/auth/logout.js";
(function () {
	const STATIC_KEY = "reservations";
	const DYNAMIC_KEY = "smartcondo_reservations";
	const DECISIONS_KEY = "smartcondo_reservas_resultados";
	const DB_PATHS = ["../../../db/db.json"];
	const containerSelector = ".container-reservas";
	const resultadosContainerId = "lista-resultados";

	const CARDS_PER_PAGE = 6;
	const RESULTS_PER_PAGE = 5;
	let currentCardPage = 1;
	let currentResultPage = 1;
	let searchQuery = "";

	const normalizeStatus = (s) => {
		const v = String(s || "pending").toLowerCase().trim();
		if (["approved", "approve", "aprovado"].includes(v)) return "approved";
		if (["rejected", "reject", "recusado"].includes(v)) return "rejected";
		return "pending";
	};

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

	const getLoggedReviewer = () => {
		try {
			const raw = sessionStorage.getItem("smartcondo_loggedInUser");
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	};

	const toDate = (dateISO, timeHHMM) => {
		const [Y, M, D] = (dateISO || "").split("-").map(Number);
		const [h, m] = (timeHHMM || "00:00").split(":").map(Number);
		if (!Y || !M || !D) return null;
		return new Date(Y, M - 1, D, h || 0, m || 0, 0, 0);
	};

	const overlaps = (aStart, aEnd, bStart, bEnd) =>
		aStart && aEnd && bStart && bEnd && aStart < bEnd && bStart < aEnd;

	const formatDateTimeBR = (dateISO, timeHHMM) => {
		const d = toDate(dateISO, timeHHMM);
		return d
			? d.toLocaleString("pt-BR", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
			  })
			: `${dateISO || ""} ${timeHHMM || ""}`;
	};

	const formatPeriod = (r) => {
		const ini = formatDateTimeBR(r.dateInit, r.startTime);
		const fim = formatDateTimeBR(r.dateFinished || r.dateInit, r.endTime);
		return `${ini} até ${fim}`;
	};

	// =========================
	// STORAGE
	// =========================
	function ensureLocalKeys() {
		if (localStorage.getItem(DYNAMIC_KEY) === null)
			localStorage.setItem(DYNAMIC_KEY, JSON.stringify([]));
		if (localStorage.getItem(DECISIONS_KEY) === null)
			localStorage.setItem(DECISIONS_KEY, JSON.stringify({}));
	}

	function getDecisionsMap() {
		try {
			return JSON.parse(localStorage.getItem(DECISIONS_KEY)) || {};
		} catch {
			return {};
		}
	}

	function setDecision(composedKey, status, reservationObj) {
		const map = getDecisionsMap();
		const reviewer = getLoggedReviewer();

		// Atualiza o mapa de decisões
		map[composedKey] = {
			status,
			reviewedAt: new Date().toISOString(),
			reviewer: reviewer
				? { name: reviewer.name, role: reviewer.role }
				: null,
			snapshot: {
				space: reservationObj.space,
				authorName: reservationObj.authorName,
				dateInit: reservationObj.dateInit,
				startTime: reservationObj.startTime,
				dateFinished:
					reservationObj.dateFinished || reservationObj.dateInit,
				endTime: reservationObj.endTime,
			},
		};
		localStorage.setItem(DECISIONS_KEY, JSON.stringify(map));

		// 🔹 Atualiza também no localStorage "reservations" e "smartcondo_reservations"
		try {
			const staticData = JSON.parse(
				localStorage.getItem("reservations") || "[]"
			);
			const dynamicData = JSON.parse(
				localStorage.getItem("smartcondo_reservations") || "[]"
			);

			const updateStatus = (arr) =>
				arr.map((r) => {
					const key = [
						r.id,
						r.space,
						r.dateInit,
						r.startTime,
						r.dateFinished,
						r.endTime,
						r.authorId || "",
					].join("|");
					if (key === composedKey) {
						return {
							...r,
							// 🔧 Aqui foi corrigido: agora salva "rejected"
							status: status === "approved" ? "approved" : "rejected",
						};
					}
					return r;
				});

			const updatedStatic = updateStatus(staticData);
			const updatedDynamic = updateStatus(dynamicData);

			localStorage.setItem("reservations", JSON.stringify(updatedStatic));
			localStorage.setItem(
				"smartcondo_reservations",
				JSON.stringify(updatedDynamic)
			);
		} catch (err) {
			console.warn("Erro ao atualizar status no localStorage:", err);
		}

		return map;
	}

	async function loadStaticReservationsOnce() {
		for (const path of DB_PATHS) {
			try {
				const res = await fetch(path);
				if (!res.ok) continue;
				const data = await res.json();
				if (!localStorage.getItem(STATIC_KEY)) {
					const arr = Array.isArray(data[STATIC_KEY])
						? data[STATIC_KEY]
						: [];
					localStorage.setItem(STATIC_KEY, JSON.stringify(arr));
				}
				return;
			} catch {
				continue;
			}
		}
		if (!localStorage.getItem(STATIC_KEY)) {
			localStorage.setItem(STATIC_KEY, JSON.stringify([]));
		}
	}

	function getAllReservationsMerged() {
		let staticData = [];
		let dynamicData = [];
		try {
			staticData = JSON.parse(localStorage.getItem(STATIC_KEY) || "[]");
			dynamicData = JSON.parse(localStorage.getItem(DYNAMIC_KEY) || "[]");
		} catch {
			return [];
		}

		const all = [...staticData, ...dynamicData].map((r) => ({
			...r,
			status: normalizeStatus(r.status),
		}));

		const seen = new Set();
		const unique = [];
		for (const r of all) {
			const key = makeKey(r);
			if (!seen.has(key)) {
				seen.add(key);
				unique.push({ ...r, _key: key });
			}
		}
		return unique;
	}

	const hasConflict = (current, all, decisionsMap) => {
		const curStart = toDate(current.dateInit, current.startTime);
		const curEnd = toDate(
			current.dateFinished || current.dateInit,
			current.endTime
		);
		return all.some((other) => {
			if (other._key === current._key) return false;
			if (
				(other.space || "").toLowerCase() !==
				(current.space || "").toLowerCase()
			)
				return false;

			const d = decisionsMap[other._key];
			const effectiveStatus = normalizeStatus(
				d?.status || other.status || "pending"
			);
			if (effectiveStatus === "rejected") return false;

			const oStart = toDate(other.dateInit, other.startTime);
			const oEnd = toDate(
				other.dateFinished || other.dateInit,
				other.endTime
			);
			return overlaps(curStart, curEnd, oStart, oEnd);
		});
	};

	function matchesSearch(obj) {
		if (!searchQuery.trim()) return true;
		const termo = searchQuery.toLowerCase();
		return (
			obj.space?.toLowerCase().includes(termo) ||
			obj.authorName?.toLowerCase().includes(termo) ||
			obj.dateInit?.includes(termo) ||
			obj.dateFinished?.includes(termo)
		);
	}

	// =========================
	// RENDERIZAÇÃO
	// =========================
	function renderCards(reservations, decisionsMap) {
		const container = document.querySelector(containerSelector);
		if (!container) return;

		const pendentes = reservations.filter((r) => {
			const statusEff = normalizeStatus(
				decisionsMap[r._key]?.status || r.status || "pending"
			);
			return statusEff === "pending" && matchesSearch(r);
		});

		const totalPages = Math.ceil(pendentes.length / CARDS_PER_PAGE);
		if (currentCardPage > totalPages) currentCardPage = totalPages || 1;

		container.innerHTML = "";

		if (!pendentes.length) {
			container.innerHTML = `<p>Nenhuma reserva encontrada.</p>`;
			renderPagination(totalPages, currentCardPage, "cards");
			return;
		}

		const startIdx = (currentCardPage - 1) * CARDS_PER_PAGE;
		const paginated = pendentes.slice(startIdx, startIdx + CARDS_PER_PAGE);

		paginated.forEach((r) => {
			const conflict = hasConflict(r, reservations, decisionsMap);
			const card = document.createElement("div");
			card.className = "card-reserva";
			card.dataset.key = r._key;

			const alertaHtml = conflict
				? `<p class="alerta"><strong>Alerta:</strong> Já existe uma reserva nesta data/horário para ${r.space}.</p>`
				: "";

			const dataRecebida = r.dateRegistered
				? (() => {
						const d = new Date(r.dateRegistered);
						return !isNaN(d)
							? d.toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
							  })
							: r.dateRegistered;
				  })()
				: null;

			card.innerHTML = `
        <h3>${r.space} 📅 <span class="badge badge-pendente">Pendente</span></h3>
        ${alertaHtml}
        <div class="detalhes-reserva">
          <p><strong>Período:</strong> ${formatPeriod(r)}</p>
          <p><strong>Solicitante:</strong> ${r.authorName || "—"}</p>
          ${
				dataRecebida
					? `<p><strong>Pedido recebido em:</strong> ${dataRecebida}</p>`
					: ""
			}
        </div>
        <div class="botoes-acao">
          <button class="btn btn-aceitar">Aceitar</button>
          <button class="btn btn-recusar">Recusar</button>
        </div>
      `;
			container.appendChild(card);
		});

		renderPagination(totalPages, currentCardPage, "cards");
		attachContainerHandlers();
	}

	// =========================
	// RESULTADOS
	// =========================
	function renderResults(decisionsMap) {
		const list = document.getElementById(resultadosContainerId);
		if (!list) return;

		list.innerHTML = "";

		const entries = Object.entries(decisionsMap).filter(([_, info]) =>
			matchesSearch(info.snapshot)
		);
		const totalPages = Math.ceil(entries.length / RESULTS_PER_PAGE);
		if (currentResultPage > totalPages) currentResultPage = totalPages || 1;

		if (!entries.length) {
			list.innerHTML = `<div class="sem-resultados"><p>Nenhuma solicitação encontrada.</p></div>`;
			renderPagination(totalPages, currentResultPage, "results");
			return;
		}

		const startIdx = (currentResultPage - 1) * RESULTS_PER_PAGE;
		const paginated = entries.slice(startIdx, startIdx + RESULTS_PER_PAGE);

		for (const [, info] of paginated) {
			const r = info.snapshot || {};
			const row = document.createElement("div");
			row.className = "resultados-grid row";

			const statusClass =
				info.status === "approved"
					? "status-aprovado"
					: "status-recusado";

			// ✅ Datas + horas formatadas
			const start = formatDateTimeBR(r.dateInit, r.startTime);
			const end = formatDateTimeBR(
				r.dateFinished || r.dateInit,
				r.endTime
			);

			row.innerHTML = `
        <span>${r.space || "—"}</span>
        <span>${r.authorName || "—"}</span>
        <span>${start}</span>
        <span>${end}</span>
        <span><strong class="${statusClass}">
          ${info.status === "approved" ? "Aprovado" : "Recusado"}
        </strong></span>
      `;
			list.appendChild(row);
		}

		renderPagination(totalPages, currentResultPage, "results");
	}

	// =========================
	// PAGINAÇÃO E EVENTOS
	// =========================
	function renderPagination(totalPages, currentPage, type) {
		const existing = document.querySelector(`.pagination.${type}`);
		if (existing) existing.remove();
		if (totalPages <= 1) return;

		const pag = document.createElement("div");
		pag.className = `pagination ${type}`;
		pag.innerHTML = `
      <button class="page-btn prev" ${
			currentPage === 1 ? "disabled" : ""
		}>⬅ Anterior</button>
      <span class="page-info">Página ${currentPage} de ${totalPages}</span>
      <button class="page-btn next" ${
			currentPage === totalPages ? "disabled" : ""
		}>Próximo ➡</button>
    `;

		const target =
			type === "cards"
				? document.querySelector(containerSelector)
				: document.querySelector(`#${resultadosContainerId}`)?.parentElement;

		if (target) target.insertAdjacentElement("afterend", pag);

		pag.querySelector(".prev").addEventListener("click", () => {
			if (type === "cards") currentCardPage--;
			else currentResultPage--;
			refresh();
		});

		pag.querySelector(".next").addEventListener("click", () => {
			if (type === "cards") currentCardPage++;
			else currentResultPage++;
			refresh();
		});
	}

	function attachContainerHandlers() {
		const container = document.querySelector(containerSelector);
		if (!container || container._handlersAttached) return;
		container._handlersAttached = true;

		container.addEventListener("click", (ev) => {
			const btn = ev.target.closest(".btn-aceitar, .btn-recusar");
			if (!btn) return;
			const card = btn.closest(".card-reserva");
			if (!card) return;

			const composedKey = card.dataset.key;
			const all = getAllReservationsMerged();
			const resObj = all.find((r) => r._key === composedKey);
			if (!resObj) return;

			const status = btn.classList.contains("btn-aceitar")
				? "approved"
				: "rejected";
			const map = setDecision(composedKey, status, resObj);
			card.classList.add("fade-out");
			setTimeout(() => card.remove(), 600);
			renderResults(map);
		});
	}

	function refresh() {
		const all = getAllReservationsMerged();
		const decisions = getDecisionsMap();
		renderCards(all, decisions);
		renderResults(decisions);
	}

	// =========================
	// INICIALIZAÇÃO
	// =========================
	document.addEventListener("DOMContentLoaded", async () => {
		ensureLocalKeys();
		await loadStaticReservationsOnce();
		refresh();

		const usuario = JSON.parse(
			sessionStorage.getItem("smartcondo_loggedInUser") || "null"
		);
		console.log(usuario);
		const span = document.getElementById("usuarioLogado");
		if (span && usuario && usuario.name && usuario.role) {
			span.textContent = `${usuario.name}, ${
				usuario.role === "syndic" ? "Síndico" : "Morador"
			}`;
		}

		const campo = document.getElementById("campoPesquisa");
		let debounce;
		if (campo) {
			campo.addEventListener("input", () => {
				clearTimeout(debounce);
				debounce = setTimeout(() => {
					searchQuery = campo.value.trim();
					currentCardPage = 1;
					currentResultPage = 1;
					refresh();
				}, 250);
			});
		}
	});
})();

document.getElementById("btnLogout").addEventListener("click", () => {
	logout();
});

// Controles do menu "Mais" (mobile)
const openMoreBtn = document.getElementById("openMore");
const moreMenu = document.getElementById("moreMenu");

if (openMoreBtn && moreMenu) {
  // Abre/fecha o menu ao clicar no botão ➕
  openMoreBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita fechar imediatamente
    moreMenu.classList.toggle("open");
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    const clickDentroMenu = moreMenu.contains(e.target);
    const clickNoBotao = openMoreBtn.contains(e.target);
    if (!clickDentroMenu && !clickNoBotao) {
      moreMenu.classList.remove("open");
    }
  });
}
