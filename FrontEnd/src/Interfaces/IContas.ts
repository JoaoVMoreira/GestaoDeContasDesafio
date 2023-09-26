export interface IContas{
    pessoaId: number,
    saldo: number| undefined,
    limiteSaldoDiario: number | undefined,
    tipoConta: string 
}

export interface IContasArray{
    data: IContas[]
}