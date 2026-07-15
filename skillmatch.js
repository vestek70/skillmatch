// =======================================================
// RF01 - Perfil do candidato
// =======================================================
const candidato = {
    nome: "Konstantin Borisov",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban", "HTML", "CSS"],
    experienciaMeses: 6
};

// =======================================================
// RF09 & RF11 - Criar uma classe base e demonstrar o 'this'
// =======================================================
class Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade) {
        this.empresa = empresa;       // RF11: Uso do 'this' para o contexto da instância
        this.cargo = cargo;
        this.requisitos = requisitos; // Array de requisitos da vaga para comparação
        this.salario = salario;
        this.modalidade = modalidade;
    }

    // RF11: Método da classe utilizando o 'this'
    exibirResumo() {
        return `Vaga de ${this.cargo} na empresa ${this.empresa}`;
    }
}

// =======================================================
// RF10 - Usar herança (Aplicação de Herança)
// =======================================================
class VagaFrontEnd extends Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade, nivel) {
        // Passa os parâmetros para o construtor da classe pai (Vaga)
        super(empresa, cargo, requisitos, salario, modalidade);
        this.nivel = nivel; // Atributo específico da classe filha
    }

    exibirNivel() {
        return `Nível da vaga: ${this.nivel}`;
    }
}

// =======================================================
// RF02 - Criar uma lista de vagas (Array com 3 vagas)
// =======================================================
const vagas = [
    new VagaFrontEnd("TechStart", "Desenvolvedor Front-End Júnior", ["JavaScript", "GitHub", "Lógica de Programação"], 2800, "Remoto", "Júnior"),
    new VagaFrontEnd("CodeLab", "Estágio Front-End", ["JavaScript", "Kanban", "GitHub"], 1800, "Híbrido", "Estágio"),
    new VagaFrontEnd("WebSolutions", "Programador JavaScript Junior", ["JavaScript", "Arrays", "Objetos", "Funções"], 3000, "Presencial", "Júnior")
];

// =======================================================
// RF13 - Usar closure (Contador de análises isolado)
// =======================================================
function criarContadorDeAnalises() {
    let total = 0; // Escopo fechado da função (estado interno)
    return function () {
        total++; // Incrementa a variável do escopo pai a cada execução
        return total;
    };
}
const contador = criarContadorDeAnalises();

// =======================================================
// RF14 - Usar Promise (Simulação de API/Servidor)
// =======================================================
function buscarVagasSimuladas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vagas); // Retorna o array de vagas após 1 segundo
        }, 1000);
    });
}

// =======================================================
// RF12 - Usar callback (Funções de encerramento)
// =======================================================
function finalizarAnalise(nomeCandidato, callback) {
    console.log("\n=======================================================");
    console.log(" Processamento de dados finalizado com sucesso.");
    console.log("=======================================================");
    callback(nomeCandidato);
}

// Функция-колбэк для вывода сообщения
function exibirMensagemFinal(nome) {
    console.log(`[Sistema]: ${nome}, revise suas habilidades faltantes e atualize seu plano de estudos. 🚀`);
}

// =======================================================
// ENGINE DE ANÁLISE - Funções Principais e Métodos de Array
// =======================================================

// RF14: Função assíncrona principal que gerencia o fluxo do sistema
async function iniciarSistema() {
    console.log("Iniciando o SkillMatch JS...");
    console.log("Buscando vagas no servidor fictício (Aguarde)...");

    // RF14: Aguarda a Promise ser resolvida (Simulação de carga de API)
    const vagasCarregadas = await buscarVagasSimuladas();
    console.log("Vagas carregadas com sucesso!\n");

    let todasHabilidadesFaltantes = [];

    // RF08 & RF14: Uso do método 'map' para iterar sobre as vagas e gerar os resultados
    const resultados = vagasCarregadas.map((vaga) => {
        // RF13: Uso do closure para contar quantas análises foram feitas
        const numeroAnalise = contador();
        console.log(`Executando análise nº: ${numeroAnalise}`);

        // RF05 & RF08: Uso do método 'filter' para encontrar as habilidades que o candidato NÃO possui
        const faltantes = vaga.requisitos.filter(
            (req) => !candidato.habilidades.includes(req)
        );

        // RF08: Uso do método 'filter' para mapear as habilidades que o candidato possui
        const encontradas = vaga.requisitos.filter(
            (req) => candidato.habilidades.includes(req)
        );

        todasHabilidadesFaltantes.push(...faltantes);

        // RF03: Cálculo matemático do percentual de compatibilidade
        const requisitosAtendidos = vaga.requisitos.length - faltantes.length;
        const percentual = (requisitosAtendidos / vaga.requisitos.length) * 100;

        // RF04: Estrutura de decisão condicional (if-else) para classificar a compatibilidade
        let classificacao = "";
        if (percentual >= 80) {
            classificacao = "Alta compatibilidade";
        } else if (percentual >= 50) {
            classificacao = "Média compatibilidade";
        } else {
            classificacao = "Baixa compatibilidade";
        }

        return {
            vaga,
            percentual,
            classificacao,
            faltantes,
            encontradas
        };
    });

    // Exibição formatada dos resultados no console
    resultados.forEach((res) => {
        console.log(`Empresa: ${res.vaga.empresa}`);
        console.log(`Cargo: ${res.vaga.cargo}`);
        console.log(`Compatibilidade: ${res.percentual.toFixed(0)}%`);
        console.log(`Habilidades encontradas: ${res.encontradas.join(", ")}`);

        // RF05: Exibe a lista de habilidades faltantes
        if (res.faltantes.length > 0) {
            console.log(`Habilidades faltantes:\n - ${res.faltantes.join("\n - ")}`);
        } else {
            console.log("Habilidades faltantes: Nenhuma! Você cumpre todos os requisitos.");
        }

        console.log(`Classificação: ${res.classificacao}`);
        console.log(`Resumo: ${res.vaga.exibirResumo()}`); // RF11: Uso do 'this'
        console.log("-------------------------------------------------------");
    });

    // RF06 & RF08: Uso do método 'reduce' para encontrar a vaga com maior compatibilidade
    const melhorVaga = resultados.reduce((max, atual) => {
        return atual.percentual > max.percentual ? atual : max;
    });

    console.log("\n>>> VAGA MAIS COMPATÍVEL ENCONTRADA <<<");
    console.log(`Vaga ideal: ${melhorVaga.vaga.empresa} - ${melhorVaga.vaga.cargo}`);
    console.log(`Compatibilidade Máxima: ${melhorVaga.percentual.toFixed(0)}%`);

    // RF07: Gerar uma recomendação de estudo sem duplicatas (usando Set)
    const habilidadesParaEstudar = [...new Set(todasHabilidadesFaltantes)];

    if (habilidadesParaEstudar.length > 0) {
        console.log("\n>>> RECOMENDAÇÃO DE ESTUDO <<<");
        console.log(`Priorize estudar: ${habilidadesParaEstudar.join(", ")}, pois esses conteúdos aparecem nas vagas analisadas.`);
    }

    // RF12: Execução do Callback de encerramento
    finalizarAnalise(candidato.nome, exibirMensagemFinal);
}

// Execução automática do sistema
iniciarSistema();