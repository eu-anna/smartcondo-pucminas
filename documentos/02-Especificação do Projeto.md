# Especificação do Projeto

## Perfis de Usuários


<table>
<tbody>
<tr align=center>
<th colspan="2">Sindico </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Pode ser um condômino eleito pelos moradores ou um síndico profissional contratado. É o responsável por administrar o condomínio, cuidando das finanças, da manutenção e da comunicação com os moradores e funcionários. O síndico é também representante legal do condomínio atuando em nome dele em todos os atos civis. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td> 
1 - Gerenciar comunicados, assembleias e votações. <br>
2 - controlar finanças, documentos e prestação de contas. <br>
3 - Acompanhar ocorrências, solicitações e manutenções. <br>
4 - Comunicação com moradores e funcionários de forma organizada. <br>
5 - Representar judicialmente o condomínio em todas as demandas legais (exigir pagamentos, dar quitação, contratar e demitir funcionários) </td>
</tr>

<tr align=center>
<th colspan="2">Morador </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Pode ser proprietário ou inquilino. Utiliza os serviços do condomínio no dia a dia e precisa de praticidade no relacionamento com a gestão. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1 - Registrar e acompanhar solicitações ou problemas. <br>
2 - Reservar áreas comuns. <br>
3 - Receber comunicados, atas e boletos. <br>
4 - Participar de votações e assembleias online. 
</td>
</tr>

<tr align=center>
<th colspan="2">Funcionários </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Profissionais que atuam no condomínio, como porteiros, zeladores, equipe de limpeza, manutenção ou segurança. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1 - Receber e executar ordens de serviço. 
2 - Registar visitantes, prestadores e entregas. 
3 - Comunicar ocorrências diretamente ao síndico. 
4 - Acompanhar instruções e avisos de forma centralizada </td>
</tr>
</tbody>
</table>


## Histórias de Usuários

| EU COMO... `QUEM`         | QUERO/PRECISO ... `O QUE`                                      | PARA ... `PORQUE`                                                   |
|---------------------------|---------------------------------------------------------------|----------------------------------------------------------------------|
| Eu, como síndico          | enviar comunicados pela página web                            | informar rapidamente todos os moradores                             |
| Eu, como síndico          | acompanhar as solicitações feitas por moradores               | resolver problemas de forma organizada                              |
| Eu, como síndico          | registrar visitantes e prestadores de serviço na página        | manter o controle de acesso ao condomínio                           |
| Eu, como morador          | registrar uma ocorrência (ex.: barulho, manutenção)            | para que o síndico ou funcionários possam resolvê-la                |
| Eu, como morador          | receber notificações de comunicados                            | para ser informado sobre assuntos do condomínio                    |
| Eu, como morador          | reservar áreas comuns pela página web                         | ter praticidade e evitar disputas de horário                       |
| Eu, como morador          | avaliar a qualidade dos serviços prestados pelos funcionários   | fornecer feedback ao síndico                                       |
| Eu, como morador          | publicar eventos ou avisos em um mural comunitário             | incentivar a interação entre condôminos                            |
| Eu, como funcionário       | receber ordens de serviço pela página                          | executar tarefas de forma organizada                                |
| Eu, como funcionário       | poder finalizar uma ordem de serviço                            | informar ao síndico e moradores sobre a finalização de um serviço   |
| Eu, como funcionário       | comunicar problemas (ex.: lâmpada queimada, portão com defeito) | para que o síndico acompanhe e tome providências                   |
| Eu, como funcionário       | acessar minhas rotinas diárias                                  | planejar, e acompanhar minhas rotinas diárias                      |


## Requisitos do Projeto

### Requisitos Funcionais

[Utilize o modelo de tabela abaixo para apresentar os requisitos funcionais]

| ID     | Descrição                                                                 | Prioridade |
|--------|---------------------------------------------------------------------------|------------|
| RF‑01  | O sistema deve permitir que o síndico publique comunicados visíveis para todos os moradores. | Alta       |
| RF‑02  | O sistema deve permitir que o síndico gerencie reservas das áreas comuns, controlando disponibilidade e horários. | Alta       |
| RF‑03  | O sistema deve permitir que o síndico acompanhe solicitações feitas por moradores. | Alta       |
| RF‑04  | O sistema deve permitir que o síndico registre novos usuários do sistema (moradores ou prestadores de serviço). | Alta       |
| RF‑05  | O sistema deve permitir que o síndico registre visitantes e prestadores de serviço. | Média      |
| RF‑06  | O sistema deve permitir que o morador registre ocorrências (ex.: barulho, manutenção, obras). | Alta       |
| RF‑07  | O sistema deve exibir na tela principal do perfil do morador os comunicados enviados pelo síndico sempre que o morador fizer login. | Alta       |
| RF‑08  | O sistema pode permitir que moradores avaliem a qualidade dos serviços prestados pelos funcionários, para fornecer feedback ao síndico. | Baixa      |
| RF‑09  | O sistema pode permitir que moradores publiquem eventos ou avisos em um mural comunitário, para incentivar interação entre condôminos. | Média      |
| RF‑10  | O sistema deve permitir que funcionários recebam ordens de serviço. | Média      |
| RF‑11  | O sistema deve permitir que funcionários informem a conclusão de uma ordem de serviço. | Média      |
| RF‑12  | O sistema deve permitir que funcionários comuniquem problemas (ex.: defeitos, manutenção necessária) ao síndico. | Alta       |
| RF‑13  | O sistema deve ter um calendário (ano, mês, dia, hora). | Média      |
| RF‑14  | O sistema deve ter uma classificação de ações (comunicado e tarefas). | Alta       |
| RF‑15  | O sistema deve exibir na tela principal do perfil do síndico os comunicados ou solicitações enviadas por moradores e funcionários. | Alta       |
| RF‑16  | O sistema deve permitir que o síndico visualize o cadastro de todos os funcionários e moradores. | Alta       |


**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais


| ID     | Descrição                                                                 | Prioridade |
|--------|---------------------------------------------------------------------------|------------|
| RNF‑01 | O sistema deve ser intuitivo e fácil de navegar para moradores, síndico e funcionários, sem necessidade de treinamento avançado. | Alta       |
| RNF‑02 | O sistema deve garantir autenticação de usuários por login e senha, protegendo dados pessoais e financeiros. | Alta       |
| RNF‑03 | O sistema pode oferecer suporte a múltiplos idiomas, para atender moradores estrangeiros. | Baixa      |
| RNF‑04 | O sistema pode ter tema visual personalizável (cores e layout), para melhorar a estética sem impactar a funcionalidade principal. | Baixa      |
| RNF‑05 | O sistema pode permitir integração com redes sociais, para que moradores compartilhem eventos ou comunicados do condomínio. | Baixa      |


**Prioridade: Alta / Média / Baixa. 

