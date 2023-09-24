import { useState, useEffect } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { IContas, IContasArray } from "../../Interfaces/IContas";

import './CadastraConta.scss'
import { Link } from "react-router-dom";

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
                    <label htmlFor="select">
                        <p>Cliente</p>
                        <select value={cliente} onChange={(e) => SetCliente(parseInt(e.target.value))}>
                            <option accessKey=""></option>
                            {
                                clientes?.map((item: any)=>{
                                    return(
                                        <option key={item.id} value={item.id}>{item.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </label>

                    <div className="select-s">
                        <label htmlFor="select">
                            <p>Tipo Conta</p>
                            <select value={tipoConta} onChange={(e) => SetTipoConta(e.target.value)}>
                                <option></option>
                                <option value="Corrente">Corrente</option>
                                <option value="Poupança">Poupança</option>
                                <option value="Salario">Salario</option>
                            </select>
                        </label>
                    </div>
                    <div className="big-input">
                        <label htmlFor="input">
                            <p>Saldo inicial</p>
                            <input type="number" value={saldoInicial} onChange={(e) => SetSaldoInicial(parseFloat(e.target.value))}/>
                        </label>
                        <label htmlFor="input">
                            <p>Limite de débito diário</p>
                            <input type="number" value={limiteDiario} onChange={(e) => SetLimiteDiario(parseFloat(e.target.value))}/>
                        </label>
                    </div>
                    <div className="btn"><button type="submit">CONFIRMAR</button></div>
                    
                </form>
            </div>
        </div>
            
        </>
    )
}

export default CadastroConta;