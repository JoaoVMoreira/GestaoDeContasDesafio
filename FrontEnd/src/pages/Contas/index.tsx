import {useEffect, useState} from 'react'
import { api } from '../../Services/api';
import Menu from '../../Components/Menu';
import { IContas, IContasFull } from '../../Interfaces/IContas';
import { Link, useNavigate } from 'react-router-dom';
import { BsInfoLg } from "react-icons/bs";
import { format, parseISO} from "date-fns"
import { useQuery } from 'react-query';


import './contas.scss'
import SaqueModal from '../../Components/Modal/SaqueModal';
import DepositoModal from '../../Components/Modal/DepositoModal';

async function getContas(){
    return await api.get("/contas").then(response => response.data)
} 

function Contas(){
    const dataType:IContasFull = {
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

    const [busca, setBusca] = useState<string>("")
    const[showInfos, setShowInfos] = useState<boolean>(false)
    const[selectedItem, setSelectedItem] = useState<IContasFull>(dataType)
    const[saqueModal, setSaqueModal] = useState<boolean>(false)
    const[depositoModal, setDepositoModal] = useState<boolean>(false)
    const navigate = useNavigate();

    const {data, isLoading} = useQuery({
        queryKey: ['contas'],
        queryFn: getContas
    }
    )


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
    function handleOpenDepositoModal(){
        setDepositoModal(true)
    }
    function handleCloseDepositoModal(){
        setDepositoModal(false)
        navigate(0)
    }

    const filterContas = data?.filter((item:IContasFull)=>
        item.pessoaId.nome.toLowerCase().includes(busca.toLowerCase()) ||
        
        item.pessoaId.cpf.toString().includes(busca)
        )

    async function handleDesativaConta(id: number){
        const response = api.put(`/contas/${id}`)
        .then((res)=> {
            alert("Conta desativada")
            navigate(0)
        }).catch(error => {
            alert("Ocorreu um erro: " + error)
        })
    }
    
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
                            {isLoading ? (
                                <div className='loading'>
                                    <p>Carregando...</p>
                                </div>
                            ) : (
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
                                            filterContas?.map((item:IContasFull) => {
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
                            )}
                            <div className='btn'>
                                <button><Link to={"/criar_conta"}>+</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className='src-btn'>
                        <input type="text" placeholder='Buscar' value={busca} onChange={e => setBusca(e.target.value)}/>
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
                                            <td>R${selectedItem.saldo?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <th>Limite diário</th>
                                            <td>R${selectedItem.limiteSaldoDiario?.toFixed(2)}</td>
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
                                </table>
                                    <div className='infos-btn'>
                                        {selectedItem.bandeiraAtivo == true ? (
                                            <button onClick={()=>{handleDesativaConta(selectedItem.id)}}>Desativar Conta</button>
                                        ): (
                                            <button onClick={()=>{handleDesativaConta(selectedItem.id)}}>Ativar Conta</button>
                                        )}
                                        <button onClick={handleOpenSaqueModal}>Sacar</button>
                                        <button onClick={handleOpenDepositoModal}>Depositar</button>
                                    </div>

                                <SaqueModal isOpen={saqueModal} close={handleCloseSaqueModal} id={selectedItem.id}/>
                                <DepositoModal isOpen={depositoModal} close={handleCloseDepositoModal} id={selectedItem.id}/>
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