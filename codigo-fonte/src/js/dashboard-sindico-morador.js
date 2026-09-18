// ========================================================= // Comentário visual de seção: separa a área de "modelo" (dados)
// MODELO DE DADOS E LÓGICA DE NEGÓCIO                      // e regras de negócio do restante do código.
// =========================================================

class Morador {                                             // Declara a classe que representa um morador (molde/estrutura).
    constructor(firstName, lastName, cpf, date, email, phone, unit, bond, vacancies) { // Construtor: recebe os dados iniciais.
        this.id = null;                                     // ID começa nulo; será definido ao salvar no "banco".
        this.firstName = firstName;                         // Nome.
        this.lastName = lastName;                           // Sobrenome.
        this.cpf = cpf;                                     // CPF (texto).
        this.date = date;                                   // Data de nascimento (string no formato do input).
        this.email = email;                                 // E-mail.
        this.phone = phone;                                 // Telefone.
        this.unit = unit;                                   // Unidade/apartamento.
        this.bond = bond;                                   // Vínculo (ex.: proprietário, inquilino).
        this.vacancies = vacancies;                         // Número de vagas de garagem.
        this.password = this.gerarSenhaPadrao();
        this.firstLogin = true; // marca como primeiro acesso
    }

    validarDados() {                                        // Método para checar se os dados estão corretos.
        const erros = {};                                   // Objeto onde guardaremos mensagens de erro por campo.

        if (!this.firstName) erros.firstName = 'O nome é obrigatório.';      // Se não tem nome, erro.
        if (!this.lastName) erros.lastName = 'O sobrenome é obrigatório.';   // Se não tem sobrenome, erro.

        if (!this.cpf) {                                    // Se CPF não foi informado…
            erros.cpf = 'O CPF é obrigatório.';             // …marca erro.
        } else if (!this.validarCPF(this.cpf)) {            // Senão, valida o CPF matematicamente.
            erros.cpf = 'CPF inválido.';                    // Se for inválido, marca erro.
        }

        if (!this.date) erros.date = 'A data de nascimento é obrigatória.';  // Data obrigatória.

        if (!this.email) {                                  // E-mail obrigatório.
            erros.email = 'O e-mail é obrigatório.';
        } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {    // Teste básico de formato de e-mail usando regex.
            erros.email = 'Formato de e-mail inválido.';
        }

        if (!this.phone) {                                  // Telefone obrigatório.
            erros.phone = 'O telefone é obrigatório.';
        } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(this.phone)) { // Regex simples para formatos comuns no BR.
            erros.phone = 'Formato de telefone inválido.';
        }

        if (!this.unit) erros.unit = 'A unidade é obrigatória.'; // Unidade obrigatória.
        if (!this.bond) erros.bond = 'O vínculo é obrigatório.'; // Vínculo obrigatório.
        if (!this.vacancies) erros.vacancies = 'Informe o número de vagas.'; // Vagas obrigatórias.

        return erros;                                       // Retorna um objeto vazio (sem erros) ou com mensagens de erro.
    }

    validarCPF(cpf) {                                       // Método para validar CPF de forma matemática.
        cpf = cpf.replace(/[^\d]+/g, '');                   // Remove tudo que não for número.
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Reprova vazio, diferente de 11 dígitos ou todos iguais.

        let add = 0;                                        // Cálculo do primeiro dígito verificador.
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i); // Soma ponderada dos 9 primeiros dígitos.
        let rev = 11 - (add % 11);                          // Calcula resto.
        if (rev === 10 || rev === 11) rev = 0;              // Ajuste segundo regra do CPF.
        if (rev !== parseInt(cpf.charAt(9))) return false;  // Confere com o 10º dígito.

        add = 0;                                            // Cálculo do segundo dígito verificador.
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i); // Soma ponderada dos 10 primeiros.
        rev = 11 - (add % 11);                              // Calcula resto.
        if (rev === 10 || rev === 11) rev = 0;              // Ajuste.
        if (rev !== parseInt(cpf.charAt(10))) return false; // Confere com o 11º dígito.

        return true;                                        // Se passou por tudo, CPF válido.
    }

    gerarSenhaPadrao() {
        // Extrai o ano da data (ex.: "1998" de "1998-06-25")
        const ano = this.date ? this.date.split('-')[0] : "0000";

        // Pega os 3 primeiros dígitos do CPF numérico
        const cpfLimpo = this.cpf.replace(/[^\d]/g, '');
        const primeiros3 = cpfLimpo.substring(0, 3);

        // Junta ano + 3 primeiros dígitos do CPF
        return ano + primeiros3;
    }

}

class Bd {                                                  // Classe "Bd": simula um banco de dados usando localStorage.
    constructor() {                                         // Ao criar, garante que as chaves existam.
        this.DB_KEY = 'smartcondo_moradores';               // Nome da chave onde ficam os registros.
        this.META_KEY = 'smartcondo_metadata';              // Nome da chave onde guardamos metadados (último ID).

        if (localStorage.getItem(this.DB_KEY) === null)     // Se não existe base de moradores…
            localStorage.setItem(this.DB_KEY, JSON.stringify([])); // …cria como array vazio.

        if (localStorage.getItem(this.META_KEY) === null)   // Se não existe metadado…
            localStorage.setItem(this.META_KEY, JSON.stringify({ lastId: 0 })); // …cria com lastId = 0.
    }
    _getDb() { return JSON.parse(localStorage.getItem(this.DB_KEY)); } // Lê e converte a lista de moradores.
    _setDb(db) { localStorage.setItem(this.DB_KEY, JSON.stringify(db)); } // Salva a lista (como JSON).
    _getMetadata() { return JSON.parse(localStorage.getItem(this.META_KEY)); } // Lê metadados.
    _setMetadata(meta) { localStorage.setItem(this.META_KEY, JSON.stringify(meta)); } // Salva metadados.

    getProximoId() {                                        // Gera um novo ID sequencial.
        let meta = this._getMetadata();                      // Lê metadados atuais.
        meta.lastId++;                                       // Incrementa o último ID.
        this._setMetadata(meta);                             // Salva de volta.
        return meta.lastId;                                  // Retorna o novo ID.
    }
    gravar(morador) {                                       // Insere um novo morador no "banco".
        const db = this._getDb();                           // Lê a lista atual.
        morador.id = this.getProximoId();                   // Atribui um ID único.
        db.push(morador);                                    // Adiciona ao array.
        this._setDb(db);                                     // Salva.
    }
    recuperarTodosRegistros() { return this._getDb(); }     // Retorna a lista completa de moradores.
    buscarPorId(id) { return this._getDb().find(m => m.id === id); } // Procura um morador pelo ID.
    remover(id) {                                           // Remove um morador pelo ID.
        let db = this._getDb().filter(m => m.id !== id);     // Filtra quem não é o ID informado.
        this._setDb(db);                                     // Salva a lista filtrada.
    }
    atualizar(id, moradorAtualizado) {                      // Atualiza dados de um morador existente.
        let db = this._getDb();                             // Lê a lista.
        const i = db.findIndex(m => m.id === id);           // Encontra a posição do morador.
        if (i !== -1) {                                     // Se encontrou…
            moradorAtualizado.id = id;                      // Garante que o ID permaneça o mesmo.
            db[i] = moradorAtualizado;                      // Substitui o objeto no array.
            this._setDb(db);                                // Salva a lista atualizada.
        }
    }
    pesquisar(termo) {                                      // Pesquisa simples por vários campos.
        const db = this._getDb();                           // Lê a lista.
        if (!termo) return db;                              // Se não tem termo, retorna tudo.
        termo = termo.toLowerCase();                        // Coloca termo em minúsculas pra comparar.
        return db.filter(m =>                               // Filtra por nome, sobrenome, unidade ou CPF.
            m.firstName.toLowerCase().includes(termo) ||
            m.lastName.toLowerCase().includes(termo) ||
            m.unit.toLowerCase().includes(termo) ||
            m.cpf.includes(termo)
        );
    }
}

let bd = new Bd();                                          // Cria uma instância do "banco" para usar no restante do código.

// ========================================================= // Nova seção: controle da Interface (tela).
// CONTROLE DA INTERFACE (UI)
// =========================================================

let paginaAtual = 1;                                        // Página atual da lista (para paginação).
const moradoresPorPagina = 10;                              // Quantos moradores mostrar por página.
let idEmEdicao = null;                                      // Armazena o ID do morador que está sendo editado (ou null).

function showError(fieldId, message) {                      // Mostra um erro visual em um campo de formulário.
    const field = document.getElementById(fieldId);         // Pega o input pelo ID (ex.: 'firstName').
    const errorSpan = document.getElementById('error-' + fieldId); // Pega o span de erro (ex.: 'error-firstName').
    if (field) field.classList.add('invalid-field');        // Adiciona classe que destaca o campo com erro.
    if (errorSpan) errorSpan.textContent = message;         // Mostra a mensagem de erro.
}

function clearErrors() {                                    // Limpa todos os erros na tela.
    document.querySelectorAll('.invalid-field').forEach(f => f.classList.remove('invalid-field')); // Remove destaque de erro.
    document.querySelectorAll('.error-message').forEach(s => s.textContent = ''); // Zera os textos de erro.
}

function goToStep(stepNumber) {                             // Controla o "passo 1" e "passo 2" do formulário (wizard).
    const step1 = document.getElementById('step1');         // Div do passo 1.
    const step2 = document.getElementById('step2');         // Div do passo 2.
    const step1Indicator = document.getElementById('step1-indicator'); // Indicador visual do passo 1.
    const step2Indicator = document.getElementById('step2-indicator'); // Indicador visual do passo 2.

    if (stepNumber === 1) {                                 // Se pediu para ir ao passo 1…
        step2.classList.remove('active');                   // Esconde passo 2.
        step1.classList.add('active');                      // Mostra passo 1.
        step2Indicator.classList.remove('active');          // Atualiza indicador.
        step1Indicator.classList.add('active');             // Atualiza indicador.
    } else if (stepNumber === 2) {                          // Se pediu para ir ao passo 2…
        step1.classList.remove('active');                   // Esconde passo 1.
        step2.classList.add('active');                      // Mostra passo 2.
        step1Indicator.classList.remove('active');          // Atualiza indicador.
        step2Indicator.classList.add('active');             // Atualiza indicador.
    }
}

function cadastrarMorador() {                               // Função chamada ao enviar o formulário de cadastro.
    clearErrors();                                          // Limpa erros anteriores.

    const bondElement = document.querySelector('input[name="bond"]:checked'); // Pega qual vínculo foi marcado (radio).
    const bondValue = bondElement ? bondElement.value : ""; // Se não tiver, vira string vazia.

    const morador = new Morador(                            // Cria um objeto Morador com os valores dos inputs.
        document.getElementById('firstName').value.trim(),  // Nome (sem espaços extras).
        document.getElementById('lastName').value.trim(),   // Sobrenome.
        document.getElementById('cpf').value.trim(),        // CPF.
        document.getElementById('date').value,              // Data.
        document.getElementById('email').value.trim(),      // E-mail.
        document.getElementById('phone').value.trim(),      // Telefone.
        document.getElementById('unit').value.trim(),       // Unidade.
        bondValue,                                          // Vínculo.
        document.getElementById('vacancies').value.trim()   // Vagas.
    );

    const erros = morador.validarDados();                   // Valida os dados e recebe possíveis erros.

    if (Object.keys(erros).length > 0) {                    // Se houver pelo menos um erro…
        for (const campo in erros) { showError(campo, erros[campo]); } // Marca cada campo problemático.
        exibirFeedback(false, "Por favor, corrija os campos destacados."); // Mostra um aviso geral.

        const primeiroCampoComErro = Object.keys(erros)[0]; // Descobre o primeiro campo que deu erro.
        const elementoComErro = document.getElementById(primeiroCampoComErro); // Localiza o input correspondente.
        if (elementoComErro) {                              // Se achou…
            if (elementoComErro.closest('#step1')) { goToStep(1); }  // Vai para o passo onde esse campo está.
            else if (elementoComErro.closest('#step2')) { goToStep(2); }
        }
        return;                                             // Interrompe o cadastro (não salva).
    }

    bd.gravar(morador);                                     // Salva o morador no "banco".
exibirFeedback(true, `Morador cadastrado com sucesso!<br>
<strong>Senha padrão: </strong> ${morador.cpf}`);
    pesquisarMorador();                                     // Atualiza a lista visível (respeitando filtro/página).
    document.getElementById('modalOverlay').classList.remove('active'); // Fecha o modal de cadastro.
    document.getElementById('formCadastrarMorador').reset(); // Limpa o formulário para o próximo uso.
}

function carregaListaMoradores(listaParaExibir = null) {    // Monta a tabela com os moradores na tela.
    const moradores = listaParaExibir === null ? bd.recuperarTodosRegistros() : listaParaExibir; // Usa lista filtrada ou completa.
    const tbody = document.getElementById('listaMoradores'); // Corpo da tabela.
    tbody.innerHTML = '';                                   // Limpa a tabela antes de preencher.

    if (moradores.length === 0) {                           // Se não há moradores para mostrar…
        tbody.innerHTML = '<tr><td colspan="5"><p class="sem-moradores">Nenhum morador encontrado.</p></td></tr>'; // Mensagem amigável.
        document.getElementById('paginacao').innerHTML = ''; // Some com a paginação.
        return;                                             // Sai da função.
    }

    const totalPaginas = Math.ceil(moradores.length / moradoresPorPagina); // Calcula quantas páginas existem no total.
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas > 0 ? totalPaginas : 1; // Garante que a página atual exista.

    const moradoresPagina = moradores.slice((paginaAtual - 1) * moradoresPorPagina, paginaAtual * moradoresPorPagina); // Recorta os itens da página.

    moradoresPagina.forEach(m => {                          // Para cada morador desta página…
        const linha = tbody.insertRow();                    // Cria uma nova linha na tabela.
        linha.insertCell(0).innerHTML = `${m.firstName} ${m.lastName}`; // Coluna: nome completo.
        linha.insertCell(1).innerHTML = m.unit;             // Coluna: unidade.
        linha.insertCell(2).innerHTML = m.bond;             // Coluna: vínculo.

        const financeiro = linha.insertCell(3);             // Coluna: situação financeira (aqui é estática).
        financeiro.innerHTML = '✔ Em dia';                  // Texto fixo.
        financeiro.classList.add('em-dia');                 // Classe para estilizar "em dia".

        const acoes = linha.insertCell(4);                  // Coluna: ações (editar/excluir).
        acoes.classList.add('acoes');                       // Classe para estilização.

        const btnEditar = document.createElement('a');      // Cria o botão de editar (como link/âncora).
        btnEditar.className = 'btn-acao';                   // Classe para estilo do botão.
        btnEditar.innerHTML = '✏️';                         // Ícone de lápis.
        btnEditar.title = 'Editar Morador';                 // Dica ao passar o mouse.
        btnEditar.addEventListener('click', () => editarMorador(m.id)); // Ao clicar, abre modal de edição.

        const btnDeletar = document.createElement('a');     // Cria o botão de deletar.
        btnDeletar.className = 'btn-acao';                  // Classe de estilo.
        btnDeletar.innerHTML = '🗑️';                        // Ícone de lixeira.
        btnDeletar.title = 'Excluir Morador';               // Dica.
        btnDeletar.addEventListener('click', () => deletarMorador(m.id)); // Ao clicar, confirma e exclui.

        acoes.appendChild(btnEditar);                       // Adiciona botão editar na célula.
        acoes.appendChild(btnDeletar);                      // Adiciona botão excluir na célula.
    });

    renderizarPaginacao(totalPaginas);                      // Atualiza a área de paginação (botões de página).
}

function renderizarPaginacao(totalPaginas) {                // Desenha os botões de paginação.
    const container = document.getElementById('paginacao'); // Elemento onde ficam os botões.
    container.innerHTML = '';                               // Limpa antes de recriar.
    if (totalPaginas <= 1) return;                          // Se só tem 1 página, não mostra paginação.

    const criarBotao = (texto, pageNum, ativo = false, desativado = false) => { // Função auxiliar para criar um botão.
        const botao = document.createElement('button');     // Cria um <button>.
        botao.innerHTML = texto;                            // Define o texto (ou ícone).
        botao.className = 'btn-paginacao';                  // Classe para estilo.
        if (ativo) botao.classList.add('ativo');            // Marca visualmente a página atual.
        botao.disabled = desativado;                        // Desativa se necessário (ex.: anterior na 1ª página).
        botao.addEventListener('click', () => {             // Ao clicar, muda a página e recarrega a lista (com filtro).
            paginaAtual = pageNum;
            pesquisarMorador();
        });
        container.appendChild(botao);                       // Coloca o botão no container.
    };

    criarBotao('<', paginaAtual - 1, false, paginaAtual === 1); // Botão "voltar": desativado se já está na primeira.

    for (let i = 1; i <= totalPaginas; i++) {               // Cria os botões numéricos.
        if (i === 1 || i === totalPaginas || (i >= paginaAtual - 2 && i <= paginaAtual + 2)) { // Mostra sempre 1, última e vizinhas.
            criarBotao(i, i, i === paginaAtual);            // Marca a atual como "ativo".
        } else if (i === paginaAtual - 3 || i === paginaAtual + 3) { // Onde não mostra, coloca reticências nos pontos de corte.
            container.insertAdjacentHTML('beforeend', '<span>...</span>');
        }
    }

    criarBotao('>', paginaAtual + 1, false, paginaAtual === totalPaginas); // Botão "avançar": desativado na última página.
}

function pesquisarMorador() {                               // Aplica o filtro de pesquisa e atualiza a tabela.
    const termo = document.getElementById('campoPesquisa').value; // Lê o texto do campo de pesquisa.
    const filtrados = bd.pesquisar(termo);                  // Pede para o "banco" filtrar.
    carregaListaMoradores(filtrados);                       // Mostra o resultado filtrado.
}

function exibirFeedback(sucesso = true, mensagem = "") {    // Mostra um modal de feedback (sucesso ou erro).
    const modal = document.getElementById("modalFeedback"); // Pega o modal.
    modal.querySelector("#feedbackIcon").textContent = sucesso ? "✔" : "✖"; // Ícone condizente.
    modal.querySelector("#feedbackIcon").className = sucesso ? "feedback-icon success" : "feedback-icon error"; // Classe para cor/estilo.
    modal.querySelector("#feedbackMessage").innerHTML = mensagem; // Texto da mensagem.
    modal.classList.add("active");                          // Exibe o modal.
    document.getElementById("closeFeedback").onclick = () => modal.classList.remove("active"); // Botão de fechar.
}

function editarMorador(id) {                                // Abre o modal de edição preenchido com os dados do morador.
    const morador = bd.buscarPorId(id);                     // Busca o morador no "banco".
    if (!morador) {                                         // Se não encontrou…
        exibirFeedback(false, "Morador não encontrado.");   // Mostra erro.
        return;                                             // Sai da função.
    }

    idEmEdicao = id;                                        // Guarda o ID do morador que será editado.
    clearErrors();                                          // Limpa erros antigos do modal.

    document.getElementById('editFirstName').value = morador.firstName; // Preenche os campos do modal com os dados atuais.
    document.getElementById('editLastName').value = morador.lastName;
    document.getElementById('editCpf').value = morador.cpf;
    document.getElementById('editDate').value = morador.date;
    document.getElementById('editEmail').value = morador.email;
    document.getElementById('editPhone').value = morador.phone;
    document.getElementById('editUnit').value = morador.unit;
    document.getElementById('editBond').value = morador.bond;
    document.getElementById('editVacancies').value = morador.vacancies;

    document.getElementById('modalEditarMorador').classList.add('active'); // Mostra o modal de edição.
}

function salvarEdicao() {                                   // Executa quando clica em "Salvar" no modal de edição.
    if (idEmEdicao === null) return;                        // Se não há ninguém em edição, não faz nada.

    clearErrors();                                          // Limpa erros visuais para começar do zero.

    const moradorAtualizado = new Morador(                  // Cria um novo objeto com os dados alterados do modal.
        document.getElementById('editFirstName').value.trim(),
        document.getElementById('editLastName').value.trim(),
        document.getElementById('editCpf').value.trim(),
        document.getElementById('editDate').value,
        document.getElementById('editEmail').value.trim(),
        document.getElementById('editPhone').value.trim(),
        document.getElementById('editUnit').value.trim(),
        document.getElementById('editBond').value,
        document.getElementById('editVacancies').value.trim()
    );

    const erros = moradorAtualizado.validarDados();         // Valida de novo (mesmas regras do cadastro).

    if (Object.keys(erros).length > 0) {                    // Se houver erro…
        for (const campo in erros) {                        // Mostra o erro no campo equivalente do modal (com prefixo 'edit').
            showError('edit' + campo.charAt(0).toUpperCase() + campo.slice(1), erros[campo]);
        }
        exibirFeedback(false, "Por favor, corrija os campos para salvar."); // Mensagem geral.
        return;                                             // Para aqui (não salva).
    }

    bd.atualizar(idEmEdicao, moradorAtualizado);            // Salva as mudanças no "banco" mantendo o mesmo ID.

    exibirFeedback(true, "Morador atualizado com sucesso!");// Mensagem de sucesso.
    document.getElementById('modalEditarMorador').classList.remove('active'); // Fecha o modal.
    pesquisarMorador();                                     // Recarrega a lista (respeitando pesquisa/paginação).
    idEmEdicao = null;                                      // Limpa o controle de edição.
}

function deletarMorador(id) {                               // Exclui um morador.
    if (confirm('Deseja excluir este morador?')) {          // Pede confirmação ao usuário.
        bd.remover(id);                                     // Remove do "banco".
        exibirFeedback(true, 'Morador excluído!');          // Mostra sucesso.
        pesquisarMorador();                                 // Atualiza a lista visível.
    }
}

// ========================================================= // Última seção: liga os botões, modais e pesquisa quando a página abre.
// INICIALIZAÇÃO E EVENT LISTENERS GLOBAIS
// =========================================================

function inicializarEventListeners() {                      // Função que registra todos os "ouvintes" de eventos.

    const btnMore = document.getElementById('openMore');    // Botão que abre/fecha menu "Mais" (mobile).
    const menuMore = document.getElementById('moreMenu');   // O próprio menu "Mais".
    if (btnMore && menuMore) {                              // Se ambos existem na página…
        btnMore.addEventListener('click', (e) => {          // Quando clicar no botão…
            e.stopPropagation();                            // Evita que o clique feche imediatamente por propagação.
            menuMore.classList.toggle('show');              // Alterna a classe "show" (mostra/oculta o menu).
        });
        document.addEventListener('click', () => menuMore.classList.remove('show')); // Clicar fora fecha o menu.
    }

    const modalOverlay = document.getElementById('modalOverlay'); // Fundo/overlay do modal de cadastro.
    const addBtn = document.querySelector('.add-btn');      // Botão que abre o modal de cadastro.
    const closeModalBtn = document.getElementById('closeModal'); // Botão de fechar o modal de cadastro.
    const nextStepBtn = document.getElementById('nextStep'); // Botão "Próximo passo" no formulário multi-etapas.
    const prevStepBtn = document.getElementById('prevStep'); // Botão "Voltar" no formulário multi-etapas.
    const cadastrarBtn = document.getElementById('btnCadastrar'); // Botão final para salvar o morador.

    function resetSteps() {                                 // Volta o formulário para o passo 1 e limpa erros.
        goToStep(1);
        clearErrors();
    }

    if (addBtn) addBtn.addEventListener('click', () => {    // Abrir o modal de cadastro.
        modalOverlay.classList.add('active');               // Mostra o overlay/modal.
        resetSteps();                                       // Garante que abre no passo 1 sem erros antigos.
    });
    if (nextStepBtn) nextStepBtn.addEventListener('click', () => goToStep(2)); // Vai para passo 2.
    if (prevStepBtn) prevStepBtn.addEventListener('click', () => goToStep(1)); // Volta para passo 1.
    if (cadastrarBtn) cadastrarBtn.addEventListener('click', cadastrarMorador); // Envia o cadastro.
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => { // Botão "X" fecha modal.
        modalOverlay.classList.remove('active');            // Esconde modal.
        resetSteps();                                       // Reseta passos/erros.
    });
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { // Clique no fundo fora do modal…
        if (e.target === modalOverlay) {                    // …se clicou exatamente no overlay (não dentro do modal)…
            modalOverlay.classList.remove('active');        // …fecha modal…
            resetSteps();                                   // …e reseta.
        }
    });

    const modalEditar = document.getElementById('modalEditarMorador'); // Modal de edição.
    const btnSalvarEdicao = document.getElementById('btnSalvarEditar'); // Botão "Salvar" do modal de edição.
    const btnFecharEditar = document.getElementById('btnFecharEditar'); // Botão "Cancelar" do modal de edição.
    const btnCloseEditModal = document.getElementById('closeEditModal'); // Botão "X" do modal de edição.

    if (btnSalvarEdicao) {                                   // Se o botão existe…
        btnSalvarEdicao.addEventListener('click', (e) => {  // Ao clicar em "Salvar"…
            e.preventDefault();                             // Evita recarregar a página (caso esteja em um <form>).
            salvarEdicao();                                 // Chama a função que valida e salva.
        });
    }
    if (btnFecharEditar) {                                   // Se existe botão "Cancelar"…
        btnFecharEditar.addEventListener('click', () => {   // Ao clicar…
            modalEditar.classList.remove('active');         // Fecha o modal.
            idEmEdicao = null;                              // Esquece quem estava em edição.
        });
    }
    if (btnCloseEditModal) {                                 // Se existe botão "X"…
        btnCloseEditModal.addEventListener('click', () => { // Ao clicar…
            modalEditar.classList.remove('active');         // Fecha o modal.
            idEmEdicao = null;                              // Limpa o estado.
        });
    }

    const campoPesquisa = document.getElementById('campoPesquisa'); // Input de pesquisa (texto).
    if (campoPesquisa) {
        campoPesquisa.addEventListener('keyup', () => {     // A cada tecla digitada…
            paginaAtual = 1;                                 // Volta para a primeira página (para o filtro fazer sentido).
            pesquisarMorador();                              // Refiltra e recarrega a lista.
        });
    }

    carregaListaMoradores();                                 // Ao carregar a página, desenha a lista inicial.
}

document.addEventListener('DOMContentLoaded', inicializarEventListeners); // Só registra tudo quando o HTML estiver pronto.
