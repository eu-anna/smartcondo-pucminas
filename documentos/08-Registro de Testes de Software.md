# Registro de Testes de Software

Relatório com as evidências dos testes de software realizados na aplicação pela equipe, baseado no plano de testes pré-definido.

Os resultados dos testes funcionais realizados na aplicação são descritos a seguir. [Utilize a estrutura abaixo para cada caso de teste executado]

|Caso de Teste| Módulo de login:  CT-01 RFN-01  - Login do Síndico e CT- 10 Logout do sistema  | Responsável 
|:---|:---|:---|
| Resultados obtidos em 19.11: Vídeo 1 |Verificação das credenciais de login válidas para o síndico administrador da aplicação. Os dados de usuário do síndico são: email lidianer@gmail.com e senha 12345. O acesso do síndico é realizado com sucesso. O usuário é dirigido para a página “dashboard do síndico” tal como previsto. O sistema permite o encerramento da seção através do botão logout.As informações de login são armazenadas no local storage do browser como evidencia o vídeo.|Ana Paula|

https://github.com/user-attachments/assets/65f02165-663f-43a4-b844-339065fb2e84



|Caso de Teste| Módulo de Login:  CT-02 Não validação de credenciais incorretas RFN-01 e RFN-02 - Acceso - Login de usuário|Responsável
|:---|:---|:---|
|Resultados obtidos em 20.11: Vídeo 2|Para os dados de usuário do síndico que são: email lidianer@gmail.com e senha 12345. O sistema bloqueia o acesso quando credenciais incorretas são inseridas.|Ana Paula|


|Caso de Teste| Módulo de Login: CT-03 Campo de Senha obrigatório e CT-04 Campo de email obrigatório  RFN-01 e RFN-02 -- Acceso - Login de usuário  |Responsável 
|:---|:---|:---|
| Resultados obtidos em 20.11: Vídeo 2|O sistema não realiza o acesso quando um dos campos (email OU senha) não é preenchido. | Ana Paula|


|Caso de Teste| Módulo de Login: CT-05 Opção lembrar email funcional RFN-02 Acceso - Login de usuário |Responsável
|:---|:---|:---|
| Resultados obtidos em 20.11: Vídeo 2|Ao inserir as credenciais de acesso, o usuário pode marcar a opção  “Lembrar email”. Ao sair do sistema  o campo de email e senha permanecem preenchidos em visitas futuras. |Ana Paula|

https://github.com/user-attachments/assets/0899e1f8-2154-47ae-b0f5-5718881d8693


|Caso de Teste|Módulo de Login: CT-06 Redicerionamento por tipo de usuário RFN-02  RFN- 15 RNF- 16 E Módulo Visão Geral do Síndico: CT-01 Exibir nome e cargo do usuário logado |Responsável
|:---|:---|:---|
| Resultados obtidos em 21.11: Vídeo 3|Ao realizar acesso com usuário e senha, o sistema redireciona corretamente conforme o tipo de usuário (síndico, morador ou funcionário). O síndico usuário lidianer@gmail.com é direcionado para a página dashboard-sindico.html.O nome "Lidiane" e o cargo "síndico" é exibido na parte superior à direita da página. O morador usuário  morador1@gmail.com. é direcionado para a página home-resident.html.O nome "Morador1" e o cargo "morador" é exibido na parte superior à direita da página O funcionário usuário funcionario1@gmail.com é direcionado para a página home-employee.html. O nome "Funcionário1" e o cargo "porteiro" é exibido na parte superior à direita da página|Ana Paula|

https://github.com/user-attachments/assets/a67c546a-4b4c-479a-b107-3b16553bc0ce

|Caso de Teste|Módulo de Comunicados (síndico): CT-02 Envio de Comunicados pelo Síndico, CT-04 Persistência de comunicados, CT-05 Identificação do destinatário, CT-06 Feedback visual, RFN-01, RnF-03, RFN-31 RF-33 |Responsável
|:---|:---|:---|
| Resultados obtidos em 21.11: Vídeo 4 |O usuário síndico consegue enviar comunicados para todos os usuários ou para um usuário específico com sucesso. O seletor exibe os diferentes tipos de usuários (morador ou funcionário) formatados (nome capitalizado) e corretamente agrupados por tipo, permitindo o direcionamento de comunicados por tipo de usuário. O sistema exibe feedback visual durante e após o envio do comunicado. O conteúdo do comunicado persiste no armazenamento local do browser mesmo após recarregamento da página.|Ana Paula|

https://github.com/user-attachments/assets/dec75251-b225-4b12-a5f4-ab97eca62500

|Caso de Teste|Módulo de Comunicados (síndico): CT-01 Visibilidade de Comunicados, CT-03 Envio de mensagem por morador ou funcionário, CT-05 Restrição de visualização por funcionário, CT-08 Encapsulamento de mensagens por ID, RFN-30, RFN-32, RFN-34 RF-35 |Responsável
|:---|:---|:---|
| Resultados obtidos em 21.11: Vídeo 5 |Cada usuário visualiza apenas os comunicados permitidos para sua permissão. Mensagens direcionadas a usuários específicos aparecem apenas para o destinatário escolhido pelo autor do cumunicado. Funcionários NÃO visualizam mensagens destinadas a moradores e vice-versa. Moradores e funcionários apenas podem enviar mensagens para o síndico.|Ana Paula|

https://github.com/user-attachments/assets/0c1275d6-0336-4265-8b79-5a451e619aa1


|Caso de Teste|Módulo de reservas de áreas comuns (morador): CT-01 Exibir calendário de reservas RF-13, CT-02 Criar nova reserva RF-02, CT-03 Impedir Reserva duplicada RF-02, CT-06 Filtrar reservas por mês RF-13,  CT-07 Feedback visual e carregamento RF-01 e RF -02, CT-08 Persistência de Reservas RF-02 RNF- 03 |Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 6 |Realizado login como usuário morador ( Morador2, ao clicar no botão reservas e escolher o espaço desejado, o calendário exibe corretamente o mês atual e os dias disponíveis para reserva dos locais disponíveis. O sistema impede a reserva de um espaço que já tenha sido reservado na mesma hora e local. Após inserção de dados, a reserva é salva no armazenamento local do browser como evidenciado no vídeo. O sistema exibe feedback visual da ação do usuário quando o salvamento da reserva é finalizado. O filtro de meses exibe corretamente as reservas pendentes. As reservas continuam salvas no armazenamento local após recarregamento da página.|Ana Paula|

https://github.com/user-attachments/assets/5efaefde-6bc4-4863-927b-96c63806fbd8


|Caso de Teste|Módulo principal do síndico: CT-02 Exibir quantidade de moradores, CT-03 Exibir quantidade de funcionários, CT-04 Exibir apenas solicitações abertas, CT-05 Exibir apenas reservar pendentes, CT- 06 Exibir últimos comunicados, CT-07 Exibir últimas reservas CT- 08 Unificação de reservas CT-09 Funcionamento do menu flutuante CT-10 Logout do sistema|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 7 |Realizado login como usuário síndico (usuário lidianer@gmail.com), o sistema exibe quantidades corretas de moradores e funcionários conforme mostrado no armazenamento local do browser. O sistema exibe corretamente reservas pendentes e últimos comunicados. O sistema deixa de exibir reservas depois que elas são aceitas ou rejeitadas.  O sistema exibe um gestionário de reservas exibindo o status de cada uma após a ação do síndico. O menu flutuante está funcional. O logout do sistema é realizado com sucesso.|Ana Paula|

https://github.com/user-attachments/assets/534d98b3-c292-4ace-9fff-6846f2517695


|Caso de Teste|Módulo de ocorrências (síndico): CT-OC-03 — Ausência de Ocorrências RF-03|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 8 |Realizado login como usuário síndico (usuário lidianer@gmail.com), o sistema exibe quantidades ocorrências contendo 0 ocorrências abertas e uma ocorrência concluída. As informações são confirmadas conforme mostrado no armazenamento local do browser.|Ana Paula|

https://github.com/user-attachments/assets/085f18b4-52df-4c75-89a5-0ff35c1e9327


|Caso de Teste|Módulo de ocorrências (síndico): CT-OC-01 — Listagem de Ocorrências RF-03, CT-OC-02 — Ordem de Exibição (mais recentes primeiro) RF-03, CT-OC-03 — Ausência de Ocorrências RF-03 , CT-OC-04 — Filtro por ID, Título, Categoria e Status RF-03 , CT-OC-05 — Pesquisa Sem Resultados RF-03, CT-OC-06 — Cards de Resumo por Status RF-03 CT-OC-07 — Abertura do Modal de Detalhes, RF-03 CT-OC-08 — Regra de Visibilidade do Botão “Abrir O.S.” RF-03 , , CT-OC-10 — Salvamento de Status e Prioridade RF-03, CT-OC-11 — Prioridade Obrigatória ao Salvar, CT-OC-12 — Regras para Abrir O.S. a partir da Ocorrência, RF-03, RF-10, RF-14 CT-OC-13 — Persistência dos Dados após Recarregar, RF-03|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 9 |Após o teste de ausência de ocorrências em aberto, foram criadas diversas ocorrências usando perfis de usuário de moradores (Morador1 e Morador2) e funcionário (Funcionario1 e Funcionário2). Após o login do usuário síndico ( lidianer@gmail.com), o sistema exibe as novas ocorrências criadas em ordem cronológica. A tela principal exibe a quantidade de ocorrências da seguinte forma: “abertas”, “em andamento”, “em execução”, “concluídas”. Verifica-se a exibição da quantidade correta de ocorrências em aberto conforme dados do armazenamento local do browser. O sistema de pesquisa de ocorrências classificadas por categoria é funcional. A pesquisa por uma categoria de ocorrências x, retorna ocorrências classificadas na referida categoria. A pesquisa por uma categoria inexistente não retorna resultado. O modal de visualização individual por ocorrência é funcional. O modal permite a alteração do status da ocorrência e sua classificação em função de prioridade.  A alteração do status da ocorrência pelo usuário altera a exibição da quantidade de ocorrências na tela principal em função da classificação de andamento definida pelo usuário. O sistema não permite alteração do status sem definição de prioridade. |Ana Paula|

https://github.com/user-attachments/assets/fb57c4db-59bc-416a-866b-e9720222c23a

|Caso de Teste|Módulo de ocorrências (síndico): CT-OC-09 — Atualização Dinâmica do Botão “Abrir O.S.” e  CT-OC-12 — Regras para Abrir O.S. a partir da Ocorrência, RF-03, RF-10, RF-14 Módulo de ocorrências (síndico) : CT-OS-13 — Criação de O.S. a partir de Ocorrência RF-03|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 10 | O sistema permite ao usuário síndico criar uma ordem de serviço a partir de uma ocorrência. A criação de uma ordem de serviço a partir de uma ocorrência só é possível se a ocorrência estiver com o status “aberta”. Ao selecionar uma ocorrência com o status “em execução” o modal de visualização permite a alteração do “status atual” para “aberta”. Ao realizar a mudança de status, o sistema exibe então a opção “Abrir O.S” (abrir ordem de serviço). Ao clicar no botão " Abrir O.S., uma ordem de serviço é criada sob o número de 2025-OS-02 e atribuída ao “Funcionario1”.  O sistema oferece feedback do sucesso da ação e a ordem de serviço criada é exibida na tela principal. Ao realizar o login como “Funcionário1” a ordem de serviço é exibida na tela principal do usuário ao qual ela foi atribuída pelo usuário autor. Módulo totalmente funcional.|Ana Paula|

https://github.com/user-attachments/assets/8742c7e4-b317-49f9-8451-c11488591e74

|Caso de Teste|Módulo de ocorrências (síndico) e módulo de ordens de serviço (síndico): CT-OC-13 — Persistência dos dados de reservas após Recarregar RF-03 CT-OS-18 — Persistência das ordens de serviço após Recarregar|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 11 | Após a realização dos testes dos módulos de ocorrências e dos módulos de ordens de serviço do síndico, é possível constatar que as ocorrências e as ordens de serviço criadas permanecem salvas no armazenamento local do browser mesmo após recarregamento da página.|Ana Paula|

https://github.com/user-attachments/assets/bef31c32-a555-480c-b653-d725fb1ba199

|Caso de Teste|Módulo de ordens de serviço (síndico): Listagem de Ordens de Serviço RF-03, CT-OS-02 — Ordem de Exibição com Paginação RF-03, CT-OS-04 — Ausência de Ordens de Serviço, , CT-OS-07 — Normalização de Status e Classe Visual RF-14, CT-OS-08 — Carregamento de Responsáveis, CT-OS-09 — Comportamento sem Funcionários Cadastrados, CT-OS-10 — Validação de Campos Obrigatórios ao Criar O.S. CT-OS-11 — Validação da Data Sugerida (não pode ser passada), CT-OS-12 — Criação de Nova O.S. Manual, CT-OS-14 — Visualização de Detalhes da O.S. (Modal Ver), CT-OS-15 — Edição de Ordem de Serviço, CT-OS-16 — Bloqueio de Edição para O.S. Concluída, CT-OS-17 — Conclusão de Ordem de Serviço |Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 12 | Após limpeza do armazenamento local, realizamos login como usuário síndico (lidianer@gmail.com). A tela principal indica ausência de ordens de serviço o que é confirmado pelo armazenamento local do browser. Realiza-se o cadastro de um novo funcionário (Funcionario1). Ao clicar em “ordem de serviço”, e depois “abrir ordem de serviço”, o sistema exibe um modal que permite a criação de “ordens de serviço”. O sistema permite a criação de novas ordens de serviço. O sistema exibe corretamente uma listagem das ordens de serviço criadas. O sistema permite a criação de ordens de serviço destinadas a um funcionário específico. Ordens de serviço só podem ser atribuídas a usuários classificados como “funcionário”. O sistema exibe adequadamente os usuários (funcionários) a quem é possível atribuir uma ordem de serviço, inclusive o funcionário recém criado.  O sistema permite visualização de detalhes da ordem de serviço. O sistema não permite a criação de ordens de serviço em datas passadas e sem descrição de prioridade. O sistema permite a alteração de ordens de serviço não concluídas – “em aberto”. O sistema permite a conclusão de uma ordem de serviço. O sistema não permite a edição de uma ordem de serviço previamente marcada como “concluída”.|Ana Paula|

https://github.com/user-attachments/assets/c68416ab-4808-4c49-8498-dd5c0e062fa2

|Caso de Teste|Módulo de ordens de serviço (síndico): CT-OS-03 — Paginação Responsiva (Desktop x Mobile), CT-OS-05 — Filtro de O.S. por Número, Título, Categoria, Responsável e Status, CT-OS-05 — Filtro de O.S. por Número, Título, Categoria, Responsável e Status, CT-OS-06 — Pesquisa Sem Resultados|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 13 | O sistema exibe paginação responsiva. O sistema permite o filtro de ordens de serviço por número, título e categoria, responsável e status. A pesquisa por um termo inexistente retorna sem resultados.|Ana Paula|


https://github.com/user-attachments/assets/d2d7a8d0-194c-415e-a212-ac4a0169ddfc



|Caso de Teste|Módulo de gestão de reservas (síndico): CT-RES-01 — Inicialização das chaves de reservas RF-02, CT-RES-02 — Carregamento único das reservas estáticas  RF-02, CT-RES-03 — Unificação de reservas estáticas e dinâmicas sem duplicidade RF-02, CT-RES-04 — Listagem de reservas pendentes em cards RF-02, CT-RES-05 — Alerta de conflito de horário RF-02, CT-RES-06 — Formatação de período e datas, CT-RES-07 — Aprovação de reserva (botão Aceitar) RF-02, RF-03, CT-RES-08 — Recusa de reserva (botão Recusar)RF-02, RF-03, CT-RES-09 — Registro de avaliador e data/hora da decisão RF-02, RF-03, CT-RES-10 — Listagem de histórico de decisões RF-02, CT-RES-11 — Paginação das reservas pendentes RF-02, CT-RES-12 — Paginação do histórico de resultados RF-02, CT-RES-13 — Filtro de pesquisa aplicado a pendentes e histórico RF-02, CT-RES-14 — Pesquisa sem resultados RF-02, CT-RES-15 — Persistência após recarregar a página RF-02|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 14|Ao realizar login como usuário síndico ( lidianer@gmail.com) o sistema exibe na tela principal as reservas de moradores pendentes de autorização. Ao clicar em “ver todas as reservas” o sistema exibe o gestionário de reservas. Nessa página, o usuário pode aceitar ou recusar uma reserva feita por um usuário morador. O sistema permite aceitar ou recusar reservas feitas por moradores. Após recusar ou aceitar uma reserva, o sistema muda o status da mesma para “recusado” ou “aprovado” na tela principal, conforme a decisão do usuário síndico. O sistema não permite conflitos de reservas entre moradores. O sistema exibe um histórico das reservas já tratadas pelo usuário. O sistema possui um filtro de pesquisas funcional que permite a pesquisa de reservas por local e autor. Uma pesquisa por um termo que não designa um local ou autor retorna sem resultados. As reservas permanecem salvas no sistema no armazenamento local do browser após atualização da página.|Ana Paula|


https://github.com/user-attachments/assets/c173ac8d-34c6-479f-9195-5a34eedb784c



|Caso de Teste|Módulo ordem de serviço (funcionário):CT-FUNC-OS-01 — Identificação do usuário logado RNF-02,  CT-FUNC-OS-02 — Listar Ordens de Serviço do funcionário RF-10,  CT-FUNC-OS-03 — Persistência do status da OS RF-11,  CT-FUNC-OS-04 — Exibir status padronizado RF-10,  CT-FUNC-OS-05 — Visualizar detalhes da O.S RF-10,  CT-FUNC-OS-06 — Editar O.S em andamento RF-11,  CT-FUNC-OS-07 — Impedir edição de O.S concluída RF-11,  CT-FUNC-OS-08 — Impedir edição total da O.S pelo funcionário RF-10,  CT-FUNC-OS-09 — Concluir Ordem de Serviço RF-11,  CT-FUNC-OS-10 — Atualização automática do status da ocorrência RF-06 / RF-11,  CT-FUNC-OS-11 — Logout do Sistema RNF-02|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 16| Ao realizar login como usuário funcionario (teste1@gmail.com) o sistema exibe a dashboard do funcionário. O sistema mostra corretamente nome, função e foto do usuário a partir do (smartcondo_employees). A listagem exibe apenas as O.S do funcionário logado. O status das O.S permanece atualizado conforme o (smartcondo_ocorrencias). Os status exibidos são: Aberta, Em andamento, Concluída. O modal mostra: número, título, prioridade, data sugerida, categoria, descrição e ocorrência vinculada. A O.S é atualizada corretamente no (smartcondo_ocorrencias). Todos os campos aparecem bloqueados, apenas para visualização. As ações de status disponíveis são: iniciar, concluir e voltar. Ao concluir a O.S, o status muda para “Concluída” e a ocorrência vinculada também é atualizada. A ocorrência no sistema fica com o status sincronizado com a O.S. Ao sair, o usuário é redirecionado ao login, o SessionStorage é apagado e o dashboard não pode ser acessado pelo botão voltar.|Anna Clara|


https://github.com/user-attachments/assets/83a71579-5cc2-47e1-a0f4-be5aa38d5007



|Caso de Teste|Módulo de ocorrência (funcionário):CT-FUNC-OC-01 — Registrar nova ocorrência RF-OC-01,  CT-FUNC-OC-02 — Confirmação de envio de ocorrência RF-OC-01,  CT-FUNC-OC-03 — Validar campos obrigatório RF-OC-02,  CT-FUNC-OC-04 — Exibir minhas ocorrências RF-OC-03,  CT-FUNC-OC-05 — Visualização básica das ocorrências RF-OC-03,  CT-FUNC-OC-06 — Impedir edição de ocorrências RF-OC-04,  CT-FUNC-OC-07 — Sincronização de status com a OS RF-OC-05 / RF-OS-11,  CT-FUNC-OC-08 — Logout do sistema RNF-02|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 17| A ocorrência é salva no (smartcondo_ocorrencias) e enviada para a caixa de recebimento do síndico. O funcionário recebe uma mensagem de sucesso ao enviar a ocorrência. Se houver campos vazios, o sistema impede o envio e mostra “preencha este campo”. A listagem mostra todas as ocorrências do funcionário, incluindo título, status e data registrada. Os cards exibem título, data e status, sem permitir edição ou visualização detalhada, todos os campos ficam bloqueados, permitindo somente visualizar. O status exibido em “Minhas Ocorrências” corresponde ao status atualizado na OS. Ao sair, o SessionStorage é apagado e o usuário é redirecionado para o login.|Anna Clara|


https://github.com/user-attachments/assets/61deb67b-9882-47e0-bc3a-765a9f7775b0



|Caso de Teste|Módulo de comunicados (funcionário):CT-FUNC-CO-01 — Enviar comunicado RF-CO-01,  CT-FUNC-CO-02 — Validação de campos obrigatórios RF-CO-02,  CT-FUNC-CO-03 — Encaminhamento automático ao síndico RF-CO-03,  CT-FUNC-CO-04 — Listar comunicados enviados RF-CO-04,  CT-FUNC-CO-05 — Listar comunicados recebidos RF-CO-05,  CT-FUNC-CO-06 — Exibição correta das categorias RF-CO-06,  CT-FUNC-CO-07 — Persistência dos comunicados RNF-CO-01,  CT-FUNC-CO-08 — Marcar como lido RF-CO-07,  CT-FUNC-CO-09 — Restrições de edição RF-CO-08,  CT-FUNC-CO-10 — Separação de mensagens RF-CO-09|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 18| O comunicado é enviado e aparece imediatamente na aba “Mensagens enviadas”. Em caso de erro, o sistema bloqueia o envio e exibe uma mensagem de erro. O síndico recebe o comunicado na aba “Solicitações recebidas”. A listagem exibe todos os comunicados enviados corretamente. Cada comunicado mostra remetente, categoria e informações completas. As categorias são exibidas com seus ícones correspondentes. O comunicado permanece salvo no LocalStorage, sem alterações. Após marcado como lido, o ícone muda para um check verde e o estado é salvo no LocalStorage. O usuário só pode visualizar — não existe opção de editar ou excluir. Cada comunicado aparece na aba correta, sem misturar categorias ou remetentes.|Anna Clara|


https://github.com/user-attachments/assets/0cd80694-7800-481f-b6a2-799e2e2433bf



|Caso de Teste|Módulo de ocorrência (morador): CT-MOR-OC-01 — Registro de nova ocorrência RF-06,  CT-MOR-OC-02 — Validação de campos obrigatórios RF-06,  CT-MOR-OC-03 — Geração de ID incremental RF-06,  CT-MOR-OC-04 — Geração de protocolo diário RF-06,  CT-MOR-OC-05 — Vínculo com usuário logado RF-06,  CT-MOR-OC-06 — Listagem apenas das ocorrências do morador RF-06,  CT-MOR-OC-07 — Ordenação das ocorrências por data de criação RF-06,  CT-MOR-OC-08 — Mensagem quando não há ocorrências RF-06,  CT-MOR-OC-09 — Paginação em desktop e mobile RF-06,  CT-MOR-OC-10 — Normalização de status e classes visuais,  CT-MOR-OC-11 — Exibição de datas de criação e resolução RF-06,  CT-MOR-OC-12 — Exclusão de ocorrência RF-06,  CT-MOR-OC-13 — Cancelar exclusão de ocorrência RF-06,  CT-MOR-OC-14 — Identificação do usuário logado no cabeçalho|Responsável
|:---|:---|:---|
| Resultados obtidos em 23.11: Vídeo 15| Ao realizar login como usuário morador (marcos@gmail.com) e (vinicius@gmail.com) o sistema exibe na aba de ocorrências, as ocorrências enviadas pelo morador e o local de registrar ocorrências. O morador pode registrar nova ocorrência preenchendo os campos de Título, Categoria e Descrição, a ocorrência é registrada em (smartcondo_ocorrencias) contendo status “Aberta”, id gerado, protocolo gerado, dados do solicitante. Se algum campo estiver vazio, o sistema exibe (Preencha todos os campo) e não envia. Ao limpar as chaves (smartcondo_ocorrencias) e (smartcondo_ocorrencias_lastId) e registrar outras duas novas ocorrências elas recebem id = "01", a segunda id = "02", e assim sucessivamente. Ao registrar ocorrências em dias diferentes elas seguiram o protocolo: No dia D1, os protocolos vão aumentando (AAAAMMDD-001, AAAAMMDD-002), quando chega o dia D2, a contagem zera e começa de novo em (AAAAMMDD-001), conforme lógica da chave smartcondo_ocorrencias_protocolo. Cada ocorrência fica registrada com (authorId) e (authorName) conforme o morador que estiver logado na hora do registro. além do nome/sobrenome e apartamento. A listagem mostra só as ocorrências do morador logado, as de outros não são exibidas. Os cards são exibidos da ocorrência mais recente para a mais antiga. Se o morador não tiver ocorrências, aparece a mensagem (Você ainda não registrou nenhuma ocorrência). Em Desktop (> 700px): até 6 ocorrências por página, mobile (≤ 700px): até 4 ocorrências por página, a paginação mostra “Página X de Y” com botões Anterior / Próximo. Cada card mostra o status já normalizado (Aberta, Em andamento, Em execução, Concluída). Datas são exibidas no formato dd/mm/aaaa hh:mm. Ao confirmar a exclusão, a ocorrência é removida da tela e do LocalStorage, se cancelar nada é alterado. O cabeçalho exibe: “Nome, Morador” no elemento #usuarioLogado.|Anna Clara|


https://github.com/user-attachments/assets/712f86fd-dd4b-4e3a-97a4-f84b1b3b58fe


