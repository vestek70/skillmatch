# SkillMatch Web

##  Sobre o Projeto
O **SkillMatch Web** é uma aplicação de página única (SPA) desenvolvida em JavaScript puro que ajuda RHs e candidatos a comparar o perfil de habilidades de um candidato com os requisitos de vagas de tecnologia (focadas em Front-End), classificando o nível de compatibilidade e destacando as habilidades encontradas e faltantes em cada vaga.

O projeto nasceu de um script de console (`skillmatch.js`, mantido no repositório como referência histórica) e evoluiu para uma interface web completa, com formulário de perfil, persistência em `localStorage` e um catálogo de vagas carregado via `fetch`.

---

##  Estrutura do Projeto
```
skillmatch-js/
├── index.html                   # Marcação semântica e formulário de perfil
├── assets/
│   ├── dados/
│   │   └── vagas.json           # Catálogo de vagas consumido via fetch
│   ├── scripts/
│   │   ├── dados.js             # Persistência: localStorage e fetch de vagas
│   │   ├── motor.js             # Classes Vaga/VagaFrontEnd e engine de análise
│   │   ├── ui.js                # Geração dinâmica dos cartões de vaga (DOM)
│   │   └── main.js              # Orquestra eventos e integra os módulos
│   └── styles/
│       └── style.css            # Layout responsivo com Flexbox (mobile-first)
├── skillmatch.js                 # Script de console original (versão anterior)
└── README.md
```

---

##  Tecnologias
- **HTML5** semântico (`header`, `main`, `footer`, `label for`/`id` para acessibilidade)
- **CSS3** com Flexbox, `flex-wrap`/`gap` e media queries mobile-first (sem CSS Grid)
- **JavaScript (Vanilla JS)** em ES Modules (`import`/`export`), sem frameworks, TypeScript ou bundlers
- **Web APIs:** `localStorage` (persistência do perfil) e `fetch` (carregamento assíncrono do catálogo de vagas)

---

##  Objetivos de Aprendizado (Módulo 01)
Este projeto prático foi estruturado para consolidar os seguintes conceitos:
- **Lógica de Programação & Condicionais:** Classificação de compatibilidade (Alta, Média, Baixa).
- **Manipulação Avançada de Arrays:** Uso obrigatório de métodos iterativos (`map`, `filter`, `reduce`).
- **Programação Orientada a Objetos (POO):** Criação de classes, aplicação de herança (`extends`) e uso do `this`.
- **JavaScript Moderno e Assíncrono:** Implementação de Closures, Callbacks, Promises, sintaxe `async/await` e `fetch` para consumo de dados via rede.
- **Manipulação de DOM:** Criação dinâmica de elementos (`createElement`, `classList`) para renderizar interface sem HTML hardcoded.
- **Persistência no Navegador:** Uso de `localStorage` para manter o perfil do candidato entre recarregamentos de página.
- **Ferramental de Mercado:** Versionamento com Git/GitHub (GitFlow) e organização ágil com Kanban.
- **Boas Práticas de Variáveis:** O projeto prioriza o uso de `let` e `const` para garantir o escopo de bloco e maior previsibilidade. O uso de `var` foi evitado, pois ele possui escopo global ou de função, o que pode causar bugs de sobrescrita e comportamentos inesperados (hoisting) em aplicações maiores.

---

##  Conceitos de Redes Aplicados
Como requisito técnico do projeto, foi feita uma analogia com a **Arquitetura Cliente-Servidor** e o funcionamento da internet:
- Na internet, quando preenchemos um formulário ou buscamos dados, o *Cliente* (navegador) faz uma requisição HTTP para um *Servidor*, que processa e devolve uma resposta.
- No código deste projeto, a função `carregarVagas()` (em `assets/scripts/dados.js`) usa `fetch` para buscar `assets/dados/vagas.json`, reproduzindo esse mesmo ciclo de requisição/resposta, agora com uma chamada de rede real (ainda que para um arquivo local) em vez de uma simulação com `setTimeout`.

---

##  Como Executar o Projeto
Como a aplicação usa `fetch` para carregar `assets/dados/vagas.json`, é necessário servir os arquivos por HTTP (abrir o `index.html` diretamente como `file://` bloqueia o `fetch` por política de CORS do navegador).

**Usando o Live Server (VS Code) — recomendado:**
1. Instale a extensão **Live Server** no VS Code (se ainda não tiver).
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"** (ou clique em "Go Live" na barra inferior).
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500` (ou porta similar).

**Alternativa sem VS Code:** qualquer servidor estático local funciona, por exemplo `python -m http.server` na raiz do projeto e depois acessar `http://localhost:8000`.

> A versão original em script de console (`skillmatch.js`) continua funcional: basta colar seu conteúdo no Console do DevTools do navegador (F12), sem necessidade de servidor.

---

##  Auditoria e Qualidade (Lighthouse)
O projeto foi auditado com o **Lighthouse** (servido via `python -m http.server`, headless Chrome) para validar a marcação semântica, os `label for`/`id`, o `meta description` e a ausência de erros de console:

| Categoria       | Nota |
|-----------------|------|
| Performance     | 99   |
| Accessibility   | 100  |
| Best Practices  | 100  |
| SEO             | 100  |

Antes de fechar o Accessibility/SEO em 100, dois ajustes foram necessários a partir do próprio relatório: adicionar `<meta name="description">` (faltava, derrubava o SEO) e um `<link rel="icon" href="data:,">` (evitava um 404 de `favicon.ico` que aparecia como erro no console e derrubava o Best Practices).

---

##  Ferramentas Utilizadas
- **Editor de Código:** VS Code
  - *Extensões utilizadas/recomendadas:* Live Server, ESLint, e JavaScript (ES6) code snippets.
- **Controle de Versão:** Git & GitHub
- **Gestão de Tarefas (Kanban):** Trello

---

##  Links do Projeto

- **Repositório GitHub:** https://github.com/vestek70/skillmatch.git
- **Quadro Kanban (Trello):** https://trello.com/invite/b/6a09dbd712664b9d9c68cb7d/ATTIb763ec6a023c4defeedf4096a03c02589F64AE47/skillmatch-js-simulador-de-compatibilidade-com-vaga-front-end-junior 
- **Vídeo de Apresentação:** https://drive.google.com/file/d/1CQAxXs_Y2JoOaqMmAOkQXWZCrNGn6vnK/view?usp=sharing

---
Developed by **Konstantin Borisov** 