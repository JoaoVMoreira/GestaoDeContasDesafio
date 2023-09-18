function NovaTransacao(){
    return(
        <>
            <h1>NOVA TRANSAÇÃO</h1>
            <form action="">
                <input type="text" placeholder="Conta"/>
                <input type="text" placeholder="Tipo Transação"/>
                <input type="text" placeholder="Valor Transção"/>
                <button>CONFIRMAR</button>
            </form>
        </>
    )
}

export default NovaTransacao;