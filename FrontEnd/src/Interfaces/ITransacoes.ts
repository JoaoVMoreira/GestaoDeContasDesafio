export interface ITransacoes{
    contaId: number,
    valorTransacao: number | undefined,
    tipoTransacao: string
}

export interface ITransacoesArray{
    data: ITransacoes[]
}

export interface ITransacaoFull{
    id: number,
    conta_id: {
        id: number,
        pessoaId: {
            nome: string, 
            cpf: number,
            dataNascimento: string
        },
        saldo: number| undefined,
        limiteSaldoDiario: number | undefined,
        tipoConta: string 
        dataCriacao: string
        bandeiraAtivo: boolean
    },
    valorTransacao: number | undefined,
    tipoTransacao: string,
    dataTransacao: string
}