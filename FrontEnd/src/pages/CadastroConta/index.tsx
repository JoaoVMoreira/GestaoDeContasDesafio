import { useState, useEffect } from "react";
import { api } from "../../Services/api";

function CadastroConta(){
    const [cliente, SetCliente] = useState("")
    const [tipoConta, SetTipoConta] = useState("")
    const [saldoInicial, SetSaldoInicial] = useState("")
    const [limiteDiario, SetLimiteDiario] = useState("")
    const [clientes, setClientes] = useState<any>([])

    async function listClientes(){
        const response = await api.get("/pessoas")
        setClientes(response.data)
    }

    async function handleCadastraConta(){
        try{
            
            await api.post("/contas", {
                pessoaId: cliente,
                saldo: saldoInicial,
                limiteSaldoDiario: limiteDiario,
                tipoConta: tipoConta 
            })
            alert("Conta criada com sucesso!")
        }catch(error){
            alert("Ocorreu um erro: "+error)
        }
    }
    
    useEffect(()=>{
        listClientes()
    }, [])
    
    return( 
        <>
            <h1>CRIAR CONTA</h1>

            <form action="" onSubmit={handleCadastraConta}>
                <select placeholder="Cliente" value={cliente} onChange={(e) => SetCliente(e.target.value)}>
                    <option accessKey="">Clinete</option>
                    {
                        clientes.map((item: any)=>{
                            return(
                                <option key={item.id} value={item.id}>{item.nome}</option>
                            )
                        })
                    }
                </select>
                <select value={tipoConta} onChange={(e) => SetTipoConta(e.target.value)}>
                    <option>Tipo conta</option>
                    <option value="Corrente">Corrente</option>
                    <option value="Poupança">Poupança</option>
                    <option value="Salario">Salario</option>
                </select>
                <input type="number" placeholder="Saldo inicial" value={saldoInicial} onChange={(e) => SetSaldoInicial(e.target.value)}/>
                <input type="number" placeholder="Limite diário" value={limiteDiario} onChange={(e) => SetLimiteDiario(e.target.value)}/>
                <button type="submit">CONFIRMAR</button>
            </form>
        </>
    )
}

export default CadastroConta;