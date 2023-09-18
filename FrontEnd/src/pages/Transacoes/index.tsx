function Transacoes(){
    return(
        <>
            <h1>TRANSAÇÕES</h1>
            <div>
                <input type="text" placeholder="Conta"/>
                <input type="date" placeholder="Data Inicial"/>
                <input type="date" placeholder="Data final"/>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo Transação</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td><button>Gerar Extrato</button></td>
                        </tr>
                    </tbody>
                </table>

                <button>+</button>
            </div>
        </>
    )
}

export default Transacoes;