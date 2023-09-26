import { useState, useEffect } from "react";import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { ITransacoesArray } from "../../Interfaces/ITransacoes";
import { Link } from "react-router-dom";
import './transacao.scss'
import ExtratoModal from "../../Components/Extrado";

function Transacoes(){

    const[getTransacao, setGetTransacao] = useState<ITransacoesArray>()
    const[extratoModal, setExtratoModal] = useState<boolean>(false)

    async function getTransacoesData(){
        const response = await api.get("/transacoes")
        setGetTransacao(response.data)
    }

    function handleExtratoModal(){
        setExtratoModal(!extratoModal)
    }

    useEffect(()=> {
        getTransacoesData()
    }, [])
    return(
        <>
            <div className="page">
                <Menu/>
                <div className="page-content">

                    <div className="conteiner-title">
                        <h1>TRANSAÇÕES</h1>
                    </div>

                    <div className="src-content">
                        <label htmlFor="">
                            <p>Conta</p>
                            <input type="text"/>
                        </label>
                        <label htmlFor="">
                            <p>Data Inicial</p>
                            <input type="date"/>
                        </label>
                        <label htmlFor="">
                            <p>Data final</p>
                            <input type="date"/>
                        </label>
                    </div>

                    <div className="table-content">
                        <div className="tabela">
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
                                                    <td><button onClick={handleExtratoModal}>GERAR ESTRATO</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>           
                        </div>
                        <div className="btn">
                            <button><Link to={"/novaTransacao"}>+</Link></button>
                        </div>
                    </div>
                </div>
                <ExtratoModal isOpen={extratoModal} close={handleExtratoModal}/>
            </div>
        </>
    )
}

export default Transacoes;