# Programação de Funcionalidades

<span style="color:red">Pré-requisitos:
<a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/02-Especifica%C3%A7%C3%A3o%20do%20Projeto.md"> Especificação do Projeto</a></span>,
<a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/03-Metodologia.md"> Metodologia</a>,
<a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/04-Projeto%20de%20Interface.md"> Projeto de Interface</a>,

### Tela de Login(RNF-02)

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/telaLogin.png">

#### Requisito atendido

-   RNF‑02: O sistema deve garantir autenticação de usuários por login e senha, protegendo dados pessoais e financeiros.

#### Artefatos da funcionalidade

-   login.css
-   index.js
-   loader.js

#### Instruções de acesso

**Credenciais de Acesso**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte o URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/login/login.html

#### Responsável

-   html - Vitor Machado
-   js - Vinicius Oliveira e Ana Paula

## Perfil de usuário SÍNDICO

### Home síndico - síndico (RF-15)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-15.png">

#### Requisito atendido

RF-15: O sistema deve exibir na tela principal do perfil do síndico os comunicados ou solicitações enviadas por moradores e funcionários.

#### Artefatos da funcionalidade

-   dashboard-sindico.html
-   dashboard-sindico.css
-   dashboard-syndic-overview.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico.html

#### Responsável

-   Vítor Machado Coelho

### Tela de visualização de cadastro - Morador (RF-16)

   <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/visualizarMorador.png">

#### Requisito atendido

-   RF‑16: O sistema deve permitir que o síndico visualize o cadastro de todos os funcionários e moradores.

#### Artefatos da funcionalidade

-   dashboard-sindico-morador.html
-   dashboard-sindico-morador.css
-   layoutNavbar.css
-   dashboard-sindico-morador.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte o URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico-morador.html

#### Responsável

-   Vítor Machado Coelho

### Tela de Cadastro - Morador (RF-04)

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/cadastroMorador.png">

#### Requisito atendido

-   RF:04: O sistema deve permitir que o síndico registre novos usuários do sistema (moradores ou prestadores de serviço).

#### Artefatos da funcionalidade

-   dashboard-sindico-morador.html
-   dashboard-sindico-morador.css
-   layoutNavbar.css
-   dashboard-sindico-morador.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte o URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico-morador.html

**Atenção:** As credenciais de acesso do morador cadastrado são por padrão EMAIL e SENHA.

#### Responsável

-   Vítor Machado Coelho

### Tela de visualização de cadastro - Funcionário (RF-16)

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/visualizarFuncionarios.png">

#### Requisito atendido

-   RF‑16: O sistema deve permitir que o síndico visualize o cadastro de todos os funcionários e moradores.

#### Artefatos da funcionalidade

-   dashboard-sindico-morador.html
-   dashboard-sindico-morador.css
-   layoutNavbar.css
-   dashboard-sindico-morador.js

#### Estrutura de Dados

{
"id": "1f99305810504fca8d57588ec576d2dd",
"name": "João Paulo Silva",
"cpf": "56789753079",
"startTime": "10:00",
"endTime": "22:00",
"position": "Porteiro",
"contact": "31911112222",
"email": "teste@gmail.com"
}

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte o URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/employee/employee.html

#### Responsável

-   Vinicius Oliveira da Silva

### Tela de Cadastro - Funcionário (RF-04)

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/cadastroFuncionarios.png">

#### Requisito atendido

-   RF:04: O sistema deve permitir que o síndico registre novos usuários do sistema (moradores ou prestadores de serviço).

#### Artefatos da funcionalidade

-   employee.html
-   global.css
-   dashboard-sindico-morador.css
-   style.css
-   modal/style.css
-   index.js
-   layoutNavbar/index.js
-   layoutBottomNav.js
-   layoutHeader.js
-   loader.js

#### Estrutura de Dados

{
"id": "1f99305810504fca8d57588ec576d2dd",
"name": "João Paulo Silva",
"cpf": "56789753079",
"startTime": "10:00",
"endTime": "22:00",
"position": "Porteiro",
"contact": "31911112222",
"email": "teste@gmail.com"
}

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte o URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/employee/employee.html

#### Responsável

-   Vinicius Oliveira da Silva

### Tela de comunicados - síndico (RF-01)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-01.png">

#### Requisito atendido

RF-01: O sistema deve permitir que o síndico publique comunicados visíveis para todos os moradores.

#### Artefatos da funcionalidade

-   communicattes.html
-   style.css
-   index.js
-   layoutNavbar.css

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/communicates/communicates.html

#### Responsável

-   Vinicius Oliveira da Silva

### Tela de ocorrências - síndico (RF-03)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-03.png">

#### Requisito atendido

RF-03: O sistema deve permitir que o síndico acompanhe solicitações feitas por moradores.

#### Artefatos da funcionalidade

-   dashboard-sindico-occurrence.html
-   dashboard-syndic-occurrence.js
-   dashboard-sindico-ocurrence.css
-   layoutNavbar.css

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico-occurrence.html

#### Responsável

-   Vítor Machado Coelho
-   Arthur Rocha Lemes

### Tela de gestão de reservas - síndico (RF-02)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-02.png">

#### Requisito atendido

RF-04: O sistema deve permitir que o síndico gerencie reservas das áreas comuns, controlando disponibilidade e horários.

#### Artefatos da funcionalidade

-   dashboard-sindico-gestao.html
-   dashboard-gestao-reserva.css
-   layoutNavbar.css
-   dashboard-gestao-reserva.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico-gestao.html

#### Responsável

-   Vítor Machado Coelho

### Tela de Reservas - síndico (RF-02)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/reservas.png">

#### Requisito atendido

RF-04: O sistema deve permitir que o síndico gerencie reservas das áreas comuns, controlando disponibilidade e horários.

#### Artefatos da funcionalidade

-   reservation.html
-   style.css
-   layoutNavbar.css
-   index.js
-   JS

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**email:** lidianer@gmail.com
**senha:** 12345

-   Cada usuário pode visualizar apenas as suas reservas
-   Reservas de outros usuários com status de "approved" ou "pending" ficam bloqueados não sendo possível nenhuma ação sobre elas;
-   É possível selecionar, local, data, horário (caso horário não seja fornecido será usado o padrão inicio 10:00 saída as 22:00);

*   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/reservation/reservation.html

#### Responsável

-   Vinicius Oliveira

## Perfil de usuário MORADOR

### Home - morador (RF-07)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-07.png">

#### Requisito atendido

RF-07: O sistema deve exibir na tela principal do perfil do morador os comunicados enviados pelo síndico sempre que o morador fizer login.

#### Artefatos da funcionalidade

-   index.html
-   index.js
-   style.css

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO COMO UM MORADOR JÀ CADASTRADO PARA ACESSAR A PÁGINA**
**usuário:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/resident/home/index.html

#### Responsável

-   Vinicius Oliveira

### Tela de comunicados - morador (RF-01, RF-15)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/comunicadosMorador.png">

#### Requisito atendido

RF-01: O sistema deve permitir que o síndico publique comunicados visíveis para todos os moradores.
RF-15: O sistema deve exibir na tela principal do perfil do síndico os comunicados ou solicitações enviadas por moradores e funcionários.

#### Artefatos da funcionalidade

-   communicattes.html
-   style.css
-   index.js
-   layoutNavbar.css

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**Crie um novo morador no perfil do seguinte, clique em "SAIR" e faça login com os dados:**
**email:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/communicates/communicates.html

#### Responsável

-   Vinicius Oliveira da Silva

### Tela de Reservas - morador (RF-02)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/reservas.png">

#### Requisito atendido

RF-04: O sistema deve permitir que o síndico gerencie reservas das áreas comuns, controlando disponibilidade e horários.

#### Artefatos da funcionalidade

-   reservation.html
-   style.css
-   layoutNavbar.css
-   index.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**Crie um novo morador fazendo login como sindico, acessando a pagina de morador e "Adicionar", por padrão e login desse novo cadastro será:**
**email:** email
**senha:** cpf

-   Cada usuário pode visualizar apenas as suas reservas
-   Reservas de outros usuários com status de "approved" ou "pending" ficam bloqueados não sendo possível nenhuma ação sobre elas;
-   É possível selecionar, local, data, horário (caso horário não seja fornecido será usado o padrão inicio 10:00 saída as 22:00);

*   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/reservation/reservation.html

#### Responsável

-   Vinicius Oliveira

### Tela de ocorrências - morador (RF-06)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-06.png">

#### Requisito atendido

RF-06: O sistema deve permitir que o morador registre ocorrências (ex.: barulho, manutenção, obras).

#### Artefatos da funcionalidade

-   occurrence.html
-   index.js
-   style.css
-   render.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**Crie um novo morador fazendo login como sindico, acessando a pagina de morador e "Adicionar", por padrão e login desse novo cadastro será:**
**email:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/resident/occurrence/occurrence.html

#### Responsável

-   Vítor Machado Coelho

## Perfil de usuário FUNCIONÁRIO

### Funcionarios Receberem Ordem de serviços - Sindíco (RF-10)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-10.png">

#### Requisto atendido:

RF-10: O sistema deve permitir que funcionários recebam ordens de serviço.

#### Artefato da funcionalidade:

-   dashbboard.html
-   style.css
-   index.js

#### Instruções de acesso:

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**Crie um novo FUNCIONÁRIO; faça login como sindico, acesse a pagina de funcionários e "Adicionar Novo", por padrão e login desse novo cadastro será:**
**email:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/dashboard/dashboard-sindico-ordem-servico.html

#### Responsável:

-   Anna Clara dos Santos
-   Vítor Machado Coelho

#### Conclusão ordem de serviços - funcionários (RF-11)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-11.png">

#### Requisto atendido

RF-11: O sistema deve permitir que funcionários informem a conclusão de uma ordem de serviço.

#### Artefato da funcionalidade:

-   dashbboard.html
-   style.css
-   index.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO PARA ACESSAR A PÁGINA**
**Crie um novo FUNCIONÁRIO, faça login como sindico, acesse a pagina de funcionários e "Adicionar Novo", por padrão e login desse novo cadastro será:**
**email:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/employee/dashboard.html

#### Responsável

-   Anna Clara dos Santos
-   Vítor Machado Coelho

### Tela de ocorrências - funcionários (RF-12)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-12.png">

#### Requisto atendido

RF-12: O sistema deve permitir que funcionários comuniquem problemas (ex.: defeitos, manutenção necessária) ao síndico.

#### Artefatos da funcionalidade

-   dashbboard.html
-   style.css
-   index.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO COMO UM FUNCIONÁRIO JÀ CADASTRADO PARA ACESSAR A PÁGINA**
**usuário:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/employee/dashboard.html

#### Responsável

-   Vítor Machado Coelho
-   Anna

### Classificação de Ações (Comunicados e Tarefas=Ocorrências) (RF-14)

<img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/blob/main/documentos/img/RF-14.png">

#### Requisto atendido

RF-14: O sistema deve ter uma classificação de ações (comunicado e tarefas) - Síndico e Funcionário.

#### Artefatos da funcionalidade

-   dashbboard.html
-   style.css
-   index.js

#### Instruções de acesso

**É NECESSÁRIO ESTAR AUTENTICADO COMO UM FUNCIONÁRIO E SÍNDICO JÀ CADASTRADO PARA ACESSAR A PÁGINA**
**usuário:** email
**senha:** cpf

-   Abra um navegador de internet e informe o seguinte URL: https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/syndic/communicates/communicates.html e https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/codigo-fonte/src/pages/employee/dashboard.html

#### Responsável

-   Vinicius Oliveira - Comunicados (sindico, morador, funcionários)
-   Vítor Machado Coelho - Ocorrencia, O.s (sindico, morador)
-   Anna Clara dos Santos - Ocorrencia, O.s (funcionários)
