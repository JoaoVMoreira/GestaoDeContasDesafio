import { useState, useEffect } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { IContas, IContasArray } from "../../Interfaces/IContas";

function CadastroConta(){
    const [cliente, SetCliente] = useState<number>(0)
    const [tipoConta, SetTipoConta] = useState<string>("")
    const [saldoInicial, SetSaldoInicial] = useState<number>(0)
    const [limiteDiario, SetLimiteDiario] = useState<number>(0)
    const [clientes, setClientes] = useState<IContasArray>()

    async function listClientes(){
        const response = await api.get("/pessoas")
        setClientes(response.data)
    }

    async function handleCadastraConta(){

        const data: IContas = {
            pessoaId: cliente,
            saldo: saldoInicial,
            limiteSaldoDiario: limiteDiario,
            tipoConta: tipoConta 
        }
            await api.post("/contas", data)
            .then(response => {alert("Cadastro realizado com sucesso")})
            .catch(error=>{alert("Ocorreu um erro no cadastro do cliente: "+ error)})
    }
    
    useEffect(()=>{
        listClientes()
    }, [])
    
    return( 
        <>
        <div className="page">
            <Menu/>
            <div className="conteiner">
                <h1>CRIAR CONTA</h1>
                <form action="" onSubmit={handleCadastraConta}>
                    <select placeholder="Cliente" value={cliente} onChange={(e) => SetCliente(parseInt(e.target.value))}>
                        <option accessKey="">Clinete</option>
                        {
                            clientes?.map((item: any)=>{
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
                    <input type="number" placeholder="Saldo inicial" value={saldoInicial} onChange={(e) => SetSaldoInicial(parseFloat(e.target.value))}/>
                    <input type="number" placeholder="Limite diário" value={limiteDiario} onChange={(e) => SetLimiteDiario(parseFloat(e.target.value))}/>
                    <button type="submit">CONFIRMAR</button>
                </form>
            </div>
        </div>
            
        </>
    )
}

export default CadastroConta;