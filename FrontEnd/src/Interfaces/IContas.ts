export interface IContas{
    pessoaId: number,
    saldo: number| undefined,
    limiteSaldoDiario: number | undefined,
    tipoConta: string 
}

export interface IContasArray{
    data: IContas[]
}

export interface IContasFull{
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
}

export interface IContasFullPost{
    id: number,
    nome: string
}