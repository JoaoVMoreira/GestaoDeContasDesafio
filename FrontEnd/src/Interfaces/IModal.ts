export interface IModalTransacao{
    isOpen: boolean,
    close: any,
    transacao: {
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
}

export interface IModalSaque{
    isOpen: boolean,
    close: any,
    id: number
}