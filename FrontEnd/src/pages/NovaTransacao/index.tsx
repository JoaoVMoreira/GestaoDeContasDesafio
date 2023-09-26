import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { IContasArray } from "../../Interfaces/IContas";
import { ITransacoes } from "../../Interfaces/ITransacoes";

import './novaTransacao.scss'
import {useNavigate} from "react-router-dom";

function NovaTransacao(){
    const [getContas, setGetContas] = useState<IContasArray>()
    const [conta, setConta] = useState<number>(0)
    const [tipoTransacao, setTipoTransacao] = useState<string>("")
    const [valorTransacao, setValorTransacao] = useState<number>()
    const navigate = useNavigate();

    async function GetContas(){
        const response = await api.get("/contas")
        setGetContas(response.data)
    }

    useEffect(()=>{
        GetContas()
    }, [])

    async function handleCadastraTransacao(){

        if(conta == null || tipoTransacao == '' || valorTransacao == 0){
            return alert('Favor preencher todos os campos')

        }
        const data: ITransacoes = {
            contaId: conta,
            valorTransacao: valorTransacao,
            tipoTransacao: tipoTransacao
        }

        await api.post("/transacoes", data)
        .then(response=>{
            alert("Transação realizada com sucesso")
            navigate("/transacoes")
            navigate(0)
        })
        .catch(error => {return alert("Erro na transação: " + error)})
        
        
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
                                getContas?.map((item:any) => {
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