export class Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

    calcularCompatibilidade(habilidadesCandidato) {
        const encontradas = this.requisitos.filter((requisito) =>
            habilidadesCandidato.includes(requisito)
        );
        const faltantes = this.requisitos.filter(
            (requisito) => !habilidadesCandidato.includes(requisito)
        );
        const percentual = Math.round((encontradas.length / this.requisitos.length) * 100);

        return {
            encontradas,
            faltantes,
            percentual,
            classificacao: this.classificar(percentual)
        };
    }

    classificar(percentual) {
        if (percentual >= 80) return "Alta compatibilidade";
        if (percentual >= 50) return "Média compatibilidade";
        return "Baixa compatibilidade";
    }

    exibirResumo() {
        return `Vaga de ${this.cargo} na empresa ${this.empresa}`;
    }
}

export class VagaFrontEnd extends Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade, stack) {
        super(id, empresa, cargo, requisitos, salario, modalidade);
        this.stack = stack;
    }

    exibirResumo() {
        return `${super.exibirResumo()} — Stack: ${this.stack}`;
    }
}

function criarContadorDeAnalises() {
    let total = 0;
    return function contar() {
        total += 1;
        return total;
    };
}

export function analisarVagas(vagasDados, habilidadesCandidato) {
    const contarAnalise = criarContadorDeAnalises();

    return vagasDados.map((vagaObj) => {
        const vaga = new VagaFrontEnd(
            vagaObj.id,
            vagaObj.empresa,
            vagaObj.cargo,
            vagaObj.requisitos,
            vagaObj.salario,
            vagaObj.modalidade,
            "Front-End"
        );

        const numeroAnalise = contarAnalise();
        const compatibilidade = vaga.calcularCompatibilidade(habilidadesCandidato);

        return { vaga, numeroAnalise, ...compatibilidade };
    });
}

export function encontrarMelhorVaga(resultados) {
    return resultados.reduce((melhor, atual) =>
        atual.percentual > melhor.percentual ? atual : melhor
    );
}
