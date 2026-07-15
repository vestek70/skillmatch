import { salvarCandidato, carregarCandidato, carregarVagas } from "./dados.js";
import { analisarVagas, encontrarMelhorVaga } from "./motor.js";
import { renderizarVagas, exibirStatusVagas, exibirMelhorVaga } from "./ui.js";

const formulario = document.getElementById("form-candidato");
const campoNome = document.getElementById("nome");
const campoArea = document.getElementById("area");
const campoHabilidades = document.getElementById("habilidades");
const campoExperiencia = document.getElementById("experiencia");
const mensagemStatus = document.getElementById("mensagem-status");

const containerVagas = document.getElementById("lista-vagas");
const statusVagas = document.getElementById("status-vagas");
const melhorVagaElemento = document.getElementById("melhor-vaga");

function converterHabilidadesParaArray(textoHabilidades) {
    return textoHabilidades
        .split(",")
        .map((habilidade) => habilidade.trim())
        .filter((habilidade) => habilidade.length > 0);
}

function preencherFormulario(candidato) {
    campoNome.value = candidato.nome;
    campoArea.value = candidato.area;
    campoHabilidades.value = candidato.habilidades.join(", ");
    campoExperiencia.value = candidato.experienciaMeses;
}

async function carregarEExibirVagas(candidato) {
    containerVagas.innerHTML = "";
    exibirStatusVagas(statusVagas, "Carregando vagas...");
    exibirMelhorVaga(melhorVagaElemento, null);

    try {
        const vagasCarregadas = await carregarVagas();

        if (vagasCarregadas.length === 0) {
            exibirStatusVagas(statusVagas, "Nenhuma vaga encontrada no momento.");
            return;
        }

        const habilidadesCandidato = candidato ? candidato.habilidades : [];
        const resultados = analisarVagas(vagasCarregadas, habilidadesCandidato);

        renderizarVagas(containerVagas, resultados);
        exibirStatusVagas(
            statusVagas,
            candidato
                ? `${resultados.length} vaga(s) analisada(s) com base no seu perfil.`
                : `${resultados.length} vaga(s) encontrada(s). Preencha e salve seu perfil para ver a compatibilidade.`
        );

        if (candidato) {
            exibirMelhorVaga(melhorVagaElemento, encontrarMelhorVaga(resultados));
        }
    } catch (erro) {
        exibirStatusVagas(statusVagas, "Não foi possível carregar as vagas. Tente novamente mais tarde.");
    }
}

function tratarEnvioFormulario(evento) {
    evento.preventDefault();

    const candidato = {
        nome: campoNome.value.trim(),
        area: campoArea.value.trim(),
        habilidades: converterHabilidadesParaArray(campoHabilidades.value),
        experienciaMeses: Number(campoExperiencia.value)
    };

    salvarCandidato(candidato);
    mensagemStatus.textContent = "Perfil salvo com sucesso!";
    carregarEExibirVagas(candidato);
}

function iniciar() {
    const candidatoSalvo = carregarCandidato();
    if (candidatoSalvo) {
        preencherFormulario(candidatoSalvo);
    }

    formulario.addEventListener("submit", tratarEnvioFormulario);
    carregarEExibirVagas(candidatoSalvo);
}

iniciar();
