import { useState, useEffect } from "react";
import { api } from "../../Services/api";

function NovaTransacao(){

    const [contas, setContas] = useState<any>([])
    const [conta, setConta] = useState("")
    const [tipoTransacao, setTipoTransacao] = useState("")
    const [valorTransacao, setValorTransacao] = useState("")

    async function getClientes(){
        const contasGeted = await api.get("/contas");
        setContas(contasGeted.data)
        console.log(contasGeted.data)
    } 

    useEffect(()=>{
        getClientes()
    }, [])

    async function handleCadastraTransacao(){
        alert(conta)
        
    }
    /*
    try{
            await api.post("/transacoes", {
                contaId: conta,
                valorTransacao: valorTransacao,
                tipoTransacao: tipoTransacao
            })
            alert("Cadastro de transação realzado com sucesso!!")
        }catch(error){
            alert("Ocorreu um erro: "+error)
        }
    */

    return(
        <>
            <h1>NOVA TRANSAÇÃO</h1>
            <form onSubmit={handleCadastraTransacao}>
                <select value={conta} onChange={(e) => setConta(e.target.value)}>
                    {
                        contas.map((item:any) => {
                            return(
                                <option key={item.id} value={item.saldo}>{item.pessoaId.nome}</option>
                            )
                        })
                    }
                </select>
                <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}>
                    <option value="Debito">Débito</option>
                    <option value="Deposito">Deposito</option>
                </select>
                <input type="number" placeholder="Valor Transação" value={valorTransacao} onChange={(e) => setValorTransacao(e.target.value)}/>
                <button type="submit">CONFIRMAR</button>
            </form>
        </>
    )
}

export default NovaTransacao;