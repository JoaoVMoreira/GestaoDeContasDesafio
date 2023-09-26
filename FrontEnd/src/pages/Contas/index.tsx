import {useEffect, useState} from 'react'
import { api } from '../../Services/api';
import Menu from '../../Components/Menu';
import { IContas, IContasFull } from '../../Interfaces/IContas';
import { Link, useNavigate } from 'react-router-dom';
import { BsInfoLg } from "react-icons/bs";
import { format, parseISO} from "date-fns"


import './contas.scss'
import SaqueModal from '../../Components/Modal/SaqueModal';

function Contas(){
    const data:IContasFull = {
        id: 0,
        pessoaId: {
            nome: "", 
            cpf: 0,
            dataNascimento: ''
        },
        saldo: 0,
        limiteSaldoDiario: 0,
        tipoConta: '',
        dataCriacao: '',
        bandeiraAtivo: true
    }

    const[getContas, setGetContas] = useState<IContas>()
    const[showInfos, setShowInfos] = useState<boolean>(false)
    const[selectedItem, setSelectedItem] = useState<IContasFull>(data)
    const[saqueModal, setSaqueModal] = useState<boolean>(false)
    const navigate = useNavigate();

    async function GetContas(){
        const response = await api.get("/contas")
        setGetContas(response.data)
    }


    //<--INFOS-->
    function handleShowInfo(item:any){
        setSelectedItem(item)
        setShowInfos(!showInfos)
        console.log(selectedItem)
    }

    //<--MODAL SAQUE-->
    function handleOpenSaqueModal(){
        setSaqueModal(true)
    }

    function handleCloseSaqueModal(){
        setSaqueModal(false)
        navigate(0)
    }

    //<--MODAL DEPOSITO-->

    async function handleDesativaConta(id: number){
        const response = api.put(`/contas/${id}`)
        .then((res)=> {
            alert("Conta desativada")
            navigate(0)
        }).catch(error => {
            alert("Ocorreu um erro: " + error)
        })
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
                                        getContas?.map((item:IContasFull) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.pessoaId.nome}</td>
                                                    <td>{item.pessoaId.cpf}</td>
                                                    <td>{item.tipoConta}</td>
                                                    <td><button onClick={() => handleShowInfo(item)}><BsInfoLg/></button></td>
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
                        <div className='dataCriacao'>
                        {showInfos == true && (
                            <>
                                <h2>{selectedItem.pessoaId.nome}</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>CPF</th>
                                            <td>{selectedItem.pessoaId.cpf}</td>
                                        </tr>
                                        <tr>
                                            <th>Data de nascimento</th>
                                            <td>{format(parseISO(selectedItem.pessoaId.dataNascimento),"dd/MM/yyyy")}</td>
                                        </tr>
                                        <tr>
                                            <th>Saldo atual</th>
                                            <td>R${selectedItem.saldo}</td>
                                        </tr>
                                        <tr>
                                            <th>Limite diário</th>
                                            <td>R${selectedItem.limiteSaldoDiario}</td>
                                        </tr>
                                        <tr>
                                            <th>Tipo de conta</th>
                                            <td>Conta {selectedItem.tipoConta}</td>
                                        </tr>
                                        <tr>
                                            <th>Data de criação da conta</th>
                                            <td>{format(parseISO(selectedItem.dataCriacao),"dd/MM/yyyy")}</td>
                                        </tr>
                                        <tr>
                                             <th>Status</th>
                                             {selectedItem.bandeiraAtivo == true ? (
                                                <td>Ativo</td>
                                             ): (<td>Desativado</td>)}
                                        </tr>
                                    </tbody>
                                    <div>
                                        <button onClick={()=>{handleDesativaConta(selectedItem.id)}}>Desativar Conta</button>
                                        <button onClick={handleOpenSaqueModal}>Sacar</button>
                                        <button>Depositar</button>
                                    </div>
                                </table>

                                <SaqueModal isOpen={saqueModal} close={handleCloseSaqueModal} id={selectedItem.id}/>
                            </>
                    )}
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Contas;