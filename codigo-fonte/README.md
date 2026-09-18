# Instruções de utilização

## Estratégia de Organização de Codificação

Nesse primeiro eixo do curso, para simplificar a utilização do Git e a organização das pastas e artefatos de implementação no sistema de arquivos, sugerimos que o projeto seja estruturado de modo que cada aluno trabalhe com seus arquivos nas suas respectivas pastas, identificadas por nomes das suas respectivas telas. Por exemplo:

-   Pasta src\pages\login (login): ['login', 'resetPassword', 'resetPasswordLocalStorage].html, index.js, auth - Desenvolvedor responsável: Vinicius

-   Pasta src\pages\landing (landing): index.html, style.css - Desenvolvedor responsável: Vitor

-   Pasta src\pages\syndic (communicates): communicates.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\syndic (employee): employee.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\syndic (reservation): reservation.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\syndic (dashboard): dashboard-sindico-gestao.html, dashboard-gestao-reservas - Desenvolvedor responsável: Vitor
-   Pasta src\pages\syndic (dashboard): dashboard-sindico-morador.html, dashboard-sindico-morador.js - Desenvolvedor responsável: Vitor
-   Pasta src\pages\syndic (dashboard): dashboard-sindico-occurrence.html, dashboard-syndic-ocurrence.js - Desenvolvedor responsável: Vitor
-   Pasta src\pages\syndic (dashboard): dashboard-sindico-ordem-servico.html, dashboard-syndic-os.js - Desenvolvedor responsável: Vitor
-   Pasta src\pages\syndic (dashboard): dashboard-sindico.html, dashboard-syndic-overview.js - Desenvolvedor responsável: Vitor

-   Pasta src\pages\resident (occurrence): occurrence.html, style.css, index.js, js - Desenvolvedor responsável: Vitor
-   Pasta src\pages\resident (reservation): reservation.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\resident (communicates): communicates.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\resident (home): index.html, style.css, index.js, js - Desenvolvedor responsável: Vinicius

-   Pasta src\pages\employee (notifications): notifications.html, style.css, js - Desenvolvedor responsável: Vinicius
-   Pasta src\pages\employee : dashboard.html, style.css, script.js, extensions - Desenvolvedor responsável: Anna Clara e Vitor

## Instalação do Site

O site em HTML/CSS/JS é um projeto estático, logo pode ser utilizado tanto em servidores como em navegadores web. Clique <a href="https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t9-smartcondo/index.html">aqui</a> para acessá-lo.

## Histórico de versões

# Histórico de Versões (CHANGELOG)

Seguem as versões principais do projeto SmartCondo — resumo das mudanças relevantes por release.

## [0.1.0] - 2025-03-01

-   Scaffold inicial do projeto SmartCondo.
-   Estrutura de pastas, assets e configuração base.

## [0.2.0] - 2025-05-20

-   Protótipo UI da página de funcionários.
-   Listagem estática de cards e botões de ação (editar/excluir).
-   Arquivos de frontend:
    -   src/pages/syndic/employee/employee.html
    -   src/pages/syndic/employee/style.css
    -   src/pages/syndic/employee/js/index.js

## [0.3.0] - 2025-07-15

-   Implementação do modelo Employee e persistência local (db/db.json).
-   Validações iniciais de formulário (validateEmployee).
-   Arquivos adicionados:
    -   src/pages/syndic/employee/js/models/employee.js
    -   src/js/utils/cpf.js

## [0.4.0] - 2025-09-01

-   Refatoração do repositório (Repository) e separação de responsabilidades.
-   Adicionada função utilitária renderAllEmployees para evitar duplicação.
-   Arquivos alterados/criados:
    -   src/pages/syndic/employee/js/repository/
    -   src/pages/syndic/employee/js/middlewares/employeeCrud.js

## [0.4.2] - 2025-10-10

-   Correções de bugs em validações de horário e formatação.
-   Melhorias na UX do modal de cadastro (fechamento e recarregamento da lista).
-   Arquivos alterados:
    -   src/pages/syndic/employee/js/middlewares/employeeCrud.js
    -   src/pages/syndic/employee/js/modals/showModal.js

## [1.0.0] - 2025-11-23

-   Release estável inicial para entrega do Trabalho.
-   Integração final dos módulos de gestão:
    -   Employee CRUD completo (listagem, criação, edição, remoção).
    -   Validações de CPF e e-mail integradas.
    -   Modais de confirmação e loaders funcionais.
-   Arquivos principais:
    -   src/pages/syndic/employee/js/middlewares/employeeCrud.js
    -   src/pages/syndic/employee/js/models/employee.js
    -   src/js/modal/showConfirm.js

#### Adicionado/Atualizado/Removido

-   Relação de artefatos ...
