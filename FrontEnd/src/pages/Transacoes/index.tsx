import { useState, useEffect } from "react";import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { ITransacoesArray } from "../../Interfaces/ITransacoes";

function Transacoes(){

    const[getTransacao, setGetTransacao] = useState<ITransacoesArray>()

    async function getTransacoesData(){
        const response = await api.get("/transacoes")
        setGetTransacao(response.data)
    }

    useEffect(()=> {
        getTransacoesData()
    }, [])
    return(
        <>
            <div className="page">
                <Menu/>
                <div className="conteiner">
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

                            {
                                getTransacao?.map((item:any)=> {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.conta_id.pessoaId.nome}</td>
                                            <td>{item.tipoTransacao}</td>
                                            <td>{item.valorTransacao}</td>
                                            <td><button>Gerar Extrato</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <button>+</button>
                </div>
                </div>
            </div>
            
        </>
    )
}

export default Transacoes;