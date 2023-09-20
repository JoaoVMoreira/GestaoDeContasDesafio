import { useState } from "react";
import { api } from "../../Services/api";
import Menu from "../../Components/Menu";

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
            <h1>CADASTRAR CLIENTE</h1>

            <form action="" onSubmit={handleCadastraConta}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                <input type="number" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => SetDataNascimento(e.target.value)}/>
                <button type="submit">CONFIRMAR</button>
            </form>
        </>
    )
}

export default CadastrarPessoa;