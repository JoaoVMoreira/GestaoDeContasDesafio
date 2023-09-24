import {useEffect, useState} from 'react'
import { api } from '../../Services/api';
import Menu from '../../Components/Menu';
import { IContas } from '../../Interfaces/IContas';
import { Link } from 'react-router-dom';
import { BsInfoLg } from "react-icons/bs";


import './contas.scss'

function Contas(){

    const[getContas, setGetContas] = useState<IContas>()

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
            <div className='page-content'>

                <div className="conteiner-title">
                    <h1>CONTAS</h1>
                </div>

                <div className='main-content'>

                    <div className='contas-table'>
                        <div className="tabela-contas">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Tipo de Conta</th>
                                        <th>Informações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getContas?.map((item:any) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.pessoaId.nome}</td>
                                                    <td>{item.pessoaId.cpf}</td>
                                                    <td>{item.tipoConta}</td>
                                                    <td><button><BsInfoLg/></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                            <div className='btn'>
                                <button><Link to={"/criar_conta"}>+</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className='src-btn'>
                        <input type="text" placeholder='Buscar'/>
                    </div>
                </div>

            </div>
        </div>
            
        </>
    )
}

export default Contas;