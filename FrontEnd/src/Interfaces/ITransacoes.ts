export interface ITransacoes{
    contaId: number,
    valorTransacao: number | undefined,
    tipoTransacao: string
}

export interface ITransacoesArray{
    data: ITransacoes[]
}