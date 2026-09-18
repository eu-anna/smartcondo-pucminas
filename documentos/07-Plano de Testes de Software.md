# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/02-Especifica%C3%A7%C3%A3o%20do%20Projeto.md"> Especificação do Projeto</a></span>, <a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/04-Projeto%20de%20Interface.md"> Projeto de Interface</a>

### PLANO DE TESTES – MÓDULO DE LOGIN (SmartCondo)

1. Identificação

| Item            | Descrição                        |
| --------------- | -------------------------------- |
| **Sistema**     | SmartCondo                       |
| **Módulo**      | Login e autenticação de usuários |
| **Responsável** | Vinicius Oliveira                |
| **Versão**      | 1.0                              |
| **Data**        | 26/10/2025                       |

2. Objetivo

-   Validar se o processo de login do sistema SmartCondo funciona corretamente para todos os tipos de usuários (síndico e morador), assegurando:
-   A autenticação de credenciais válidas.
-   O tratamento de erros (credenciais inválidas, campos vazios).
-   A segurança mínima do processo (não expor senhas).
-   O redirecionamento correto de acordo com o tipo de usuário.
-   O funcionamento do recurso “Lembrar de mim”.

-   Os requisitos para realização dos testes de software são:

*   Site publicado na internet;

    3.Ambiente de Testes

-   Ambiente Localhost (Live Server) ou ambiente de homologação
-   Navegador Chrome (versão 140+), Firefox, Edge
-   Banco de Dados localStorage com dados simulados (db.json)
-   Arquivos login.html, auth/login.js, index.js

    4.Casos de teste
    <table>
     <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
     </tr>

 <!-- CT-01 -->
 <tr>
  <td>Credenciais de acesso válidas</td>
  <td>
   <ul>
    <li><strong>Credenciais de Acesso:</strong><br>
     <strong>Síndico:</strong> email: lidianer@gmail.com<br>
     senha: 12345
    </li>
	<li>RNF-02
	</li>
   </ul>
  </td>
  <td>Verificar credenciais de login válidas para o síndico (adm) da aplicação.</td>
  <td>
   <ol>
    <li>Abrir página de login.</li>
    <li>Digitar email e senha válidos.</li>
    <li>Clicar em “Entrar”.</li>
   </ol>
  </td>
  <td>Redireciona para <strong>dashboard-sindico.html</strong> e salva <strong>loggedInUser</strong> no sessionStorage.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-02 -->
 <tr>
  <td>CT-02 — Validação de credenciais incorretas.</td>
  <td>RNF-02</td>
  <td>Garantir que o sistema bloqueie acesso quando as credenciais forem inválidas.</td>
  <td>
   <ol>
    <li>Abrir página de login.</li>
    <li>Inserir email inexistente ou senha incorreta.</li>
    <li>Clicar em “Entrar”.</li>
   </ol>
  </td>
  <td>Exibe mensagem de erro “Usuário ou senha inválidos” e não redireciona para nenhuma página.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-03 -->
 <tr>
  <td>CT-03 — Campo de email obrigatório.</td>
  <td>
  <ul>
  <li>RNF‑01 - O sistema deve ser intuitivo e fácil de navegar para moradores, síndico e funcionários, sem necessidade de treinamento avançado.</li>
<li>RNF‑02 - O sistema deve garantir autenticação de usuários por login e senha, protegendo dados pessoais e financeiros.</li>
  </ul>
  </td>
  <td>Verificar se o campo de email é obrigatório para o envio do formulário.</td>
  <td>
   <ol>
    <li>Abrir página de login.</li>
    <li>Deixar o campo email em branco.</li>
    <li>Preencher apenas o campo senha.</li>
    <li>Clicar em “Entrar”.</li>
   </ol>
  </td>
  <td>Exibe alerta ou mensagem de erro “Preencha o campo de email” e impede o login.</td>
  <td>Vinicius</</td>
 </tr>

 <!-- CT-04 -->
 <tr>
  <td>CT-04 — Campo de senha obrigatório.</td>
  <td>
  <ul>
  <li>RNF-01 - O sistema deve ser intuitivo e fácil de navegar para moradores, síndico e funcionários, sem necessidade de treinamento avançado.</li>
  <li>RNF-02 - O sistema deve garantir autenticação de usuários por login e senha, protegendo dados pessoais e financeiros.</li>
  </ul>
  </td>
  <td>Verificar se o campo de senha é obrigatório para o envio do formulário.</td>
  <td>
   <ol>
    <li>Abrir página de login.</li>
    <li>Preencher apenas o email.</li>
    <li>Deixar o campo senha em branco.</li>
    <li>Clicar em “Entrar”.</li>
   </ol>
  </td>
  <td>Exibe alerta ou mensagem de erro “Preencha o campo de senha” e impede o login.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-05 -->
<tr>
  	<td>CT-05 — Opção “Lembrar email”.</td>
  	<td>RNF-02</td>
  	<td>Verificar se, ao marcar “Lembrar email”, o campo de email permanece preenchido em visitas futuras.</td>
  	<td>
   		<ol>
    		<li>Marcar a opção “Lembrar email”.</li>
    		<li>Efetuar login e sair da aplicação.</li>
    		<li>Reabrir a página de login.</li>
   		</ol>
  	</td>
  	<td>Campo de email é automaticamente preenchido com o último email utilizado.</td>
  	<td>Vinicius</td>
</tr>

 <!-- CT-06 -->
<tr>
  <td>CT-06 — Redirecionamento por tipo de usuário.</td>
  	<td>
		<ul>
			<li>RF-15 - O sistema deve exibir na tela principal do perfil do síndico os comunicados ou solicitações enviadas por moradores e funcionários. </li>
			<li>RF‑16 - O sistema deve permitir que o síndico visualize o cadastro de todos os funcionários e moradores.</li>
			<li>RNF-02 - O sistema deve garantir autenticação de usuários por login e senha, protegendo dados pessoais e financeiros.</li>
		</ul>
  	</td>
  	<td>Verificar se o login redireciona corretamente conforme o papel do usuário (síndico, morador ou funcionário).</td>
  	<td>
   		<ol>
    		<li>Abrir página de login.</li>
    		<li>Digitar email e senha de diferentes tipos de usuário.</li>
    		<li>Clicar em “Entrar”.</li>
   		</ol>
  	</td>
  	<td>
   		<ul>
    		<li><strong>Síndico:</strong> redireciona para dashboard-sindico.html</li>
    		<li><strong>Morador:</strong> redireciona para home-resident.html</li>
    		<li><strong>Funcionário:</strong> redireciona para home-employee.html</li>
   		</ul>
  	</td>
  	<td>Vinicius</td>
 </tr>
</table>

## Perfil de usuário SÍNDICO

### PLANO DE TESTES – MÓDULO VISÃO GERAL DO SÍNDICO (SmartCondo)

| Item            | Descrição                       |
| --------------- | ------------------------------- |
| **Sistema**     | SmartCondo                      |
| **Módulo**      | Visão Geral — Painel do Síndico |
| **Responsável** | Vítor Machado                   |
| **Versão**      | 1.0                             |
| **Data**        | 26/10/2025                      |

2. Objetivo

-   Validar o funcionamento da página de Visão Geral do Síndico, garantindo que o dashboard exiba corretamente:

-   Quantidade de moradores cadastrados

-   Quantidade de funcionários cadastrados

-   Solicitações/ocorrências abertas

-   Reservas pendentes

-   Lista de comunicados recentes

-   Lista de reservas recentes

-   Identificação do usuário logado

-   Funcionamento do menu flutuante

-   Persistência dos dados exibidos

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou homologação

-   Navegadores: Chrome 140+, Firefox, Edge

-   Banco de Dados: localStorage e sessionStorage

-   Arquivos: dashboard.html, index.js, auth/logout.js

-   Usuário: Síndico autenticado via sessionStorage

4. Casos de Teste

<table>
 <tr>
  <th>Identificação</th>
  <th>Objetivo</th>
  <th>Ambiente de Teste</th>
  <th>Passos</th>
  <th>Critérios de Êxito</th>
  <th>Responsável</th>
 </tr>

 <!-- CT-01 -->
 <tr>
  <td><strong>CT-01 — Exibir nome e cargo do usuário logado</strong></td>
  <td>Verificar se o nome “Lidianer, Síndico” (usuário padrão de teste do sistema) está sendo exibido corretamente.</td>
  <td>Web / Síndico logado / SessionStorage ativo</td>
  <td>
   <ol>
    <li>Efetuar login como síndico.</li>
    <li>Acessar a página “Visão Geral”.</li>
   </ol>
  </td>
  <td>O elemento #usuarioLogado deve exibir: <em>“Vitor, Síndico”</em>.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-02 -->
 <tr>
  <td><strong>CT-02 — Exibir quantidade total de moradores</strong></td>
  <td>Validar se o card exibe corretamente o número de moradores armazenados.</td>
  <td>Web / LocalStorage com chave "smartcondo_moradores"</td>
  <td>
   <ol>
    <li>Popular o localStorage com moradores.</li>
    <li>Acessar a página do dashboard.</li>
   </ol>
  </td>
  <td>O card “Moradores” exibe exatamente o total salvo em storage.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-03 -->
 <tr>
  <td><strong>CT-03 — Exibir quantidade de funcionários</strong></td>
  <td>Validar se o card exibe corretamente os funcionários cadastrados.</td>
  <td>Web / LocalStorage chave “employees” ou “smartcondo_employees”</td>
  <td>
   <ol>
    <li>Adicionar funcionários ao storage.</li>
    <li>Acessar a página.</li>
   </ol>
  </td>
  <td>O card “Funcionários” exibe a quantidade correta.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-04 -->
 <tr>
  <td><strong>CT-04 — Exibir solicitações abertas</strong></td>
  <td>Validar se o card conta apenas ocorrências com status “Aberta”.</td>
  <td>Web / LocalStorage com chave “smartcondo_ocorrencias”</td>
  <td>
   <ol>
    <li>Inserir ocorrências com status variados.</li>
    <li>Carregar a página.</li>
   </ol>
  </td>
  <td>O card deve exibir somente o total de ocorrências com status “Aberta”.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-05 -->
 <tr>
  <td><strong>CT-05 — Exibir reservas pendentes</strong></td>
  <td>Garantir que apenas reservas com status “pending” sejam contabilizadas.</td>
  <td>Web / LocalStorage com chaves de reservas</td>
  <td>
   <ol>
    <li>Adicionar reservas aprovadas, recusadas e pendentes.</li>
    <li>Acessar a Visão Geral.</li>
   </ol>
  </td>
  <td>O card “Reservas” mostra apenas as pendentes.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-06 -->
 <tr>
  <td><strong>CT-06 — Exibir últimos comunicados</strong></td>
  <td>Verificar se até 4 ocorrências recentes são mostradas.</td>
  <td>Web / LocalStorage chave “smartcondo_ocorrencias”</td>
  <td>
   <ol>
    <li>Adicionar mais de 4 ocorrências.</li>
    <li>Acessar o dashboard.</li>
   </ol>
  </td>
  <td>A lista “Comunicados Recentes” deve exibir apenas os 4 mais recentes, com título, descrição, categoria e status.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-07 -->
 <tr>
  <td><strong>CT-07 — Exibir últimas reservas</strong></td>
  <td>Validar listagem das últimas 4 reservas.</td>
  <td>Web / LocalStorage com reservas estáticas e dinâmicas</td>
  <td>
   <ol>
    <li>Adicionar mais de 4 reservas.</li>
    <li>Acessar o dashboard.</li>
   </ol>
  </td>
  <td>A lista “Reservas Recentes” mostra até 4 itens com nome, espaço e status.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-08 -->
 <tr>
  <td><strong>CT-08 — Unificação de reservas de múltiplas chaves</strong></td>
  <td>Verificar se “reservations” e “smartcondo_reservations” são mescladas.</td>
  <td>Web / LocalStorage com ambas as chaves populadas</td>
  <td>
   <ol>
    <li>Preencher as duas chaves de reservas.</li>
    <li>Acessar o dashboard.</li>
   </ol>
  </td>
  <td>Nenhuma reserva duplicada deve aparecer; entradas são combinadas.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-09 -->
 <tr>
  <td><strong>CT-09 — Funcionamento do menu flutuante</strong></td>
  <td>Validar abertura/fechamento do menu.</td>
  <td>Web / CSS / Eventos JS ativos</td>
  <td>
   <ol>
    <li>Clicar no botão “Mais”.</li>
    <li>Clicar fora do menu.</li>
   </ol>
  </td>
  <td>O menu abre ao clicar no botão e fecha ao clicar fora dele.</td>
  <td>Vitor</td>
 </tr>

 <!-- CT-10 -->
 <tr>
  <td><strong>CT-10 — Logout do sistema</strong></td>
  <td>Validar se o botão de logout executa o método logout().</td>
  <td>Web / SessionStorage ativo</td>
  <td>
   <ol>
    <li>Clicar no botão de logout.</li>
   </ol>
  </td>
  <td>O usuário é redirecionado para a página de login e sessionStorage é limpo.</td>
  <td>Vitor</td>
 </tr>

</table>

### PLANO DE TESTES – MÓDULO DE MORADORES (Sindico) SmartCondo

Versão: 1.0
Escopo: Cadastro, edição, listagem, pesquisa, validação, paginação e remoção de moradores.
Responsável: QA – Projeto SmartCondo
Usuário principal: Síndico Lidiane

1. OBJETIVO DO TESTE

Garantir que todo o fluxo de gerenciamento de moradores (CRUD completo, validações, navegação por passos, pesquisa, paginação e interação com LocalStorage) funcione corretamente para todos os cenários previstos pelo sistema.

O teste deve assegurar:

Integridade dos dados cadastrados

Comportamento correto da interface

Validação consistente dos campos

Operações completas no localStorage

Comportamento esperado de feedbacks e modais

Garantia de que nenhuma cópia duplicada é gerada

Navegação correta entre etapas e telas

### PLANO DE TESTES – MÓDULO DE COMUNICADOS (Síndico) – SmartCondo

| Item            | Descrição                    |
| --------------- | ---------------------------- |
| **Sistema**     | SmartCondo                   |
| **Módulo**      | Comunicados – Perfil Síndico |
| **Responsável** | Vinicius Oliveira            |
| **Versão**      | 1.0                          |
| **Data**        | 16/11/2025                   |

2. Objetivo

-   Listar notificações enviadas pelo síndico.

-   Listar notificações recebidas de moradores e funcionários.

-   Enviar comunicado para todos os moradores.

-   Enviar comunicado para um morador específico.

-   Enviar comunicado para um funcionário.

-   Editar notificações enviadas.

-   Excluir notificações enviadas.

-   Marcar mensagens como lidas.

-   Exibir categorias e destinatários corretamente.

-   Persistir dados no LocalStorage.

-   Validar campos obrigatórios.

-   Garantir visualização conforme permissões de destino.

-   Requisitos para execução dos testes:

-   Site publicado ou executado em ambiente local (Live Server).

-   Usuários cadastrados no localStorage (smartcondo_users, smartcondo_employees, smartcondo_moradores).

-   Notificações salvas em smartcondo_notifications.

-   Usuário síndico logado (sessionStorage.smartcondo_loggedInUser).

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou ambiente de homologação

-   Navegador: Chrome (versão 140+), Firefox, Edge

-   Banco de Dados: localStorage com dados simulados

-   Arquivos: index.html, comunicados/\*.js, components/loader, repository, modal

4. Casos de Teste
 <table>
  <tr>
    <th>Identificação</th>
    <th>Objetivo</th>
    <th>Ambiente de Teste</th>
    <th>Passos</th>
    <th>Critérios de Êxito</th>
    <th>Responsável</th>
  </tr>

  <!-- CT-01 -->
  <tr>
    <td><strong>CT-01 — Visibilidade dos Comunicados</strong><br>RF-30</td>
    <td>Validar se cada usuário visualiza apenas os comunicados permitidos para sua permissão.</td>
    <td>Ambiente Web — Chrome 141+ / LocalStorage / Usuário autenticado (todos os perfis).</td>
    <td>
      <ol>
        <li>Logar como síndico, morador e funcionário.</li>
        <li>Acessar a página comunicados.</li>
        <li>Confirmar que o sistema exibe apenas as mensagens destinadas ao perfil logado.</li>
      </ol>
    </td>
    <td>Cada perfil acessa exclusivamente os comunicados permitidos pelas regras de negócio.</td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-02 -->
  <tr>
    <td><strong>CT-02 — Envio de Mensagem pelo Síndico</strong><br>RF-31</td>
    <td>Validar se o síndico consegue enviar comunicados para todos ou para um usuário específico.</td>
    <td>Web / LocalStorage / Síndico logado.</td>
    <td>
      <ol>
        <li>Acessar “Novo comunicado”.</li>
        <li>Selecionar “Enviar para: Todos”.</li>
        <li>Enviar mensagem.</li>
        <li>Repetir enviando para um usuário específico.</li>
      </ol>
    </td>
    <td>As mensagens são salvas com destino correto: <code>targetIdOrAll: "all"</code> ou <code>idDoDestinatário</code>.</td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-03 -->
  <tr>
    <td><strong>CT-03 — Envio de Mensagem por Morador e Funcionário</strong><br>RF-32</td>
    <td>Garantir que moradores e funcionários só consigam enviar mensagens para o síndico.</td>
    <td>Web / LocalStorage / Morador e Funcionário logados.</td>
    <td>
      <ol>
        <li>Logar como morador ou funcionário.</li>
        <li>Tentar acessar campo de seleção de destinatário.</li>
        <li>Enviar comunicado.</li>
      </ol>
    </td>
    <td>
      O sistema deve enviar automaticamente para o síndico usando <code>targetIdOrAll: "syndic"</code>.
    </td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-04 -->
  <tr>
    <td><strong>CT-04 — Persistência dos Comunicados</strong><br>RNF-03</td>
    <td>Verificar que as mensagens enviadas são mantidas após recarregar a página.</td>
    <td>Web / LocalStorage / Qualquer usuário autenticado.</td>
    <td>
      <ol>
        <li>Enviar um comunicado.</li>
        <li>Recarregar a página (F5).</li>
      </ol>
    </td>
    <td>
      A mensagem continua visível e carregada a partir do LocalStorage.
    </td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-05 -->
  <tr>
    <td><strong>CT-05 — Identificação do Tipo de Destinatário</strong><br>RF-33</td>
    <td>Garantir que o sistema identifique corretamente se o destinatário é síndico, morador ou funcionário.</td>
    <td>Web / LocalStorage / Síndico logado.</td>
    <td>
      <ol>
        <li>Acessar lista de usuários no seletor do modal de novo comunicado.</li>
        <li>Confirmar que moradores e funcionários estão separados e exibidos corretamente.</li>
      </ol>
    </td>
    <td>
      O seletor deve exibir usuários formatados (nome capitalizado) e corretamente agrupados.
    </td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-06 -->
  <tr>
    <td><strong>CT-06 — Feedback Visual</strong><br>RNF-01</td>
    <td>Garantir que loaders, alertas e estados de processamento apareçam durante envios.</td>
    <td>Web / LocalStorage / Todos os usuários.</td>
    <td>
      <ol>
        <li>Enviar comunicado.</li>
        <li>Observar loader, mensagens de sucesso e erro.</li>
      </ol>
    </td>
    <td>Exibe loader durante o envio e mensagem ao concluir.</td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-07 -->
  <tr>
    <td><strong>CT-07 — Restrições de Visualização do Funcionário</strong><br>RF-34</td>
    <td>Garantir que funcionários NÃO visualizem mensagens destinadas a moradores.</td>
    <td>Web / LocalStorage / Funcionário logado.</td>
    <td>
      <ol>
        <li>Enviar uma mensagem para "todos moradores".</li>
        <li>Logar como funcionário.</li>
        <li>Acessar lista de comunicados.</li>
      </ol>
    </td>
    <td>
      O funcionário não deve visualizar mensagens cujo <code>targetIdOrAll = "all"</code>.
    </td>
    <td>Vinicius</td>
  </tr>

  <!-- CT-08 -->
  <tr>
    <td><strong>CT-08 — Encapsulamento de Mensagens por ID</strong><br>RF-35</td>
    <td>Garantir que mensagens direcionadas a usuários específicos só apareçam para o destinatário certo.</td>
    <td>Web / LocalStorage / Morador logado.</td>
    <td>
      <ol>
        <li>Enviar comunicado para um morador específico.</li>
        <li>Logar como outro morador.</li>
        <li>Acessar a lista de comunicados.</li>
      </ol>
    </td>
    <td>Somente o usuário com ID correspondente visualiza a mensagem.</td>
    <td>Vinicius</td>
  </tr>
</table>

### PLANO DE TESTES – MÓDULO DE OCORRÊNCIA (Síndico) – SmartCondo

1. Identificação

| Item            | Descrição                   |
| --------------- | --------------------------- |
| **Sistema**     | SmartCondo                  |
| **Módulo**      | Ocorrência – Perfil Síndico |
| **Responsável** | Vítor Machado               |
| **Versão**      | 1.0                         |
| **Data**        | 21/11/2025                  |

2. Objetivo

-   Validar o funcionamento completo do módulo de Ocorrências do Síndico, garantindo que:

-   As ocorrências sejam listadas corretamente

-   A busca filtre por ID, título, categoria e status

-   O modal exiba dados corretos

-   O status e a prioridade possam ser atualizados

-   O botão Abrir O.S. siga as regras do sistema

-   A tabela e os cards resumo reflitam os dados do localStorage

-   As informações persistam após recarregar a página

-   O fluxo de regras e validações seja corretamente aplicado

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou homologação

-   Navegadores: Chrome 140+, Firefox, Edge

-   Banco de Dados: localStorage (smartcondo_ocorrencias)

-   Arquivos: dashboard-sindico-occurrence.html, dashboard-sindico-occurrence.js

Usuário: Síndico autenticado via sessionStorage

4. Casos de Teste
 <table>
   <tr>
     <th>Identificação</th>
     <th>Objetivo</th>
     <th>Ambiente de Teste</th>
     <th>Passos</th>
     <th>Critérios de Êxito</th>
     <th>Responsável</th>
   </tr>

  <!-- CT-O-01 -->

  <tr>
    <td><strong>CT-OC-01 — Listagem de Ocorrências</strong><br>RF-03</td>
    <td>Validar se a tabela exibe todas as ocorrências cadastradas para acompanhamento pelo síndico.</td>
    <td>Web / LocalStorage com <code>smartcondo_ocorrencias</code> populado / Síndico logado.</td>
    <td>
      <ol>
        <li>Popular a chave <code>smartcondo_ocorrencias</code> com diversas ocorrências de teste.</li>
        <li>Acessar a página “Ocorrências” do síndico.</li>
      </ol>
    </td>
    <td>A tabela <code>.table-ocorrencias</code> exibe todas as ocorrências com ID, Título, Categoria, Status, Prioridade e botão “Ver”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-02 -->

  <tr>
    <td><strong>CT-OC-02 — Ordem de Exibição (mais recentes primeiro)</strong><br>RF-03</td>
    <td>Garantir que as ocorrências mais recentes apareçam primeiro na lista para facilitar o acompanhamento.</td>
    <td>Web / LocalStorage com ocorrências em diferentes ordens de inclusão.</td>
    <td>
      <ol>
        <li>Adicionar ocorrências no <code>smartcondo_ocorrencias</code> em ordem conhecida (ex.: ID 1, 2, 3, 4).</li>
        <li>Acessar a página “Ocorrências”.</li>
      </ol>
    </td>
    <td>As ocorrências são exibidas em ordem reversa à gravação (a última inserida aparece na primeira linha da tabela).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-03 -->

  <tr>
    <td><strong>CT-OC-03 — Ausência de Ocorrências</strong><br>RF-03</td>
    <td>Validar a mensagem apresentada quando não há nenhuma ocorrência registrada.</td>
    <td>Web / LocalStorage sem a chave <code>smartcondo_ocorrencias</code> ou com array vazio.</td>
    <td>
      <ol>
        <li>Limpar ou remover a chave <code>smartcondo_ocorrencias</code> no LocalStorage.</li>
        <li>Acessar a página “Ocorrências”.</li>
      </ol>
    </td>
    <td>A tabela exibe uma linha com a mensagem “Nenhuma ocorrência registrada.”, sem erros de JavaScript.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-04 -->

  <tr>
    <td><strong>CT-OC-04 — Filtro por ID, Título, Categoria e Status</strong><br>RF-03</td>
    <td>Validar se o campo de pesquisa permite filtrar ocorrências por ID, título, categoria ou status.</td>
    <td>Web / LocalStorage populado / Campo <code>#campoPesquisa</code> ativo.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com ocorrências que possuam IDs, títulos, categorias e status distintos.</li>
        <li>Digitar no campo de pesquisa um trecho do ID, título, categoria e status (ex.: “01”, “Vazamento”, “Barulho”, “Aberta”).</li>
        <li>Observar os resultados exibidos a cada entrada.</li>
      </ol>
    </td>
    <td>A tabela exibe apenas as ocorrências que contenham o termo buscado em ID (2 dígitos), título, categoria ou status normalizado.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-05 -->

  <tr>
    <td><strong>CT-OC-05 — Pesquisa Sem Resultados</strong><br>RF-03</td>
    <td>Verificar se o sistema informa adequadamente quando nenhuma ocorrência corresponde ao filtro aplicado.</td>
    <td>Web / LocalStorage populado / Campo de pesquisa ativo.</td>
    <td>
      <ol>
        <li>Com a lista de ocorrências carregada, digitar no campo de pesquisa um termo que não exista (ex.: “XYZ123”).</li>
      </ol>
    </td>
    <td>A tabela exibe a mensagem “Nenhuma ocorrência encontrada para a pesquisa.”, sem listar registros.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-06 -->

  <tr>
    <td><strong>CT-OC-06 — Cards de Resumo por Status</strong><br>RF-03</td>
    <td>Garantir que os cards de resumo exibam a quantidade correta de ocorrências por status.</td>
    <td>Web / LocalStorage com diversas ocorrências em diferentes status.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com um número conhecido de ocorrências em “Aberta”, “Em andamento”, “Em execução” e “Concluída”.</li>
        <li>Acessar a página “Ocorrências”.</li>
      </ol>
    </td>
    <td>Os elementos <code>#count-abertas</code>, <code>#count-andamento</code>, <code>#count-execucao</code> e <code>#count-concluidas</code> exibem os valores exatos contabilizados a partir do LocalStorage.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-07 -->

  <tr>
    <td><strong>CT-OC-07 — Abertura do Modal de Detalhes</strong><br>RF-03</td>
    <td>Validar se o modal apresenta os dados completos da ocorrência selecionada pelo botão “Ver”.</td>
    <td>Web / LocalStorage com <code>smartcondo_ocorrencias</code> populado / Botões <code>.btn-ver</code> ativos.</td>
    <td>
      <ol>
        <li>Acessar a página “Ocorrências”.</li>
        <li>Clicar no botão “Ver” de uma ocorrência.</li>
      </ol>
    </td>
    <td>O modal exibe corretamente título, protocolo, nome do solicitante, unidade, data de abertura, status atual, prioridade e descrição da ocorrência.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-08 -->

  <tr>
    <td><strong>CT-OC-08 — Regra de Visibilidade do Botão “Abrir O.S.”</strong><br>RF-03</td>
    <td>Garantir que o botão “Abrir O.S.” só fique visível e habilitado quando a ocorrência estiver com status “Aberta”.</td>
    <td>Web / Modal aberto com ocorrências em diferentes status.</td>
    <td>
      <ol>
        <li>Abrir o modal de uma ocorrência em status “Aberta”.</li>
        <li>Abrir o modal de uma ocorrência em status “Em andamento”, “Em execução” ou “Concluída”.</li>
      </ol>
    </td>
    <td>Para status “Aberta”, o botão “Abrir O.S.” é exibido e habilitado; para outros status, o botão aparece desabilitado e oculto conforme a lógica de interface aplicada.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-09 -->

  <tr>
    <td><strong>CT-OC-09 — Atualização Dinâmica do Botão “Abrir O.S.”</strong></td>
    <td>Validar se o botão “Abrir O.S.” é atualizado em tempo real ao alterar o status no select do modal.</td>
    <td>Web / Modal de ocorrência aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de uma ocorrência inicialmente em “Aberta”.</li>
        <li>Alterar o campo “Status Atual” para “Em andamento” ou “Concluído”.</li>
        <li>Retornar o campo “Status Atual” para “Aberta”.</li>
      </ol>
    </td>
    <td>O botão “Abrir O.S.” é ocultado/desabilitado quando o status deixa de ser “Aberta” e volta a ser exibido/habilitado quando o status retorna para “Aberta”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-10 -->

  <tr>
    <td><strong>CT-OC-10 — Salvamento de Status e Prioridade</strong><br>RF-03 </td>
    <td>Validar se as alterações de status e prioridade realizadas no modal são persistidas no LocalStorage.</td>
    <td>Web / LocalStorage populado / Modal aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de uma ocorrência existente.</li>
        <li>Alterar o status no campo “Status Atual”.</li>
        <li>Selecionar uma prioridade válida.</li>
        <li>Clicar no botão “Salvar”.</li>
      </ol>
    </td>
    <td>Os campos <code>status</code> e <code>prioridade</code> da ocorrência correspondente são atualizados em <code>smartcondo_ocorrencias</code>, a tabela de ocorrências e os cards de resumo são recarregados e é exibida mensagem de sucesso.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-11 -->

  <tr>
    <td><strong>CT-OC-11 — Prioridade Obrigatória ao Salvar</strong></td>
    <td>Verificar se o sistema impede o salvamento de alterações sem seleção de prioridade.</td>
    <td>Web / Modal aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de uma ocorrência.</li>
        <li>Não selecionar nenhuma prioridade (deixar “Selecione...” ativo).</li>
        <li>Clicar no botão “Salvar”.</li>
      </ol>
    </td>
    <td>É exibido um alerta solicitando a seleção da prioridade e nenhuma alteração é gravada no LocalStorage.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-12 -->

  <tr>
    <td><strong>CT-OC-12 — Regras para Abrir O.S. a partir da Ocorrência</strong><br>RF-03, RF-10, RF-14</td>
    <td>Garantir que a abertura de O.S. siga as regras: ocorrência em status “Aberta” e prioridade definida.</td>
    <td>Web / LocalStorage populado / Modal aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de uma ocorrência em “Aberta”.</li>
        <li>Clicar em “Abrir O.S.” sem selecionar prioridade.</li>
        <li>Selecionar prioridade e alterar o status para “Em andamento”.</li>
        <li>Clicar novamente em “Abrir O.S.”.</li>
        <li>Retornar o status para “Aberta”, manter prioridade selecionada e clicar em “Abrir O.S.”.</li>
      </ol>
    </td>
    <td>Apenas quando o status está em “Aberta” e a prioridade está definida o sistema permite a abertura da O.S., gravando <code>ocorrenciaSelecionada</code> e <code>abrirModalOS</code> no LocalStorage e redirecionando para a tela de Ordem de Serviço.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OC-13 -->

  <tr>
    <td><strong>CT-OC-13 — Persistência dos Dados após Recarregar</strong><br>RF-03</td>
    <td>Verificar se os dados apresentados na tela de Ocorrências permanecem consistentes após recarregar a página.</td>
    <td>Web / LocalStorage populado.</td>
    <td>
      <ol>
        <li>Acessar a página “Ocorrências” e anotar as quantidades dos cards e alguns registros da tabela.</li>
        <li>Recarregar a página (F5).</li>
      </ol>
    </td>
    <td>Após o recarregamento, os cards e a tabela exibem os mesmos valores, de acordo com o conteúdo de <code>smartcondo_ocorrencias</code>.</td>
    <td>Vitor</td>
  </tr>
</table>

### PLANO DE TESTES – MÓDULO ORDEM DE SERVIÇOS (Síndico) – SmartCondo

| Item            | Descrição                          |
| --------------- | ---------------------------------- |
| **Sistema**     | SmartCondo                         |
| **Módulo**      | Ordem de Serviços – Perfil Síndico |
| **Responsável** | Vitor Machado                      |
| **Versão**      | 1.0                                |
| **Data**        | 21/11/2025                         |

---

2. Objetivo

-   Listar ordens de serviço cadastradas para acompanhamento pelo síndico.

-   Permitir pesquisar ordens de serviço por número, título, categoria, responsável e status.

-   Exibir corretamente o status das ordens de serviço com texto e classes visuais padronizadas.

-   Exibir paginação das ordens de serviço, com informação da página atual e total.

-   Permitir que o síndico visualize os detalhes completos de uma ordem de serviço em modal.

-   Permitir que o síndico crie novas ordens de serviço, vinculadas ou não a uma ocorrência.

-   Garantir validação de campos obrigatórios e da data sugerida (não permitir datas passadas).

-   Permitir edição de dados de uma ordem de serviço em andamento.

-   Impedir edição de ordens de serviço concluídas.

-   Permitir concluir uma ordem de serviço, atualizando seu status e sincronizando a ocorrência vinculada.

-   Carregar corretamente a lista de responsáveis (funcionários) a partir do `localStorage`.

-   Garantir que os dados exibidos estejam consistentes com o conteúdo salvo em `smartcondo_ordensServico`.

-   Requisitos para execução dos testes:

-   Site publicado ou executado em ambiente local (Live Server).

-   Ordens de serviço salvas em `smartcondo_ordensServico`.

-   Ocorrências salvas em `smartcondo_ocorrencias` (para vínculos).

-   Funcionários salvos em `smartcondo_employees`.

-   Usuário síndico logado (`sessionStorage.smartcondo_loggedInUser`).

---

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou ambiente de homologação

-   Navegador: Chrome (versão 140+), Firefox, Edge

-   Banco de Dados: `localStorage` e `sessionStorage` com dados simulados

-   Arquivos: `dashboard-syndic-os.js`, `dashboard-sindico-ordem-servico.html`.

---

4. Casos de Teste

<table>
  <tr>
    <th>Identificação</th>
    <th>Objetivo</th>
    <th>Ambiente de Teste</th>
    <th>Passos</th>
    <th>Critérios de Êxito</th>
    <th>Responsável</th>
  </tr>

  <!-- CT-OS-01 -->

  <tr>
    <td><strong>CT-OS-01 — Listagem de Ordens de Serviço</strong><br>RF-03</td>
    <td>Validar se a tabela exibe todas as ordens de serviço cadastradas para acompanhamento pelo síndico.</td>
    <td>Web / LocalStorage com <code>smartcondo_ordensServico</code> populado / Síndico logado.</td>
    <td>
      <ol>
        <li>Popular a chave <code>smartcondo_ordensServico</code> com diversas O.S. de teste.</li>
        <li>Acessar a página “Ordem de serviços” no perfil do síndico.</li>
      </ol>
    </td>
    <td>A tabela exibe todas as ordens de serviço com Número, Título, Categoria, Responsável, Status, Prioridade e botão “Ver”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-02 -->

  <tr>
    <td><strong>CT-OS-02 — Ordem de Exibição com Paginação</strong><br>RF-03</td>
    <td>Garantir que as O.S. sejam exibidas com paginação e que a troca de página funcione corretamente.</td>
    <td>Web / LocalStorage com mais O.S. do que o limite por página.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ordensServico</code> com uma quantidade de ordens superior a 10.</li>
        <li>Acessar a página “Ordem de serviços”.</li>
        <li>Observar a exibição da informação “Página X de Y”.</li>
        <li>Clicar nos botões “Anterior” e “Próximo”.</li>
      </ol>
    </td>
    <td>As O.S. são exibidas paginadas; os botões de navegação funcionam e a informação de página é atualizada corretamente.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-03 -->

  <tr>
    <td><strong>CT-OS-03 — Paginação Responsiva (Desktop x Mobile)</strong><br></td>
    <td>Validar a alteração da quantidade de registros por página conforme a largura da tela.</td>
    <td>Web / Navegador com redimensionamento de janela.</td>
    <td>
      <ol>
        <li>Acessar a página “Ordem de serviços” com a janela em modo desktop (&gt; 768px).</li>
        <li>Verificar a quantidade de registros exibidos por página.</li>
        <li>Reduzir a largura da janela para um valor ≤ 768px.</li>
        <li>Observar a quantidade atualizada de registros por página.</li>
      </ol>
    </td>
    <td>Com tela grande, são exibidas até 10 O.S. por página; com tela pequena, a quantidade exibida é reduzida conforme configuração de paginação.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-04 -->

  <tr>
    <td><strong>CT-OS-04 — Ausência de Ordens de Serviço</strong</td>
    <td>Validar a mensagem apresentada quando não há O.S. cadastradas.</td>
    <td>Web / LocalStorage sem a chave <code>smartcondo_ordensServico</code> ou com array vazio.</td>
    <td>
      <ol>
        <li>Limpar ou remover a chave <code>smartcondo_ordensServico</code> no LocalStorage.</li>
        <li>Acessar a página “Ordem de serviços”.</li>
      </ol>
    </td>
    <td>A tabela exibe a mensagem “Nenhuma ordem registrada.”, sem erros de JavaScript.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-05 -->

  <tr>
    <td><strong>CT-OS-05 — Filtro de O.S. por Número, Título, Categoria, Responsável e Status</strong></td>
    <td>Validar se o campo de pesquisa filtra corretamente as O.S. com base em diferentes campos.</td>
    <td>Web / LocalStorage com O.S. variadas / Campo <code>#campoPesquisa</code> ativo.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ordensServico</code> com O.S. que tenham números, títulos, categorias, responsáveis e status distintos.</li>
        <li>Digitar no campo de pesquisa termos que correspondam ao número, ao título, à categoria, ao responsável e ao status.</li>
        <li>Observar a atualização da tabela a cada novo termo.</li>
      </ol>
    </td>
    <td>A tabela exibe somente as O.S. que contêm o termo pesquisado em qualquer um dos campos (Número, Título, Categoria, Responsável ou Status).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-06 -->

  <tr>
    <td><strong>CT-OS-06 — Pesquisa Sem Resultados</strong></td>
    <td>Verificar se o sistema informa adequadamente quando nenhuma O.S. corresponde ao filtro aplicado.</td>
    <td>Web / LocalStorage populado.</td>
    <td>
      <ol>
        <li>Acessar a página “Ordem de serviços”.</li>
        <li>Digitar no campo de pesquisa um termo que não corresponda a nenhuma O.S. cadastrada.</li>
      </ol>
    </td>
    <td>A tabela exibe a mensagem “Nenhuma ordem encontrada para a pesquisa.”, sem listar registros.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-07 -->

  <tr>
    <td><strong>CT-OS-07 — Normalização de Status e Classe Visual</strong><br>RF-14</td>
    <td>Validar se os status das O.S. são exibidos com texto padronizado e classes CSS corretas.</td>
    <td>Web / LocalStorage com O.S. em diferentes status.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ordensServico</code> com O.S. nos status “Aberta”, “Pendente”, “Em andamento” e “Concluída/Concluído”.</li>
        <li>Acessar a página “Ordem de serviços”.</li>
      </ol>
    </td>
    <td>Os status são exibidos com texto legível ao usuário e classes visuais apropriadas (ex.: <code>status-aberta</code>, <code>status-pendente</code>, <code>status-andamento</code>, <code>status-concluida</code>).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-08 -->

  <tr>
    <td><strong>CT-OS-08 — Carregamento de Responsáveis</strong></td>
    <td>Validar se o select de responsáveis é carregado com os funcionários cadastrados.</td>
    <td>Web / LocalStorage com <code>smartcondo_employees</code> populado.</td>
    <td>
      <ol>
        <li>Popular a chave <code>smartcondo_employees</code> com diferentes funcionários e cargos.</li>
        <li>Acessar o modal de criação de nova O.S.</li>
      </ol>
    </td>
    <td>O campo “Responsável” exibe as opções no formato “Nome - Cargo” para todos os funcionários cadastrados.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-09 -->

  <tr>
    <td><strong>CT-OS-09 — Comportamento sem Funcionários Cadastrados</strong></td>
    <td>Verificar a mensagem apresentada quando não há funcionários disponíveis para seleção.</td>
    <td>Web / LocalStorage sem <code>smartcondo_employees</code> ou vazio.</td>
    <td>
      <ol>
        <li>Limpar ou remover a chave <code>smartcondo_employees</code>.</li>
        <li>Abrir o modal de nova O.S.</li>
      </ol>
    </td>
    <td>O select de responsáveis exibe apenas a opção “Nenhum funcionário cadastrado”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-10 -->

  <tr>
    <td><strong>CT-OS-10 — Validação de Campos Obrigatórios ao Criar O.S.</strong></td>
    <td>Garantir que não é possível criar uma O.S. sem preencher os campos obrigatórios.</td>
    <td>Web / Modal de criação de O.S. aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de nova O.S.</li>
        <li>Deixar um ou mais campos obrigatórios vazios: Título, Categoria, Prioridade, Responsável, Data Sugerida.</li>
        <li>Clicar no botão de salvar/enviar.</li>
      </ol>
    </td>
    <td>O sistema exibe um alerta indicando os campos obrigatórios faltantes e não grava a O.S. no LocalStorage.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-11 -->

  <tr>
    <td><strong>CT-OS-11 — Validação da Data Sugerida (não pode ser passada)</strong></td>
    <td>Validar que a data sugerida não pode ser anterior à data atual.</td>
    <td>Web / Modal de criação de O.S. aberto.</td>
    <td>
      <ol>
        <li>Abrir o modal de nova O.S.</li>
        <li>Preencher todos os campos obrigatórios.</li>
        <li>Selecionar uma data sugerida anterior ao dia atual.</li>
        <li>Clicar para salvar a O.S.</li>
      </ol>
    </td>
    <td>O sistema exibe uma mensagem informando que “A data sugerida deve ser hoje ou uma data futura.” e não cria a O.S.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-12 -->

  <tr>
    <td><strong>CT-OS-12 — Criação de Nova O.S. Manual</strong></td>
    <td>Verificar se o síndico consegue criar uma nova O.S. sem vínculo com ocorrência.</td>
    <td>Web / LocalStorage com funcionários / Modal de nova O.S.</td>
    <td>
      <ol>
        <li>Abrir o modal de nova O.S. clicando no botão “Adicionar” ou equivalente.</li>
        <li>Preencher todos os campos obrigatórios com dados válidos, deixando o campo de ocorrência em branco.</li>
        <li>Salvar a O.S.</li>
      </ol>
    </td>
    <td>Uma nova O.S. é incluída em <code>smartcondo_ordensServico</code> com status “Aberta” e aparece na tabela após o salvamento.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-13 -->

  <tr>
    <td><strong>CT-OS-13 — Criação de O.S. a partir de Ocorrência</strong><br>RF-03</td>
    <td>Validar o fluxo de abertura automática do modal de O.S. quando o síndico vem da tela de Ocorrências.</td>
    <td>Web / Navegação entre Ocorrências e Ordem de Serviços.</td>
    <td>
      <ol>
        <li>Na tela de Ocorrências, selecionar uma ocorrência e clicar em “Abrir O.S.”.</li>
        <li>Verificar se a tela de Ordem de Serviços é carregada com o modal aberto.</li>
        <li>Conferir se os campos título, categoria, descrição, ocorrência e prioridade estão preenchidos com os dados da ocorrência.</li>
        <li>Salvar a nova O.S.</li>
      </ol>
    </td>
    <td>O modal é aberto automaticamente, com os dados da ocorrência pré-preenchidos, e a O.S. é salva com vínculo ao protocolo da ocorrência.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-14 -->

  <tr>
    <td><strong>CT-OS-14 — Visualização de Detalhes da O.S. (Modal Ver)</strong></td>
    <td>Validar a exibição dos dados completos de uma O.S. no modal de visualização.</td>
    <td>Web / LocalStorage com O.S. cadastradas.</td>
    <td>
      <ol>
        <li>Acessar a tela de Ordem de Serviços.</li>
        <li>Clicar no botão “Ver” de uma O.S.</li>
      </ol>
    </td>
    <td>O modal exibe corretamente número, título, categoria, responsável, prioridade, descrição, ocorrência vinculada, data sugerida e local da O.S.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-15 -->

  <tr>
    <td><strong>CT-OS-15 — Edição de Ordem de Serviço</strong></td>
    <td>Validar se é possível editar os dados de uma O.S. em andamento.</td>
    <td>Web / LocalStorage com O.S. em status diferente de “Concluída”.</td>
    <td>
      <ol>
        <li>Clicar em “Ver” em uma O.S. não concluída.</li>
        <li>Clicar no botão “Alterar”.</li>
        <li>Modificar título, categoria, responsável, prioridade, local, descrição ou data sugerida.</li>
        <li>Clicar em “Salvar alterações”.</li>
      </ol>
    </td>
    <td>Os campos editados são atualizados em <code>smartcondo_ordensServico</code>, o modal volta a ficar bloqueado para edição e a tabela exibe os novos valores.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-16 -->

  <tr>
    <td><strong>CT-OS-16 — Bloqueio de Edição para O.S. Concluída</strong><br></td>
    <td>Garantir que O.S. concluídas não possam ser editadas.</td>
    <td>Web / LocalStorage com O.S. em status “Concluída/Concluído”.</td>
    <td>
      <ol>
        <li>Clicar em “Ver” em uma O.S. com status concluído.</li>
      </ol>
    </td>
    <td>Os campos aparecem desabilitados para edição, o botão “Alterar” fica desabilitado e o botão “Concluir” é ocultado.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-17 -->

  <tr>
    <td><strong>CT-OS-17 — Conclusão de Ordem de Serviço</strong></td>
    <td>Validar se a conclusão de uma O.S. atualiza o status e sincroniza a ocorrência vinculada.</td>
    <td>Web / LocalStorage com O.S. vinculada a uma ocorrência.</td>
    <td>
      <ol>
        <li>Clicar em “Ver” em uma O.S. em andamento vinculada a uma ocorrência.</li>
        <li>Clicar no botão “Concluir”.</li>
      </ol>
    </td>
    <td>O status da O.S. é alterado para “Concluído”, a O.S. é recarregada na lista com o novo status e a ocorrência vinculada tem seu status atualizado para “Concluído”, mantendo a prioridade sincronizada.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-OS-18 -->

  <tr>
    <td><strong>CT-OS-18 — Persistência das O.S. após Recarregar</strong></td>
    <td>Verificar se as O.S. permanecem visíveis e consistentes após recarregar a página.</td>
    <td>Web / LocalStorage com O.S. cadastradas.</td>
    <td>
      <ol>
        <li>Acessar a página de Ordem de Serviços e observar a lista.</li>
        <li>Recarregar a página (F5).</li>
      </ol>
    </td>
    <td>Após o recarregamento, a tabela exibe as mesmas ordens de serviço, de acordo com o conteúdo de <code>smartcondo_ordensServico</code>.</td>
    <td>Vitor</td>
  </tr>
</table>

### PLANO DE TESTES – MÓDULO GESTÃO DE RESERVAS (Síndico) – SmartCondo

| Item            | Descrição                           |
| --------------- | ----------------------------------- |
| **Sistema**     | SmartCondo                          |
| **Módulo**      | Gestão de Reservas – Perfil Síndico |
| **Responsável** | Vitor                               |
| **Versão**      | 1.0                                 |
| **Data**        | 21/11/2025                          |

---

2. Objetivo

-   Listar reservas pendentes para análise do síndico.

-   Permitir que o síndico aceite ou recuse reservas de áreas comuns.

-   Exibir alertas de conflito de horário para reservas pendentes no mesmo espaço.

-   Exibir um histórico consolidado das decisões (aprovado/recusado) com período e status.

-   Normalizar e persistir o status das reservas (`pending`, `approved`, `rejected`) em todas as chaves relevantes do `localStorage`.

-   Garantir que reservas estáticas (arquivo `db.json`) e dinâmicas (usuarios) sejam unificadas sem duplicidade.

-   Permitir a paginação das reservas pendentes e dos resultados (histórico de decisões).

-   Permitir filtrar reservas por espaço, solicitante ou datas.

-   Garantir que as decisões fiquem associadas ao avaliador logado (síndico) e registradas com data/hora.

-   Garantir que a tela de Gestão de Reservas cumpra os requisitos funcionais RF-02, RF-03, RF-13 e RF-15, quando aplicáveis.

-   Requisitos para execução dos testes:

-   Site publicado ou executado em ambiente local (Live Server).

-   Reservas salvas em `reservations` (estático) e/ou `smartcondo_reservations` (dinâmico).

-   Decisões salvas em `smartcondo_reservas_resultados`.

-   Arquivo: `dashboard-sindico-gestao.html`.`dashboard-gestao-reserva.js`

-   Usuário síndico logado (`sessionStorage.smartcondo_loggedInUser`).

---

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou ambiente de homologação

-   Navegador: Chrome (versão 140+), Firefox, Edge

-   Banco de Dados: `localStorage` e `sessionStorage` com dados simulados

-   Arquivos: `dashboard-sindico-gestao.html`, script de gestão de reservas (JS fornecido), `layoutNavbar.css`, `dashboard-sindico-gestao.css`, `db/db.json`, `logout.js`

---

4. Casos de Teste

<table>
  <tr>
    <th>Identificação</th>
    <th>Objetivo</th>
    <th>Ambiente de Teste</th>
    <th>Passos</th>
    <th>Critérios de Êxito</th>
    <th>Responsável</th>
  </tr>

  <!-- CT-RES-01 -->

  <tr>
    <td><strong>CT-RES-01 — Inicialização das chaves de reservas</strong><br>RF-02</td>
    <td>Garantir que as chaves <code>smartcondo_reservations</code> e <code>smartcondo_reservas_resultados</code> sejam criadas no LocalStorage quando ausentes.</td>
    <td>Web / LocalStorage limpo.</td>
    <td>
      <ol>
        <li>Limpar o LocalStorage (remover <code>smartcondo_reservations</code> e <code>smartcondo_reservas_resultados</code>).</li>
        <li>Acessar a página “Gestão de reservas”.</li>
      </ol>
    </td>
    <td>As chaves <code>smartcondo_reservations</code> e <code>smartcondo_reservas_resultados</code> passam a existir no LocalStorage com valores padrão (array vazio e objeto vazio, respectivamente).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-02 -->

  <tr>
    <td><strong>CT-RES-02 — Carregamento único das reservas estáticas</strong><br>RF-02</td>
    <td>Validar que as reservas do arquivo <code>db.json</code> sejam carregadas apenas uma vez na chave <code>reservations</code>.</td>
    <td>Web / Arquivo <code>db.json</code> disponível / Chave <code>reservations</code> ausente.</td>
    <td>
      <ol>
        <li>Remover a chave <code>reservations</code> do LocalStorage.</li>
        <li>Acessar a página “Gestão de reservas”.</li>
        <li>Verificar se a chave <code>reservations</code> foi criada com os dados estáticos.</li>
        <li>Recarregar a página.</li>
      </ol>
    </td>
    <td>Na primeira carga, os dados do arquivo <code>db.json</code> são gravados em <code>reservations</code>; após a criação, recarregar a página não sobrescreve ou duplica os dados.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-03 -->

  <tr>
    <td><strong>CT-RES-03 — Unificação de reservas estáticas e dinâmicas sem duplicidade</strong><br>RF-02</td>
    <td>Verificar se reservas de <code>reservations</code> e <code>smartcondo_reservations</code> são combinadas sem gerar duplicatas.</td>
    <td>Web / LocalStorage com registros nas duas chaves.</td>
    <td>
      <ol>
        <li>Popular <code>reservations</code> e <code>smartcondo_reservations</code> com algumas reservas idênticas (mesmo id, espaço, datas e horários).</li>
        <li>Acessar “Gestão de reservas”.</li>
      </ol>
    </td>
    <td>A listagem interna considera cada reserva duplicada apenas uma vez, mantendo um único registro por combinação de (id, espaço, datas e horários).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-04 -->

  <tr>
    <td><strong>CT-RES-04 — Listagem de reservas pendentes em cards</strong><br>RF-02</td>
    <td>Validar se apenas as reservas pendentes são exibidas em formato de cards.</td>
    <td>Web / LocalStorage com reservas em diferentes status.</td>
    <td>
      <ol>
        <li>Popular <code>reservations</code> e/ou <code>smartcondo_reservations</code> com reservas em status variados: pending, approved, rejected.</li>
        <li>Acessar a página “Gestão de reservas”.</li>
      </ol>
    </td>
    <td>Somente reservas com status efetivo “Pendente” aparecem em cards na área <code>.container-reservas</code>, cada uma com espaço, período e solicitante.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-05 -->

  <tr>
    <td><strong>CT-RES-05 — Alerta de conflito de horário</strong><br>RF-02</td>
    <td>Validar a exibição do alerta de conflito quando há reservas sobrepostas no mesmo espaço.</td>
    <td>Web / LocalStorage com reservas simultâneas em um mesmo espaço.</td>
    <td>
      <ol>
        <li>Criar duas reservas para o mesmo espaço, com períodos que se sobrepõem.</li>
        <li>Manter ambas com status não rejeitado (pending/aprovado).</li>
        <li>Acessar “Gestão de reservas”.</li>
      </ol>
    </td>
    <td>O card da reserva pendente exibe um aviso de conflito (“Alerta: Já existe uma reserva nesta data/horário para &lt;espaço&gt;.”), calculado a partir das datas e horários.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-06 -->

  <tr>
    <td><strong>CT-RES-06 — Formatação de período e datas</strong></td>
    <td>Verificar se o período da reserva é exibido no formato de data/hora brasileiro.</td>
    <td>Web / LocalStorage com reservas válidas.</td>
    <td>
      <ol>
        <li>Popular reservas com <code>dateInit</code>, <code>startTime</code>, <code>dateFinished</code> e <code>endTime</code>.</li>
        <li>Acessar a tela “Gestão de reservas”.</li>
      </ol>
    </td>
    <td>O texto “Período” é exibido como “dd/mm/aaaa hh:mm até dd/mm/aaaa hh:mm” utilizando <code>toLocaleString("pt-BR")</code>, e o campo “Pedido recebido em” (se existir <code>dateRegistered</code>) é exibido em formato de data brasileiro.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-07 -->

  <tr>
    <td><strong>CT-RES-07 — Aprovação de reserva (botão Aceitar)</strong><br>RF-02, RF-03</td>
    <td>Validar o fluxo de aprovação de uma reserva pendente.</td>
    <td>Web / LocalStorage com reserva pendente.</td>
    <td>
      <ol>
        <li>Garantir que existe ao menos uma reserva pendente listada em cards.</li>
        <li>Clicar no botão “Aceitar” de um card.</li>
      </ol>
    </td>
    <td>A reserva some da lista de pendentes; a decisão é registrada em <code>smartcondo_reservas_resultados</code> com status “approved”; as chaves <code>reservations</code> e/ou <code>smartcondo_reservations</code> são atualizadas com status “approved”; o histórico de resultados passa a exibir essa reserva como “Aprovado”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-08 -->

  <tr>
    <td><strong>CT-RES-08 — Recusa de reserva (botão Recusar)</strong><br>RF-02, RF-03</td>
    <td>Validar o fluxo de recusa de uma reserva pendente.</td>
    <td>Web / LocalStorage com reserva pendente.</td>
    <td>
      <ol>
        <li>Garantir que existe ao menos uma reserva pendente listada em cards.</li>
        <li>Clicar no botão “Recusar” de um card.</li>
      </ol>
    </td>
    <td>A reserva some da lista de pendentes; a decisão é registrada em <code>smartcondo_reservas_resultados</code> com status “rejected”; as chaves <code>reservations</code> e/ou <code>smartcondo_reservations</code> são atualizadas com status “rejected”; o histórico passa a exibir essa reserva como “Recusado”.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-09 -->

  <tr>
    <td><strong>CT-RES-09 — Registro de avaliador e data/hora da decisão</strong><br>RF-02, RF-03</td>
    <td>Garantir que as decisões salvem o avaliador logado e o momento da análise.</td>
    <td>Web / Síndico logado / LocalStorage com reservas pendentes.</td>
    <td>
      <ol>
        <li>Acessar “Gestão de reservas” logado como síndico.</li>
        <li>Aprovar ou recusar uma reserva.</li>
        <li>Inspecionar o conteúdo da chave <code>smartcondo_reservas_resultados</code> no LocalStorage.</li>
      </ol>
    </td>
    <td>O objeto de decisão contém <code>reviewedAt</code> com data/hora ISO e um objeto <code>reviewer</code> com nome e papel (role) do usuário logado no momento da análise.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-10 -->

  <tr>
    <td><strong>CT-RES-10 — Listagem de histórico de decisões</strong><br>RF-02</td>
    <td>Verificar se o histórico de reservas aprovadas/recusadas é exibido corretamente.</td>
    <td>Web / LocalStorage com <code>smartcondo_reservas_resultados</code> preenchido.</td>
    <td>
      <ol>
        <li>Realizar aprovações e recusas de algumas reservas.</li>
        <li>Observar a seção de resultados (lista com id <code>lista-resultados</code>).</li>
      </ol>
    </td>
    <td>Cada decisão é exibida como uma linha com espaço, autor, período (início/fim) e status “Aprovado” ou “Recusado”, utilizando as classes visuais apropriadas.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-11 -->

  <tr>
    <td><strong>CT-RES-11 — Paginação das reservas pendentes</strong><br>RF-02</td>
    <td>Validar a paginação das reservas pendentes.</td>
    <td>Web / LocalStorage com mais de 6 reservas pendentes.</td>
    <td>
      <ol>
        <li>Popular o sistema com mais de 6 reservas pendentes.</li>
        <li>Acessar “Gestão de reservas”.</li>
        <li>Navegar entre páginas usando “Anterior” e “Próximo” na paginação dos cards.</li>
      </ol>
    </td>
    <td>São exibidos no máximo 6 cards por página; a informação “Página X de Y” é atualizada e os botões de navegação funcionam conforme esperado.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-12 -->

  <tr>
    <td><strong>CT-RES-12 — Paginação do histórico de resultados</strong><br>RF-02</td>
    <td>Validar a paginação do histórico de decisões (aprovado/recusado).</td>
    <td>Web / LocalStorage com muitas entradas em <code>smartcondo_reservas_resultados</code>.</td>
    <td>
      <ol>
        <li>Executar aprovações e recusas até gerar mais de 5 registros.</li>
        <li>Observar a seção de resultados (lista de decisões).</li>
        <li>Navegar entre páginas de resultados usando “Anterior” e “Próximo”.</li>
      </ol>
    </td>
    <td>São exibidos no máximo 5 resultados por página; a paginação mostra corretamente “Página X de Y” e troca as linhas exibidas ao navegar.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-13 -->

  <tr>
    <td><strong>CT-RES-13 — Filtro de pesquisa aplicado a pendentes e histórico</strong><br>RF-02</td>
    <td>Validar se o campo de pesquisa filtra tanto os cards pendentes quanto o histórico de resultados.</td>
    <td>Web / Campo de pesquisa <code>#campoPesquisa</code> ativo / LocalStorage com vários registros.</td>
    <td>
      <ol>
        <li>Acessar “Gestão de reservas” com pendentes e histórico preenchidos.</li>
        <li>Digitar no campo de pesquisa termos que correspondam ao espaço, nome do solicitante ou datas.</li>
        <li>Observar a filtragem nos cards pendentes e na lista de resultados.</li>
      </ol>
    </td>
    <td>Somente reservas e decisões cujo espaço, nome do autor ou datas contenham o termo digitado permanecem visíveis; os demais são ocultados.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-14 -->

  <tr>
    <td><strong>CT-RES-14 — Pesquisa sem resultados</strong><br>RF-02</td>
    <td>Verificar mensagens exibidas quando não há reservas ou decisões que atendam ao filtro.</td>
    <td>Web / LocalStorage com registros / Campo de pesquisa.</td>
    <td>
      <ol>
        <li>Acessar “Gestão de reservas”.</li>
        <li>Digitar um termo de pesquisa que não corresponda a nenhuma reserva ou decisão.</li>
      </ol>
    </td>
    <td>É exibida a mensagem “Nenhuma reserva encontrada.” na área de cards e “Nenhuma solicitação encontrada.” na área de resultados.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-RES-15 -->

  <tr>
    <td><strong>CT-RES-15 — Persistência após recarregar a página</strong><br>RF-02</td>
    <td>Garantir que reservas, decisões e filtros permaneçam consistentes após recarregar a página.</td>
    <td>Web / LocalStorage populado.</td>
    <td>
      <ol>
        <li>Com algumas reservas já aprovadas/recusadas e outras pendentes, acessar “Gestão de reservas”.</li>
        <li>Observar a lista de pendentes e o histórico.</li>
        <li>Recarregar a página (F5).</li>
      </ol>
    </td>
    <td>Após o recarregamento, a listagem de pendentes e o histórico de resultados permanecem de acordo com o que está salvo em <code>reservations</code>, <code>smartcondo_reservations</code> e <code>smartcondo_reservas_resultados</code>, respeitando os status aprovados/recusados.</td>
    <td>Vitor</td>
  </tr>
</table>

### PLANO DE TESTES – MÓDULO DE RESERVAS DE ÁREAS COMUNS(Sindico) - SmartCondo

1. Identificação

| Item            | Descrição                |
| --------------- | ------------------------ |
| **Sistema**     | SmartCondo               |
| **Módulo**      | Reservas de áreas comuns |
| **Responsável** | Vinicius Oliveira        |
| **Versão**      | 1.0                      |
| **Data**        | 26/10/2025               |

2. Objetivo

-   Exibir calendário de reservas.
-   Criar nova reserva.
-   Impedir reserva duplicada.
-   Cancelar reserva.
-   Visualizar status da reserva.
-   Filtrar reservas por mês.
-   Feedback visual e carregamento.
-   Persistência de reservas.

-   Os requisitos para realização dos testes de software são:

*   Site publicado na internet;

    3.Ambiente de Testes

-   Ambiente Localhost (Live Server) ou ambiente de homologação
-   Navegador Chrome (versão 140+), Firefox, Edge
-   Banco de Dados localStorage com dados simulados (db.json)
-   Arquivos login.html, auth/login.js, index.js

3.Casos de teste

<table>
 <tr>
  <th>Identificação</th>
  <th>Objetivo</th>
  <th>Ambiente de Teste</th>
  <th>Passos</th>
  <th>Critérios de Êxito</th>
  <th>Responsável</th>
 </tr>

 <!-- CT-01 -->
 <tr>
  <td><strong>CT-01 — Exibir calendário de reservas</strong><br>RF-13</td>
  <td>Verificar se o calendário renderiza corretamente o mês atual e os dias disponíveis para reserva.</td>
  <td>Ambiente Web — Navegador Google Chrome v.141 / LocalStorage ativo / Usuário morador logado.</td>
  <td>
   <ol>
    <li>Acessar a página de reservas como morador ou sindico logado.</li>
    <li>Verificar se o calendário exibe os dias do mês atual.</li>
    <li>Selecionar outro mês no seletor de meses (quando disponível).</li>
   </ol>
  </td>
  <td>O calendário exibe corretamente os dias do mês atual e atualiza ao trocar de mês.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-02 -->
 <tr>
  <td><strong>CT-02 — Criar nova reserva</strong><br>RF-02</td>
  <td>Validar o processo de criação de uma reserva de área comum (ex: salão de festas).</td>
  <td>Ambiente Web / LocalStorage / Usuário morador logado.</td>
  <td>
   <ol>
    <li>Acessar a tela de reservas.</li>
    <li>Clicar em “Nova Reserva”.</li>
    <li>Preencher campos obrigatórios (data, horário, área).</li>
    <li>Clicar em “Salvar”.</li>
   </ol>
  </td>
  <td>A reserva é salva no LocalStorage e exibida com status “Pendente”.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-03 -->
 <tr>
  <td><strong>CT-03 — Impedir reserva duplicada</strong><br>RF-02</td>
  <td>Garantir que o sistema impeça reservas duplicadas (mesma área, data e horário).</td>
  <td>Ambiente Web / LocalStorage / Usuário morador logado.</td>
  <td>
   <ol>
    <li>Realizar uma reserva válida.</li>
    <li>Tentar reservar novamente o mesmo horário e área.</li>
   </ol>
  </td>
  <td>O sistema exibe mensagem de erro informando que já existe uma reserva para o mesmo horário.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-04 -->
 <tr>
  <td><strong>CT-04 — Cancelar reserva</strong><br>RF-02</td>
  <td>Verificar se o morador pode cancelar uma reserva pendente.</td>
  <td>Ambiente Web / LocalStorage / Usuário morador logado.</td>
  <td>
   <ol>
    <li>Localizar reserva pendente na lista.</li>
    <li>Clicar em “Cancelar”.</li>
    <li>Confirmar no modal.</li>
   </ol>
  </td>
  <td>A reserva é removida e o sistema exibe mensagem de sucesso.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-05 -->
 <tr>
  <td><strong>CT-05 — Visualizar status da reserva</strong><br>RF-02 / RF-14</td>
  <td>Verificar se o status da reserva é exibido corretamente (Pendente, Confirmada, Rejeitada).</td>
  <td>Ambiente Web / LocalStorage / Morador logado.</td>
  <td>
   <ol>
    <li>Acessar a tela de reservas.</li>
    <li>Verificar o status de cada reserva listada.</li>
   </ol>
  </td>
  <td>O status é exibido com cores distintas e atualiza conforme ação do síndico.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-06 -->
 <tr>
  <td><strong>CT-06 — Filtrar reservas por mês</strong><br>RF-13</td>
  <td>Verificar que o filtro de meses exibe corretamente as reservas correspondentes.</td>
  <td>Ambiente Web / LocalStorage / Morador logado.</td>
  <td>
   <ol>
    <li>Acessar o seletor de mês.</li>
    <li>Selecionar outro mês.</li>
    <li>Observar atualização das reservas no calendário.</li>
   </ol>
  </td>
  <td>Somente reservas do mês selecionado são exibidas.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-07 -->
 <tr>
  <td><strong>CT-07 — Feedback visual e carregamento</strong><br>RNF-01 / RNF-02</td>
  <td>Verificar se há feedback visual (loader ou alertas) nas ações de reserva.</td>
  <td>Ambiente Web / LocalStorage / Morador logado.</td>
  <td>
   <ol>
    <li>Criar, editar e excluir reserva.</li>
    <li>Observar se há exibição de loader ou mensagem de confirmação.</li>
   </ol>
  </td>
  <td>O sistema exibe loader e mensagem de sucesso ou erro conforme a ação.</td>
  <td>Vinicius</td>
 </tr>

 <!-- CT-08 -->
 <tr>
  <td><strong>CT-08 — Persistência de reservas</strong><br>RF-02 / RNF-03</td>
  <td>Garantir que as reservas permaneçam salvas após recarregar a página.</td>
  <td>Ambiente Web / LocalStorage / Morador logado.</td>
  <td>
   <ol>
    <li>Criar uma reserva.</li>
    <li>Atualizar (F5) a página.</li>
   </ol>
  </td>
  <td>A reserva continua visível após o recarregamento da página.</td>
  <td>Vinicius</td>
 </tr>
</table>

## Perfil de usuário MORADOR

### PLANO DE TESTES – MÓDULO DE OCORRÊNCIAS (Morador) – SmartCondo

| Item            | Descrição                    |
| --------------- | ---------------------------- |
| **Sistema**     | SmartCondo                   |
| **Módulo**      | Ocorrências – Perfil Morador |
| **Responsável** | Vitor                        |
| **Versão**      | 1.0                          |
| **Data**        | 21/11/2025                   |

---

2. Objetivo

-   Registrar ocorrências realizadas pelo morador (RF-06).

-   Garantir a validação de campos obrigatórios (título, categoria, descrição).

-   Gerar identificador incremental e protocolo diário para cada ocorrência.

-   Listar apenas as ocorrências do morador logado.

-   Exibir ocorrências em ordem decrescente de criação.

-   Paginar a listagem de ocorrências conforme o tamanho da tela (desktop x mobile).

-   Exibir corretamente o status da ocorrência com texto e classe visual adequada (Aberta, Em andamento, Em execução, Concluída).

-   Exibir datas de criação e resolução formatadas em padrão brasileiro.

-   Permitir exclusão de ocorrências do morador com confirmação.

-   Garantir persistência em `localStorage` e uso de dados do usuário em `sessionStorage`.

-   Requisitos para execução dos testes:

-   Site publicado ou executado em ambiente local (Live Server).

-   `localStorage` com chave `smartcondo_ocorrencias` configurada.

-   `sessionStorage.smartcondo_loggedInUser` preenchido com dados de um morador.

-   HTML contendo o formulário de ocorrência (`#formOcorrencia`, campos `#titulo`, `#categoria`, `#descricao`) e a listagem (`#listaOcorrencias`, `#paginacaoOcorrencias`).

---

3. Ambiente de Testes

-   Ambiente: Localhost (Live Server) ou ambiente de homologação.
-   Navegadores: Chrome (versão 140+), Firefox, Edge.
-   Banco de Dados: `localStorage` e `sessionStorage` com dados simulados.
-   Arquivos: `dashboard-resident-occurrence.js`, `occurrence.html`,`index.js`

---

4. Casos de Teste

<table>
  <tr>
    <th>Identificação</th>
    <th>Objetivo</th>
    <th>Ambiente de Teste</th>
    <th>Passos</th>
    <th>Critérios de Êxito</th>
    <th>Responsável</th>
  </tr>

  <!-- CT-MOR-OC-01 -->

  <tr>
    <td><strong>CT-MOR-OC-01 — Registro de nova ocorrência</strong><br>RF-06</td>
    <td>Validar se o morador consegue registrar uma nova ocorrência com sucesso.</td>
    <td>Web / Morador logado / <code>sessionStorage.smartcondo_loggedInUser</code> preenchido.</td>
    <td>
      <ol>
        <li>Acessar a tela de Ocorrências no perfil do morador.</li>
        <li>Preencher o formulário com Título, Categoria e Descrição válidos.</li>
        <li>Clicar em “Enviar” ou botão equivalente do formulário.</li>
      </ol>
    </td>
    <td>A ocorrência é salva em <code>smartcondo_ocorrencias</code> com status “Aberta”, id gerado, protocolo gerado, dados do solicitante e aparece na listagem do morador.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-02 -->

  <tr>
    <td><strong>CT-MOR-OC-02 — Validação de campos obrigatórios</strong><br>RF-06</td>
    <td>Garantir que não é possível registrar ocorrência com campos obrigatórios vazios.</td>
    <td>Web / Morador logado / Formulário disponível.</td>
    <td>
      <ol>
        <li>Acessar a tela de Ocorrências.</li>
        <li>Deixar pelo menos um dos campos Título, Categoria ou Descrição vazio.</li>
        <li>Clicar em “Enviar”.</li>
      </ol>
    </td>
    <td>O sistema exibe um alerta “Preencha todos os campos!” e nenhuma ocorrência é adicionada ao <code>smartcondo_ocorrencias</code>.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-03 -->

  <tr>
    <td><strong>CT-MOR-OC-03 — Geração de ID incremental</strong><br>RF-06</td>
    <td>Validar se o campo <code>id</code> é gerado de forma incremental e formatado com 2 dígitos.</td>
    <td>Web / LocalStorage com chave <code>smartcondo_ocorrencias_lastId</code> controlada.</td>
    <td>
      <ol>
        <li>Limpar as chaves <code>smartcondo_ocorrencias</code> e <code>smartcondo_ocorrencias_lastId</code>.</li>
        <li>Registrar uma nova ocorrência.</li>
        <li>Registrar outra ocorrência na sequência.</li>
      </ol>
    </td>
    <td>A primeira ocorrência recebe <code>id = "01"</code>, a segunda <code>id = "02"</code>, e assim sucessivamente, sempre com padding de 2 dígitos.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-04 -->

  <tr>
    <td><strong>CT-MOR-OC-04 — Geração de protocolo diário</strong><br>RF-06</td>
    <td>Verificar se o protocolo é gerado no formato <code>AAAAMMDD-XXX</code> e reiniciado a cada dia.</td>
    <td>Web / Controle sobre data do sistema ou simulação.</td>
    <td>
      <ol>
        <li>Com data atual D1, registrar duas ocorrências.</li>
        <li>Verificar o valor de <code>protocolo</code> das duas ocorrências.</li>
        <li>Alterar a data do sistema para D2 (dia seguinte) ou simular mudança.</li>
        <li>Registrar nova ocorrência.</li>
      </ol>
    </td>
    <td>Para D1, protocolos seguem a sequência <code>AAAAMMDD-001</code>, <code>AAAAMMDD-002</code>. Para D2, o protocolo reinicia em <code>AAAAMMDD-001</code>, conforme lógica da chave <code>smartcondo_ocorrencias_protocolo</code>.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-05 -->

  <tr>
    <td><strong>CT-MOR-OC-05 — Vínculo com usuário logado</strong><br>RF-06</td>
    <td>Garantir que cada ocorrência registrada fique vinculada ao morador logado.</td>
    <td>Web / Dois moradores de teste / <code>sessionStorage</code> alternado.</td>
    <td>
      <ol>
        <li>Logar como Morador A (preencher <code>smartcondo_loggedInUser</code> com id e name do A).</li>
        <li>Registrar uma ocorrência.</li>
        <li>Logar como Morador B.</li>
        <li>Registrar outra ocorrência.</li>
        <li>Inspecionar <code>smartcondo_ocorrencias</code> no LocalStorage.</li>
      </ol>
    </td>
    <td>Cada ocorrência possui <code>authorId</code> e <code>authorName</code> de acordo com o usuário logado no momento do registro, além do objeto <code>solicitante</code> com nome/sobrenome e apartamento.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-06 -->

  <tr>
    <td><strong>CT-MOR-OC-06 — Listagem apenas das ocorrências do morador</strong><br>RF-06</td>
    <td>Confirmar que o morador visualiza apenas as ocorrências que ele mesmo registrou.</td>
    <td>Web / LocalStorage com ocorrências de múltiplos moradores.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com ocorrências de diferentes <code>authorId</code>.</li>
        <li>Logar como um morador específico.</li>
        <li>Acessar a tela de Ocorrências do morador.</li>
      </ol>
    </td>
    <td>A listagem mostra somente as ocorrências cujo <code>authorId</code> é igual ao id do usuário logado; ocorrências de outros moradores não aparecem.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-07 -->

  <tr>
    <td><strong>CT-MOR-OC-07 — Ordenação das ocorrências por data de criação</strong><br>RF-06</td>
    <td>Validar se as ocorrências são exibidas da mais recente para a mais antiga.</td>
    <td>Web / LocalStorage com <code>criadaEm</code> variados.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com múltiplas ocorrências do mesmo morador, com <code>criadaEm</code> em datas diferentes.</li>
        <li>Acessar a tela de Ocorrências desse morador.</li>
      </ol>
    </td>
    <td>Os cards são exibidos ordenados de forma decrescente pela data de criação (<code>criadaEm</code>), com a ocorrência mais recente primeiro.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-08 -->

  <tr>
    <td><strong>CT-MOR-OC-08 — Mensagem quando não há ocorrências</strong><br>RF-06</td>
    <td>Verificar o comportamento da tela quando o morador não possui ocorrências registradas.</td>
    <td>Web / LocalStorage com <code>smartcondo_ocorrencias</code> vazio para o morador logado.</td>
    <td>
      <ol>
        <li>Garantir que não existam ocorrências com <code>authorId</code> do morador logado.</li>
        <li>Acessar a tela de Ocorrências.</li>
      </ol>
    </td>
    <td>Na área <code>#listaOcorrencias</code> é exibida a mensagem “Você ainda não registrou nenhuma ocorrência.” e nenhum card é renderizado.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-09 -->

  <tr>
    <td><strong>CT-MOR-OC-09 — Paginação em desktop e mobile</strong><br>RF-06</td>
    <td>Validar a quantidade de ocorrências por página conforme o tamanho da tela.</td>
    <td>Web / Navegador com redimensionamento / LocalStorage com várias ocorrências do mesmo morador.</td>
    <td>
      <ol>
        <li>Com a janela em largura &gt; 700px, acessar a tela de Ocorrências com mais de 6 ocorrências do morador.</li>
        <li>Verificar quantos cards aparecem por página.</li>
        <li>Reduzir a largura da janela para ≤ 700px.</li>
        <li>Recarregar a tela (ou acionar o <code>resize</code>) e observar a nova quantidade de cards por página.</li>
      </ol>
    </td>
    <td>Em telas maiores, são exibidas até 6 ocorrências por página; em telas ≤ 700px, são exibidas até 4, e a paginação (<code>#paginacaoOcorrencias</code>) exibe “Página X de Y” com botões “Anterior” e “Próximo” quando necessário.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-10 -->

  <tr>
    <td><strong>CT-MOR-OC-10 — Normalização de status e classes visuais</strong></td>
    <td>Garantir que os status das ocorrências sejam exibidos em texto amigável e com classes CSS corretas.</td>
    <td>Web / LocalStorage com ocorrências em status variados.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com ocorrências do morador em status: “Aberta/aberto/pendente”, “Em andamento”, “Em execução/em execucao”, “Concluída/concluido”.</li>
        <li>Acessar a tela de Ocorrências.</li>
      </ol>
    </td>
    <td>Cada card exibe o rótulo de status normalizado (“Aberta”, “Em andamento”, “Em execução”, “Concluída”) e a classe CSS correspondente (<code>status-aberto</code>, <code>status-andamento</code>, <code>status-execucao</code>, <code>status-concluido</code>).</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-11 -->

  <tr>
    <td><strong>CT-MOR-OC-11 — Exibição de datas de criação e resolução</strong><br>RF-06</td>
    <td>Validar a formatação das datas de registro e resolução da ocorrência.</td>
    <td>Web / LocalStorage com ocorrências contendo <code>criadaEm</code> e <code>resolvidaEm</code>.</td>
    <td>
      <ol>
        <li>Popular <code>smartcondo_ocorrencias</code> com ocorrências que possuam <code>criadaEm</code> (ISO) e algumas com <code>resolvidaEm</code>.</li>
        <li>Acessar a tela de Ocorrências.</li>
      </ol>
    </td>
    <td>Os campos “Registrada em” e “Resolvida em” são exibidos formatados em padrão brasileiro (dd/mm/aaaa hh:mm), utilizando a função <code>formatarDataHoraBR</code>.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-12 -->

  <tr>
    <td><strong>CT-MOR-OC-12 — Exclusão de ocorrência</strong><br>RF-06</td>
    <td>Verificar se o morador consegue excluir uma ocorrência registrada por ele.</td>
    <td>Web / LocalStorage com ocorrências do morador / Botão “Excluir” visível.</td>
    <td>
      <ol>
        <li>Acessar a tela de Ocorrências com pelo menos uma ocorrência listada.</li>
        <li>Clicar no botão “Excluir” de uma ocorrência.</li>
        <li>Confirmar a exclusão na caixa de diálogo do navegador.</li>
      </ol>
    </td>
    <td>Após a confirmação, a ocorrência é removida da lista, não aparece mais na tela e é excluída do array armazenado em <code>smartcondo_ocorrencias</code> para aquele id.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-13 -->

  <tr>
    <td><strong>CT-MOR-OC-13 — Cancelar exclusão de ocorrência</strong><br>RF-06</td>
    <td>Garantir que, ao cancelar a confirmação, a ocorrência não seja removida.</td>
    <td>Web / LocalStorage com ocorrência do morador.</td>
    <td>
      <ol>
        <li>Clicar em “Excluir” em uma ocorrência.</li>
        <li>Na caixa de confirmação, clicar em “Cancelar”.</li>
      </ol>
    </td>
    <td>A ocorrência permanece na tela e no LocalStorage, sem alteração de dados.</td>
    <td>Vitor</td>
  </tr>

  <!-- CT-MOR-OC-14 -->

  <tr>
    <td><strong>CT-MOR-OC-14 — Identificação do usuário logado no cabeçalho</strong></td>
    <td>Verificar se o nome do morador logado é exibido corretamente no cabeçalho.</td>
    <td>Web / <code>sessionStorage.smartcondo_loggedInUser</code> preenchido.</td>
    <td>
      <ol>
        <li>Definir <code>smartcondo_loggedInUser</code> com <code>{ name, role: "resident" }</code> no SessionStorage.</li>
        <li>Acessar a tela de Ocorrências do morador.</li>
      </ol>
    </td>
    <td>O elemento <code>#usuarioLogado</code> exibe “Nome, Morador”.</td>
    <td>Vitor</td>
  </tr>
</table>

## Perfil de usuário FUNCIONÁRIO

### PLANO DE TESTES – MÓDULO ORDEM DE SERVIÇO (FUNCIONÁRIO) - SmartCondo

1. Identificação

| Item            | Descrição                             |
| --------------- | ------------------------------------- |
| **Sistema**     | SmartCondo                            |
| **Módulo**      | Ordem de Serviço - Perfil Funcionário |
| **Responsável** | ANNA CLARA                            |
| **Versão**      | 1.0                                   |
| **Data**        | 21/11/2025                            |

---

2. Objetivo

-   Identificação do usuário logado, contendo: nome completo, função do usuário e foto cadastrada.

-   Listar todas as ordens de serviço atribuídas ao funcionário para acompanhamento e execução.
-   Exibir o status das ordens de serviço de forma clara, com texto e classes visuais padronizadas (Aberta, Em andamento, Concluída).

-   Permitir que o funcionário visualize os detalhes completos de uma ordem de serviço, em um modal contendo: Número da O.S, Título, Prioridade, Ocorrência vinculada (se houver), Data sugerida, Descrição e Responsável.

-   Permitir que o funcionário atualize o andamento da ordem de serviço, podendo registrar ações realizadas, alterações de status (concluida, em andamento).

-   Persistência do status da OS, mesmo após recarregar o site.

-   Impedir que o funcionário edite dados de ordens de serviço concluídas, permitindo apenas visualização.

-   Permitir que o funcionário conclua a ordem de serviço, atualizando o status e comunicando automaticamente a ocorrência vinculada (caso exista).

-   Garantir que as OS sejam salvas e carregadas pelo LocalStorage.

-   Validar que o botão de logout limpe o sessionStorage e redirecione para a tela de login.

*   Requisitos para execução dos testes:

    -   Site publicado ou executado em ambiente local (Live Server).

    -   Ordens de serviço armazenadas em smartcondo_ordensServico.

    -   Funcionários cadastrados em smartcondo_employees.

    -   Usuário funcionario logado (sessionStorage.smartcondo_loggedInUser).

---

3. Ambiente de Teste

-   Ambiente: Localhost (Live Server) ou ambiente de homologação.

-   Navegador: Chrome (versão 140+), Firefox, Edge.

-   Banco de Dados: localStorage e sessionStorage com dados simulados

-   Arquivos: dashboard.html, index.js, script.js

---

4. Casos de Teste

<table>
 <tr>
  <th>Identificação</th>
  <th>Objetivo</th>
  <th>Ambiente de Teste</th>
  <th>Passos</th>
  <th>Critérios de Êxito</th>
  <th>Responsável</th>
 </tr>

 <!-- CT-FUNC-OS-01 -->

<tr>
    <td><strong>CT-FUNC-OS-01 — Identificação do usuário logado</strong><br>RNF-02</td>
    <td>Validar se, ao acessar o painel do funcionário, são exibidos corretamente o nome, a função e a foto do usuário logado.</td>
    <td>Web / SessionStorage</td>
    <td>
        <ol>
            <li>Realizar login com um usuário funcionário válido.</li>
            <li>Acessar o dashboard do funcionário.</li>
            <li>Verificar a área de identificação do usuário.</li>
        </ol>
    </td>
    <td>O sistema exibe corretamente: nome completo, função do usuário e foto cadastrada, conforme informações do sessionStorage.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-02 -->

<tr>
    <td><strong>CT-FUNC-OS-02 — Listar Ordens de Serviço do funcionário</strong><br>RF-10</td>
    <td>Validar se o sistema exibe apenas as Ordens de Serviço atribuídas ao funcionário logado.</td>
    <td>Web / LocalStorage “smartcondo_ordensServico”</td>
    <td>
        <ol>
            <li>Realizar login como funcionário X.</li>
            <li>Acessar a aba de Ordens de Serviço.</li>
        </ol>
    </td>
    <td>A listagem exibe somente as O.S cujo responsável corresponde ao funcionário logado.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-03 -->

<tr>
    <td><strong>CT-FUNC-OS-03 — Persistência do status da OS</strong><br>RF-11</td>
    <td>Validar se o status atualizado da Ordem de Serviço permanece salvo após recarregar a página.</td>
    <td>Web / LocalStorage “smartcondo_ordensServico”</td>
    <td>
        <ol>
            <li>Acessar a aba de Ordens de Serviço.</li>
            <li>Alterar o status para "Em andamento" ou "Concluída".</li>
            <li>Atualizar a página.</li>
        </ol>
    </td>
    <td>O status permanece atualizado conforme o valor salvo no LocalStorage.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-04 -->

<tr>
    <td><strong>CT-FUNC-OS-04 — Exibir status padronizado</strong><br>RF-10</td>
    <td>Verificar se as O.S apresentam os status com texto e classes visuais padronizadas.</td>
    <td>Web / LocalStorage com O.S em diferentes status</td>
    <td>
        <ol>
            <li>Popular O.S com status: Aberta, Em andamento, Concluída.</li>
            <li>Acessar a lista de Ordens de Serviço.</li>
        </ol>
    </td>
    <td>Os status aparecem como: “Aberta”, “Em andamento”, “Concluída”.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-05 -->

<tr>
    <td><strong>CT-FUNC-OS-05 — Visualizar detalhes da O.S</strong><br>RF-10</td>
    <td>Verificar se o modal de detalhes exibe corretamente todas as informações da Ordem de Serviço.</td>
    <td>Web / LocalStorage “smartcondo_ordensServico”</td>
    <td>
        <ol>
            <li>Acessar a lista de Ordens de Serviço.</li>
            <li>Clicar em “Ver detalhes”.</li>
        </ol>
    </td>
    <td>O modal exibe número, título, prioridade, data sugerida, categoria, descrição e ocorrência vinculada (se houver).</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-06 -->

<tr>
    <td><strong>CT-FUNC-OS-06 — Editar O.S em andamento</strong><br>RF-11</td>
    <td>Validar se somente Ordens de Serviço com status “Em andamento” podem ser editadas.</td>
    <td>Web / LocalStorage com O.S “Em andamento”</td>
    <td>
        <ol>
            <li>Abrir uma OS com status “Em andamento”.</li>
            <li>Alterar os campos permitidos.</li>
            <li>Clicar em “Salvar”.</li>
        </ol>
    </td>
    <td>A O.S é atualizada corretamente no LocalStorage.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-07 -->

<tr>
    <td><strong>CT-FUNC-OS-07 — Impedir edição de O.S concluída</strong><br>RF-11</td>
    <td>Verificar se uma Ordem de Serviço concluída permanece bloqueada para edição.</td>
    <td>Web / LocalStorage com O.S concluída</td>
    <td>
        <ol>
            <li>Abrir uma OS com status “Concluída”.</li>
            <li>Tentar editar qualquer campo.</li>
        </ol>
    </td>
    <td>Todos os campos aparecem bloqueados, impedindo alterações.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-08 -->

<tr>
    <td><strong>CT-FUNC-OS-08 — Impedir edição total da O.S pelo funcionário</strong><br>RF-10</td>
    <td>Validar se o funcionário pode apenas visualizar as Ordens de Serviço, sem editar os campos.</td>
    <td>Web / LocalStorage “smartcondo_ordensServico”</td>
    <td>
        <ol>
            <li>Abrir uma Ordem de Serviço.</li>
            <li>Tentar editar qualquer campo da OS.</li>
        </ol>
    </td>
    <td>Todos os campos permanecem bloqueados, permitindo apenas visualizar e usar ações de status (“iniciar, concluir, voltar”).</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-09 -->

<tr>
    <td><strong>CT-FUNC-OS-09 — Concluir Ordem de Serviço</strong><br>RF-11</td>
    <td>Verificar se o funcionário consegue concluir uma O.S vinculada a uma ocorrência.</td>
    <td>Web / LocalStorage com ocorrência vinculada</td>
    <td>
        <ol>
            <li>Abrir uma OS com status “Em andamento”.</li>
            <li>Clicar em “Concluir”.</li>
        </ol>
    </td>
    <td>O status da O.S muda para “Concluída” e a ocorrência vinculada também é atualizada.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-10 -->

<tr>
    <td><strong>CT-FUNC-OS-10 — Atualização automática do status da ocorrência</strong><br>RF-06 / RF-11</td>
    <td>Confirmar se o status da ocorrência vinculada acompanha automaticamente o status da O.S.</td>
    <td>Web / LocalStorage sincronizado</td>
    <td>
        <ol>
            <li>Selecionar uma O.S em aberto.</li>
            <li>Alterar o status da O.S pelo painel do funcionário.</li>
        </ol>
    </td>
    <td>A ocorrência exibida no sistema aparece com o status sincronizado com a O.S.</td>
    <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OS-11 -->

<tr>
    <td><strong>CT-FUNC-OS-11 — Logout do Sistema</strong><br>RNF-02</td>
    <td>Verificar se o botão de logout encerra corretamente a sessão do usuário.</td>
    <td>Web / SessionStorage ativo</td>
    <td>
        <ol>
            <li>Clicar no botão “Logout”.</li>
        </ol>
    </td>
    <td>O usuário é redirecionado para o login, o SessionStorage é apagado e o dashboard não pode ser acessado pelo botão voltar.</td>
    <td>Anna Clara</td>
</tr>
</table>

### PLANO DE TESTES – MÓDULO Ocorrência (FUNCIONARIO) - SmartCondo

1. Identificação

| Item            | Descrição                       |
| --------------- | ------------------------------- |
| **Sistema**     | SmartCondo                      |
| **Módulo**      | Ocorrência - Perfil Funcionario |
| **Responsável** | ANNA CLARA                      |
| **Versão**      | 1.0                             |
| **Data**        | 21/11/2025                      |

---

2. Objetivo

-   Permitir que o funcionário registre novas ocorrências informando: título, categoria (Elétrica, Hidráulica, Limpeza ou Outro) e descrição.

-   Garantir que todos os campos obrigatórios sejam validados antes do envio da ocorrência.

-   Enviar a ocorrência registrada diretamente para o síndico, ficando disponível para análise e criação de OS.

-   Exibir todas as ocorrências pertencentes ao funcionário, divididas entre em aberto, em andamento e concluídas.

-   Exibir informações básicas das ocorrências na listagem: título, status e data de registro.

-   Permitir visualizar os detalhes completos de uma ocorrência, sem permitir edição após o envio.

-   Impedir qualquer alteração nas ocorrências registradas, permitindo apenas visualização, incluindo seu status.

-   Atualizar automaticamente o status das ocorrências conforme o funcionario altera uma ordem de serviço.

-   Validar que o botão de logout limpe o sessionStorage e redirecione para a tela de login.

-   Requisitos para execução dos testes:
-   Site publicado ou executado em ambiente local (Live Server).

-   Ordens de serviço armazenadas em smartcondo_ordensServico.

-   HTML contendo o formulário de ocorrência (#formOcorrencia, campos #titulo, #categoria, #descricao)

-   Usuário funcionario logado (sessionStorage.smartcondo_loggedInUser).

---

3. Ambiente de Teste

-   Ambiente: Localhost (Live Server) ou ambiente de homologação.

-   Navegador: Chrome (versão 140+), Firefox, Edge.

-   Banco de Dados: localStorage e sessionStorage com dados simulados

-   Arquivos: dashboard.html, index.js, script.js

---

4. Casos de Teste

<table>
 <tr>
  <th>Identificação</th>
  <th>Objetivo</th>
  <th>Ambiente de Teste</th>
  <th>Passos</th>
  <th>Critérios de Êxito</th>
  <th>Responsável</th>
 </tr>

 <!-- CT-FUNC-OC-01 -->

<tr>
  <td><strong>CT-FUNC-OC-01 — Registrar nova ocorrência</strong><br>RF-OC-01</td>
  <td>Validar se o funcionário consegue registrar uma nova ocorrência preenchendo todos os campos obrigatórios.</td>
  <td>Web / LocalStorage ativo (“smartcondo_ocorrencias”)</td>
  <td>
    <ol>
      <li>Acessar a aba “Ocorrências”.</li>
      <li>Preencher título, categoria e descrição.</li>
      <li>Clicar em “Enviar Ocorrência”.</li>
    </ol>
  </td>
  <td>A ocorrência é salva no LocalStorage e enviada para a caixa de recebimento do síndico.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-02 -->

<tr>
  <td><strong>CT-FUNC-OC-02 — Confirmação de envio de ocorrência</strong><br>RF-OC-01</td>
  <td>Validar se o sistema exibe uma mensagem de confirmação após o envio da ocorrência.</td>
  <td>Web / Funcionário logado / LocalStorage ativo</td>
  <td>
    <ol>
      <li>Acessar a aba de registro de ocorrências.</li>
      <li>Preencher os campos obrigatórios e enviar a ocorrência.</li>
    </ol>
  </td>
  <td>Uma mensagem informa ao funcionário que a ocorrência foi enviada com sucesso.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-03 -->

<tr>
  <td><strong>CT-FUNC-OC-03 — Validar campos obrigatórios</strong><br>RF-OC-02</td>
  <td>Garantir que a ocorrência não seja enviada caso falte título, categoria ou descrição.</td>
  <td>Web / Formulário de ocorrência</td>
  <td>
    <ol>
      <li>Tentar enviar o formulário de ocorrência deixando algum campo obrigatório vazio.</li>
    </ol>
  </td>
  <td>O sistema impede o envio e exibe a mensagem “preencha este campo”.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-04 -->

<tr>
  <td><strong>CT-FUNC-OC-04 — Exibir minhas ocorrências</strong><br>RF-OC-03</td>
  <td>Validar se o sistema exibe corretamente todas as ocorrências enviadas pelo funcionário logado.</td>
  <td>Web / LocalStorage ativo</td>
  <td>
    <ol>
      <li>Registrar uma ou mais ocorrências.</li>
      <li>Acessar a aba “Minhas Ocorrências”.</li>
    </ol>
  </td>
  <td>A listagem exibe todas as ocorrências do funcionário com título, status e data registrada.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-05 -->

<tr>
  <td><strong>CT-FUNC-OC-05 — Visualização básica das ocorrências</strong><br>RF-OC-03</td>
  <td>Validar se o funcionário consegue visualizar suas ocorrências no formato de cards com título, data e status.</td>
  <td>Web / LocalStorage com “smartcondo_ocorrencias”</td>
  <td>
    <ol>
      <li>Acessar a aba “Ocorrências”.</li>
    </ol>
  </td>
  <td>Os cards são exibidos com título, data e status, sem permitir edição ou abertura de detalhes.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-06 -->

<tr>
  <td><strong>CT-FUNC-OC-06 — Impedir edição de ocorrências</strong><br>RF-OC-04</td>
  <td>Validar que o funcionário não pode editar nenhuma ocorrência já enviada.</td>
  <td>Web / Ocorrências registradas</td>
  <td>
    <ol>
      <li>Acessar uma ocorrência já registrada.</li>
      <li>Tentar alterar qualquer campo exibido.</li>
    </ol>
  </td>
  <td>Todos os campos permanecem bloqueados, permitindo apenas visualização.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-07 -->

<tr>
  <td><strong>CT-FUNC-OC-07 — Sincronização de status com a OS</strong><br>RF-OC-05 / RF-OS-11</td>
  <td>Validar se alterações de status feitas na Ordem de Serviço atualizam automaticamente a ocorrência vinculada.</td>
  <td>Web / LocalStorage sincronizado</td>
  <td>
    <ol>
      <li>Acessar a aba “Ordem de Serviço”.</li>
      <li>Alterar o status de uma OS vinculada a uma ocorrência.</li>
      <li>Acessar a aba “Ocorrências”.</li>
    </ol>
  </td>
  <td>O status exibido em “Minhas Ocorrências” reflete a atualização feita na OS.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-OC-08 -->

<tr>
  <td><strong>CT-FUNC-OC-08 — Logout do sistema</strong><br>RNF-02</td>
  <td>Verificar se o logout encerra corretamente a sessão do funcionário.</td>
  <td>Web / SessionStorage</td>
  <td>
    <ol>
      <li>Clicar no botão “Logout”.</li>
    </ol>
  </td>
  <td>O SessionStorage é apagado e o usuário retorna para a tela de login.</td>
  <td>Anna Clara</td>
</tr>
</table>

### PLANO DE TESTES – MÓDULO COMUNICADOS (FUNCIONÁRIO) - SmartCondo

1. Identificação

| Item            | Descrição                        |
| --------------- | -------------------------------- |
| **Sistema**     | SmartCondo                       |
| **Módulo**      | Comunicados - Perfil Funcionário |
| **Responsável** | ANNA CLARA                       |
| **Versão**      | 1.0                              |
| **Data**        | 21/11/2025                       |

---

2. Objetivo

-   Enviar comunicados contendo título, categoria (Comunicado, Reserva, Segurança, Financeiro, Assembleia, Ocorrência, Evento, Mensagem) e descrição.

-   Encaminhar automaticamente o comunicado ao síndico assim que for enviado.

-   Listar todas as mensagens enviadas pelo funcionário.

-   Listar todas as mensagens recebidas.

-   Exibir corretamente as categorias correspondentes na listagem.

-   Garantir que os comunicados sejam salvos e carregados pelo LocalStorage.

-   Validar campos obrigatórios antes do envio (título, categoria e descrição).

-   Garantir que o funcionário só possa visualizar mensagens (sem editar ou excluir).

-   Mostrar claramente a origem das mensagens recebidas (ex: “de: Marcos de Souza”).

-   Organizar as listagens separando: Solicitações enviadas e Solicitações recebidas

-   Validar que o botão de logout limpe o sessionStorage e redirecione para a tela de login.

    ***

3. Ambiente de Teste

-   Ambiente: Localhost (Live Server) ou ambiente de homologação.

-   Navegador: Chrome (versão 140+), Firefox, Edge.

-   Banco de Dados: localStorage e sessionStorage com dados simulados

-   Funcionário logado no sistema (sessionStorage.smartcondo_loggedInUser).

-   Funcionários cadastrados no LocalStorage: smartcondo_employees

-   omunicados e mensagens armazenados em: smartcondo_notifications

-   Arquivos: dashboard.html, index.js, script.js, notifications.html

---

4. Casos de Teste

<table>
 <tr>
  <th>Identificação</th>
  <th>Objetivo</th>
  <th>Ambiente de Teste</th>
  <th>Passos</th>
  <th>Critérios de Êxito</th>
  <th>Responsável</th>
 </tr>

<!-- CT-FUNC-CO-01 -->

<tr>
  <td><strong>CT-FUNC-CO-01 — Enviar comunicado</strong><br>RF-CO-01</td>
  <td>Validar se o funcionário consegue enviar um comunicado preenchendo título, categoria e descrição.</td>
  <td>Web / Funcionário logado / LocalStorage com “smartcondo_notifications”</td>
  <td>
    <ol>
      <li>Acessar a aba Comunicados do funcionário.</li>
      <li>Preencher título, categoria e descrição.</li>
      <li>Clicar em “Enviar comunicado”.</li>
    </ol>
  </td>
  <td>O comunicado é enviado e aparece imediatamente na lista de “Mensagens enviadas”.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-02 -->

<tr>
  <td><strong>CT-FUNC-CO-02 — Validação de campos obrigatórios</strong><br>RF-CO-02</td>
  <td>Garantir que o sistema impeça o envio de comunicados sem título, categoria ou descrição.</td>
  <td>Web / Formulário de comunicados</td>
  <td>
    <ol>
      <li>Acessar a aba Comunicados.</li>
      <li>Tentar enviar o formulário vazio ou faltando algum campo.</li>
    </ol>
  </td>
  <td>O sistema exibe mensagem de erro e bloqueia o envio.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-03 -->

<tr>
  <td><strong>CT-FUNC-CO-03 — Encaminhamento automático ao síndico</strong><br>RF-CO-03</td>
  <td>Verificar se o comunicado enviado pelo funcionário vai automaticamente para a caixa do síndico.</td>
  <td>Web / LocalStorage sincronizado</td>
  <td>
    <ol>
      <li>Enviar um comunicado.</li>
      <li>Acessar o painel do síndico.</li>
    </ol>
  </td>
  <td>O comunicado aparece em “Solicitações recebidas” do síndico.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-04 -->

<tr>
  <td><strong>CT-FUNC-CO-04 — Listar comunicados enviados</strong><br>RF-CO-04</td>
  <td>Validar se todos os comunicados enviados aparecem na seção “Mensagens enviadas”.</td>
  <td>Web / LocalStorage com notificações salvas</td>
  <td>
    <ol>
      <li>Enviar um ou mais comunicados.</li>
      <li>Abrir a aba de mensagens enviadas.</li>
    </ol>
  </td>
  <td>A listagem exibe corretamente todos os comunicados enviados.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-05 -->

<tr>
  <td><strong>CT-FUNC-CO-05 — Listar comunicados recebidos</strong><br>RF-CO-05</td>
  <td>Verificar se comunicados enviados pelo síndico aparecem na aba “Mensagens recebidas”.</td>
  <td>Web / LocalStorage com notificações</td>
  <td>
    <ol>
      <li>Simular comunicado enviado pelo síndico.</li>
      <li>Acessar a seção de mensagens recebidas.</li>
    </ol>
  </td>
  <td>O comunicado aparece corretamente, incluindo remetente e categoria.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-06 -->

<tr>
  <td><strong>CT-FUNC-CO-06 — Exibição correta das categorias</strong><br>RF-CO-06</td>
  <td>Garantir que cada comunicado exiba o ícone correto conforme a categoria selecionada.</td>
  <td>Web / Lista de comunicados</td>
  <td>
    <ol>
      <li>Enviar comunicados com categorias diferentes.</li>
      <li>Verificar os ícones exibidos na listagem.</li>
    </ol>
  </td>
  <td>As categorias são exibidas com seus ícones correspondentes.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-07 -->

<tr>
  <td><strong>CT-FUNC-CO-07 — Persistência dos comunicados</strong><br>RNF-CO-01</td>
  <td>Validar se os comunicados permanecem visíveis após recarregar a página.</td>
  <td>Web / Reload da página</td>
  <td>
    <ol>
      <li>Enviar um comunicado.</li>
      <li>Recarregar a página.</li>
    </ol>
  </td>
  <td>O comunicado continua listado conforme armazenado no LocalStorage.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-08 -->

<tr>
  <td><strong>CT-FUNC-CO-08 — Marcar como lido</strong><br>RF-CO-07</td>
  <td>Verificar se o funcionário pode marcar mensagens recebidas como lidas.</td>
  <td>Web / LocalStorage</td>
  <td>
    <ol>
      <li>Abrir a aba de recebidas.</li>
      <li>Clicar em “Marcar como lida”.</li>
    </ol>
  </td>
  <td>O ícone muda para um check verde e o estado fica salvo no LocalStorage.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-09 -->

<tr>
  <td><strong>CT-FUNC-CO-09 — Restrições de edição</strong><br>RF-CO-08</td>
  <td>Confirmar que o funcionário não pode editar ou excluir comunicados.</td>
  <td>Web / Funcionário logado</td>
  <td>
    <ol>
      <li>Acessar qualquer comunicado enviado.</li>
      <li>Verificar as ações disponíveis.</li>
    </ol>
  </td>
  <td>Somente é possível visualizar; não há opções de edição ou exclusão.</td>
  <td>Anna Clara</td>
</tr>

<!-- CT-FUNC-CO-10 -->

<tr>
  <td><strong>CT-FUNC-CO-10 — Separação de mensagens</strong><br>RF-CO-09</td>
  <td>Validar a organização entre “Mensagens enviadas” e “Mensagens recebidas”.</td>
  <td>Web / Listas de comunicados</td>
  <td>
    <ol>
      <li>Enviar um comunicado.</li>
      <li>Receber um comunicado.</li>
      <li>Verificar cada aba.</li>
    </ol>
  </td>
  <td>Cada comunicado aparece corretamente na sua respectiva aba sem mistura.</td>
  <td>Anna Clara</td>
</tr>
</table>
