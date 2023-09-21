export interface IContas{
    pessoaId: number,
    saldo: number,
    limiteSaldoDiario: number,
    tipoConta: string 
}

export interface IContasArray{
    data: IContas[]
}