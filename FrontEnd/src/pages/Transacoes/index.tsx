import { useState, useEffect } from "react";import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { ITransacaoFull } from "../../Interfaces/ITransacoes";
import { Link } from "react-router-dom";
import './transacao.scss'
import ExtratoModal from "../../Components/Extrado";
import { useQuery } from 'react-query'

const dataType = {
    id:0,
    conta_id: {
        id: 0,
        pessoaId: {
            nome: '', 
            cpf: 0,
            dataNascimento: ''
        },
        saldo: 0,
        limiteSaldoDiario: 0,
        tipoConta: '', 
        dataCriacao: '',
        bandeiraAtivo: false
    },
    valorTransacao: 0,
    tipoTransacao: '',
    dataTransacao: ''
}

function Transacoes(){
    const[extratoModal, setExtratoModal] = useState<boolean>(false)
    const[transacao, setTransacao] = useState<ITransacaoFull>(dataType)
    const[busca, setBusca] = useState<string>('')

    function handleExtratoModal(item:ITransacaoFull){
        setExtratoModal(!extratoModal)
        setTransacao(item)
    }

    async function getTransacao(){
        return await api.get("/transacoes").then((response)=> response.data)
    }

    const {data, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: getTransacao
    })

    if(isLoading){
        return(
            <>
                <div className='loading'>
                    <p>Carregando...</p>
                </div>
            </>
        )       
    }

    const filterTransacao = data?.filter((item:ITransacaoFull)=> 
        item.conta_id.pessoaId.nome.toLowerCase().includes(busca.toLowerCase())
    )

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
                            <input type="text" value={busca} onChange={e => setBusca(e.target.value)}/>
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
                                        filterTransacao?.map((item:ITransacaoFull)=> {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.conta_id.pessoaId.nome}</td>
                                                    <td>{item.tipoTransacao}</td>
                                                    <td>R${item.valorTransacao?.toFixed(2)}</td>
                                                    <td><button onClick={() => {handleExtratoModal(item)}}>GERAR ESTRATO</button></td>
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
                <ExtratoModal isOpen={extratoModal} close={handleExtratoModal} transacao={transacao}/>
            </div>
        </>
    )
}

export default Transacoes;