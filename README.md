# SkillMatch JS

Sobre o Projeto
O **SkillMatch JS** é um simulador de compatibilidade de competências desenvolvido em JavaScript puro. O objetivo principal do sistema é comparar o perfil de habilidades de um candidato com os requisitos de diversas vagas de tecnologia (focadas em Front-End Júnior), classificando o nível de afinidade e gerando recomendações automatizadas de estudo.

---

 Objetivos de Aprendizado (Módulo 01)
Este projeto prático foi estruturado para consolidar os seguintes conceitos:
- **Lógica de Programação & Condicionais:** Classificação de compatibilidade (Alta, Média, Baixa).
- **Manipulação Avançada de Arrays:** Uso obrigatório de métodos iterativos (`map`, `filter`, `reduce`).
- **Programação Orientada a Objetos (POO):** Criação de classes, aplicação de herança (`extends`) e uso do `this`.
- **JavaScript Moderno e Assíncrono:** Implementação de Closures, Callbacks, Promises e sintaxe `async/await`.
- **Ferramental de Mercado:** Versionamento com Git/GitHub (GitFlow) e organização ágil com Kanban.
- **Boas Práticas de Variáveis:** O projeto prioriza o uso de `let` e `const` para garantir o escopo de bloco e maior previsibilidade. O uso de `var` foi evitado, pois ele possui escopo global ou de função, o que pode causar bugs de sobrescrita e comportamentos inesperados (hoisting) em aplicações maiores.

---

 Conceitos de Redes Aplicados
Como requisito técnico do projeto, foi feita uma analogia com a **Arquitetura Cliente-Servidor** e o funcionamento da internet:
- Na internet, quando preenchemos um formulário ou buscamos dados, o *Cliente* (navegador) faz uma requisição HTTP para um *Servidor*, que processa e devolve uma resposta.
- No código deste projeto, a função `buscarVagasSimuladas()` utiliza uma **Promise** combinada com `setTimeout` para simular exatamente esse comportamento: um atraso de rede ao buscar a lista de vagas hospedada em um "servidor fictício" antes de exibi-las na tela para o usuário.

---

 Como Executar o Projeto
O projeto foi desenvolvido para rodar de forma simples e direta, sem a necessidade de instalar o Node.js.

1. Abra o navegador Google Chrome
2. Acesse as ferramentas do desenvolvedor pressionando **F12** ou as teclas **Ctrl + Shift + J** (Windows/Linux) ou **Cmd + Option + J** (Mac).
3. Clique na aba **Console**.
4. Copie todo o código contido no arquivo `skillmatch.js` deste repositório.
5. Cole no console do navegador e pressione **Enter**.

---

Ferramentas Utilizadas
- Editor de Código: VS Code
  - *xtensões utilizadas/recomendadas: Live Server, ESLint, e JavaScript (ES6) code snippets.
- Controle de Versão: Git & GitHub
- Gestão de Tarefas (Kanban): Trello

---

 Links do Projeto

-
- **Repositório GitHub:** https://github.com/vestek70/skillmatch.git
- **Quadro Kanban (Trello):** https://trello.com/invite/b/6a09dbd712664b9d9c68cb7d/ATTIb763ec6a023c4defeedf4096a03c02589F64AE47/skillmatch-js-simulador-de-compatibilidade-com-vaga-front-end-junior 
- **Vídeo de Apresentação:** https://drive.google.com/file/d/1CQAxXs_Y2JoOaqMmAOkQXWZCrNGn6vnK/view?usp=sharing

---
Developed by Konstantin Borisov
