import { useState, useEffect } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { IContas, IContasArray, IContasFull, IContasFullPost } from "../../Interfaces/IContas";
import { useMutation, useQuery } from 'react-query'

import './CadastraConta.scss'
import { useNavigate } from "react-router-dom";

async function getClientes(){
    return await api.get("/pessoas").then(response => response.data)
}

function CadastroConta(){
    const [cliente, SetCliente] = useState<number>(0)
    const [tipoConta, SetTipoConta] = useState<string>("")
    const [saldoInicial, SetSaldoInicial] = useState<number>()
    const [limiteDiario, SetLimiteDiario] = useState<number>()
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['clientes'],
        queryFn: getClientes,
    })

    const dataConta: IContas = {
        pessoaId: cliente,
        saldo: saldoInicial,
        limiteSaldoDiario: limiteDiario,
        tipoConta: tipoConta 
    }

    async function postConta(){
        return await api.post("/contas", dataConta).then(response => response.data)
    }

    const { mutate } = useMutation({
        mutationKey: ['conta'],
        mutationFn: postConta,
        onSuccess(){
            alert("Cadastro realizado com sucesso")
        }, 
        onError(error){
            alert(`Ocorreu um erro no momento do cadastro: ${error}`)
        }
    })

    async function handleCadastraConta(){

        if(cliente == null || tipoConta == '' || limiteDiario == 0){
            return alert("Favor preencher todos os campos")
        }
        mutate();
        navigate('/contas');
    }

    
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
                                data?.map((item: IContasFullPost)=>{
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