import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { IContas, IContasArray, IContasFull } from "../../Interfaces/IContas";
import { ITransacoes } from "../../Interfaces/ITransacoes";

import { useMutation, useQuery } from 'react-query'

import './novaTransacao.scss'
import {useNavigate} from "react-router-dom";



async function GetContas(){
    return await api.get("/contas").then(response => response.data)
}

function NovaTransacao(){
    const [conta, setConta] = useState<number>(0)
    const [tipoTransacao, setTipoTransacao] = useState<string>("")
    const [valorTransacao, setValorTransacao] = useState<number>()
    const navigate = useNavigate();


    const dataTransacao: ITransacoes = {
        contaId: conta,
        valorTransacao: valorTransacao,
        tipoTransacao: tipoTransacao
    }

    async function postTransacao(){
        return await api.post("/transacoes", dataTransacao).then(response => response.data)
    }


    const { mutate } = useMutation({
        mutationKey: ['transacao'],
        mutationFn: postTransacao,
        onSuccess(){
            alert("Transação cadastrada com sucesso!")
        },
        onError(error){
            alert(`Erro ao cadastrar transação: ${error}`)
        }
    })

    const { data } = useQuery({
        queryKey: ['transacao'],
        queryFn: GetContas
    })


    async function handleCadastraTransacao(){

        if(conta == null || tipoTransacao == '' || valorTransacao == 0){
            return alert('Favor preencher todos os campos')

        }
        mutate();
        navigate("/transacoes")
        
    }

    return(
        <>
        <div className="page">
            <Menu/>
            <div className="conteiner">
                <h1>NOVA TRANSAÇÃO</h1>
                <form onSubmit={handleCadastraTransacao}>
                    <label htmlFor="select">
                        <p>Conta</p>
                        <select value={conta} onChange={(e) => setConta(parseInt(e.target.value))}>
                            <option accessKey=""></option>
                            {  
                                data?.map((item: IContasFull) => {
                                    return(
                                        <option key={item.id} value={item.id}>{item.pessoaId.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <div className="big-input">
                        <label htmlFor="select">
                            <p>Tipo de transação</p>
                            <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}>
                                <option accessKey=""></option>
                                <option value="Debito">Débito</option>
                            <option value="Deposito">Deposito</option>
                        </select>
                        </label>
                        <label htmlFor="input">
                            <p>Valor da transação</p>
                            <input type="number" value={valorTransacao} onChange={(e) => setValorTransacao(parseFloat(e.target.value))}/>
                        </label>
                    </div>
                    <div className="btn"><button type="submit">CONFIRMAR</button></div>
                </form>
            </div>
        </div>
            
        </>
    )
}

export default NovaTransacao;