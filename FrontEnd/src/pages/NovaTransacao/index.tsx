import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";

function NovaTransacao(){
    const [getContas, setGetContas] = useState([])
    const [conta, setConta] = useState("")
    const [tipoTransacao, setTipoTransacao] = useState("")
    const [valorTransacao, setValorTransacao] = useState("")

    async function GetContas(){
        const response = await api.get("/contas")
        setGetContas(response.data)
    }

    useEffect(()=>{
        GetContas()
    }, [])

    async function handleCadastraTransacao(){
        const data = {
            contaId: conta,
            valorTransacao: parseFloat(valorTransacao),
            tipoTransacao: tipoTransacao
        }

        await api.post("/transacoes", data)
        .then(()=>{alert("Transação realizada com sucesso")})
        .catch((error) => {alert("Erro na transação: " + error)})
    }

    return(
        <>
        <div className="page">
            <Menu/>
            <div className="conteiner">
                <h1>NOVA TRANSAÇÃO</h1>
                <form onSubmit={handleCadastraTransacao}>
                    <select value={conta} onChange={(e) => setConta(e.target.value)}>
                        <option accessKey="">Conta</option>
                        {  
                            getContas.map((item:any) => {
                                return(
                                    <option key={item.id} value={item.id}>{item.pessoaId.nome}</option>
                                )
                            })
                        }
                    </select>
                    <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}>
                        <option accessKey="">Tipo de Transação</option>
                        <option value="Debito">Débito</option>
                        <option value="Deposito">Deposito</option>
                    </select>
                    <input type="number" placeholder="Valor Transação" value={valorTransacao} onChange={(e) => setValorTransacao(e.target.value)}/>
                    <button type="submit">CONFIRMAR</button>
                </form>
            </div>
        </div>
            
        </>
    )
}

export default NovaTransacao;