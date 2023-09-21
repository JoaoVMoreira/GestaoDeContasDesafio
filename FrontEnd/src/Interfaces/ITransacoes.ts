export interface ITransacoes{
    contaId: number,
    valorTransacao: number,
    tipoTransacao: string
}

export interface ITransacoesArray{
    data: ITransacoes[]
}