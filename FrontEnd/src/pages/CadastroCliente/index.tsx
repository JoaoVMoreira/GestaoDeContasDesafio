import { useState } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";

import './CadastroCliente.scss'

function CadastrarPessoa(){

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, SetDataNascimento] = useState("");
    async function handleCadastraConta(){
        try{
            await api.post("/pessoas", {nome: nome, cpf: cpf, dataNascimento: dataNascimento})
            alert("Cliente cadastrado com sucesso")
        }catch(error){
            alert("Erro ao cadastrar:"+error)

        }
        
        
    }

    return(
        <>
            <div className="page">
                <Menu/>
                <div className="conteiner">
                    <h1>CADASTRAR CLIENTE</h1>

                    <form action="" onSubmit={handleCadastraConta}>
                        <div className="big-input">
                            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <input type="number" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                        <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => SetDataNascimento(e.target.value)}/>
                        <button type="submit">CONFIRMAR</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CadastrarPessoa;