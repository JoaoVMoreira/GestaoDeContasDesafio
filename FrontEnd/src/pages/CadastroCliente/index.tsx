import { useState, useEffect } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";
import { useMutation } from 'react-query'
import './CadastroCliente.scss'
import { IPessoa } from "../../Interfaces/IPessoa";
import { useNavigate } from "react-router-dom";

function CadastrarPessoa(){

    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<number|undefined>();
    const [dataNascimento, SetDataNascimento] = useState("");
    const navigate = useNavigate();

    const data: IPessoa = {
        nome: nome,
        cpf: cpf, 
        dataNascimento: new Date(dataNascimento)
    }

    async function postCliente() {
        return api.post('/pessoas', data)
    }

    const {mutate} = useMutation({
        mutationKey: ['cliente'],
        mutationFn: postCliente,
        onSuccess() {
            alert("Cadastro realizado com sucesso!")
        },
        onError(error){
            alert(`Ocorreu um erro no momento do cadastro: ${error}`)
        }
    })

    async function handleCadastraConta(){

        if(nome == '' || cpf == null || dataNascimento == ''){
            return alert('Favor preencher todos os campos')
        }
        if(cpf.toString().length < 11 ){
            alert("CPF inválido")
        }

        mutate();
        navigate("/criar_conta");
    }

    return(
        <>
            <div className="page">
                <Menu/>
                <div className="conteiner">
                    <h1>CADASTRAR CLIENTE</h1>

                    <form action="" onSubmit={handleCadastraConta}>
                        <label htmlFor="input">
                            <p>Nome</p>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </label>
                        <div className="big-input">
                            <label htmlFor="input">
                                <p>CPF</p>
                                <input type="number" value={cpf} onChange={(e) => setCpf(parseInt(e.target.value))}/>
                            </label>
                            <label htmlFor="input">
                                <p>Data de Nascimento</p>
                                <input type="date" value={dataNascimento} onChange={(e) => SetDataNascimento(e.target.value)}/>
                            </label>
                        </div>
                        <div className="btn"><button type="submit">CONFIRMAR</button></div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default CadastrarPessoa;