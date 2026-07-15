export function exibirStatusVagas(elementoStatus, mensagem) {
    elementoStatus.textContent = mensagem;
}

export function renderizarVagas(container, resultados) {
    container.innerHTML = "";

    resultados.forEach((resultado) => {
        container.appendChild(criarCardVaga(resultado));
    });
}

function criarCardVaga(resultado) {
    const { vaga, percentual, classificacao, encontradas, faltantes } = resultado;

    const card = document.createElement("article");
    card.classList.add("vaga-card");

    const titulo = document.createElement("h3");
    titulo.textContent = `${vaga.cargo} — ${vaga.empresa}`;
    card.appendChild(titulo);

    const modalidade = document.createElement("p");
    modalidade.textContent = `Modalidade: ${vaga.modalidade} | Stack: ${vaga.stack}`;
    card.appendChild(modalidade);

    const compatibilidade = document.createElement("p");
    compatibilidade.classList.add("vaga-card__compatibilidade");
    compatibilidade.classList.add(classePorClassificacao(classificacao));
    compatibilidade.textContent = `${percentual}% de compatibilidade — ${classificacao}`;
    card.appendChild(compatibilidade);

    card.appendChild(criarListaHabilidades("Habilidades encontradas", encontradas));
    card.appendChild(criarListaHabilidades("Habilidades faltantes", faltantes));

    return card;
}

function classePorClassificacao(classificacao) {
    if (classificacao === "Alta compatibilidade") return "vaga-card__compatibilidade--alta";
    if (classificacao === "Média compatibilidade") return "vaga-card__compatibilidade--media";
    return "vaga-card__compatibilidade--baixa";
}

function criarListaHabilidades(titulo, habilidades) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("vaga-card__habilidades");

    const rotulo = document.createElement("p");
    rotulo.textContent = `${titulo}:`;
    wrapper.appendChild(rotulo);

    const lista = document.createElement("ul");

    if (habilidades.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma";
        lista.appendChild(item);
    } else {
        habilidades.forEach((habilidade) => {
            const item = document.createElement("li");
            item.textContent = habilidade;
            lista.appendChild(item);
        });
    }

    wrapper.appendChild(lista);
    return wrapper;
}
