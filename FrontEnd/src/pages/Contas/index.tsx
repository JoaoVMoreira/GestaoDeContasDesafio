import {useEffect, useState} from 'react'
import { api } from '../../Services/api';
import Menu from '../../Components/Menu';

function Contas(){

    const[getContas, setGetContas] = useState([])

    async function GetContas(){
        const response = await api.get("/contas")
        setGetContas(response.data)
    }

    useEffect(()=> {
        GetContas()
    }, [])


    return(
        <>
        <div className="page">
            <Menu/>
            <div className="conteiner">
                <h1>CONTAS</h1>
                <div className="tabela-contas">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Tipo de Conta</th>
                                <th>i</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getContas.map((item:any) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.pessoaId.nome}</td>
                                            <td>{item.pessoaId.cpf}</td>
                                            <td>{item.tipoConta}</td>
                                            <td><button>i</button></td>
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

export default Contas;