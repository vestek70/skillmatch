import { salvarCandidato, carregarCandidato, carregarVagas } from "./dados.js";
import { analisarVagas, encontrarMelhorVaga, gerarRecomendacaoDeEstudo } from "./motor.js";
import {
    renderizarVagas,
    exibirStatusVagas,
    exibirMelhorVaga,
    exibirRecomendacaoEstudo,
    exibirErrosFormulario,
    exibirResumoPerfil
} from "./ui.js";

const formulario = document.getElementById("form-candidato");
const campoNome = document.getElementById("nome");
const campoArea = document.getElementById("area");
const campoHabilidades = document.getElementById("habilidades");
const campoExperiencia = document.getElementById("experiencia");
const mensagemStatus = document.getElementById("mensagem-status");
const resumoPerfilElemento = document.getElementById("perfil-resumo");

const camposComErro = [
    { input: campoNome, elementoErro: document.getElementById("erro-nome") },
    { input: campoArea, elementoErro: document.getElementById("erro-area") },
    { input: campoHabilidades, elementoErro: document.getElementById("erro-habilidades") },
    { input: campoExperiencia, elementoErro: document.getElementById("erro-experiencia") }
];

const containerVagas = document.getElementById("lista-vagas");
const statusVagas = document.getElementById("status-vagas");
const melhorVagaElemento = document.getElementById("melhor-vaga");
const recomendacaoElemento = document.getElementById("recomendacao-estudo");

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

// RF10: validação manual (form tem novalidate) para poder mostrar a
// mensagem de erro em texto, ligada ao campo via aria-describedby,
// em vez de depender só do balão nativo do navegador.
function validarCandidato(candidato) {
    const erros = {};

    if (!candidato.nome) {
        erros[campoNome.id] = "Informe seu nome completo.";
    }
    if (!candidato.area) {
        erros[campoArea.id] = "Informe sua área de atuação.";
    }
    if (candidato.habilidades.length === 0) {
        erros[campoHabilidades.id] = "Informe ao menos uma habilidade.";
    }
    if (Number.isNaN(candidato.experienciaMeses) || candidato.experienciaMeses < 0) {
        erros[campoExperiencia.id] = "Informe um número de meses válido (0 ou mais).";
    }

    return erros;
}

async function carregarEExibirVagas(candidato) {
    containerVagas.innerHTML = "";
    exibirStatusVagas(statusVagas, "Carregando vagas...");
    exibirMelhorVaga(melhorVagaElemento, null);
    exibirRecomendacaoEstudo(recomendacaoElemento, null);

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
            exibirRecomendacaoEstudo(recomendacaoElemento, gerarRecomendacaoDeEstudo(resultados));
        }
    } catch (erro) {
        exibirStatusVagas(statusVagas, "Não foi possível carregar as vagas. Tente novamente mais tarde.");
    }
}

// RF08: Callback — tratarEnvioFormulario é passada como referência para
// addEventListener em iniciar() e só é chamada quando o evento "submit" ocorre.
function tratarEnvioFormulario(evento) {
    evento.preventDefault(); // impede o recarregamento padrão da página

    const candidato = {
        nome: campoNome.value.trim(),
        area: campoArea.value.trim(),
        habilidades: converterHabilidadesParaArray(campoHabilidades.value),
        experienciaMeses: Number(campoExperiencia.value)
    };

    const erros = validarCandidato(candidato);
    exibirErrosFormulario(camposComErro, erros);

    if (Object.keys(erros).length > 0) {
        mensagemStatus.textContent = "Corrija os campos destacados antes de salvar.";
        camposComErro.find(({ input }) => erros[input.id])?.input.focus();
        return;
    }

    salvarCandidato(candidato);
    mensagemStatus.textContent = "Perfil salvo com sucesso!";
    exibirResumoPerfil(resumoPerfilElemento, candidato);
    carregarEExibirVagas(candidato);
}

function iniciar() {
    const candidatoSalvo = carregarCandidato();
    if (candidatoSalvo) {
        preencherFormulario(candidatoSalvo);
        exibirResumoPerfil(resumoPerfilElemento, candidatoSalvo);
    }

    formulario.addEventListener("submit", tratarEnvioFormulario);
    carregarEExibirVagas(candidatoSalvo);
}

iniciar();
