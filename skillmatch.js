// RF01 - Perfil do candidato
const candidato = {
    nome: "Konstantin Borisov",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban", "HTML", "CSS"],
    experienciaMeses: 6
}; // =======================================================
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