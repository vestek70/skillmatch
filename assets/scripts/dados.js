const CHAVE_ARMAZENAMENTO = "skillmatch:candidato";
const CAMINHO_VAGAS = "assets/dados/vagas.json";

export function salvarCandidato(candidato) {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(candidato));
}

export function carregarCandidato() {
    const dadosSalvos = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
}

export async function carregarVagas() {
    const resposta = await fetch(CAMINHO_VAGAS);

    if (!resposta.ok) {
        throw new Error(`Falha ao buscar vagas: status ${resposta.status}`);
    }

    return resposta.json();
}
