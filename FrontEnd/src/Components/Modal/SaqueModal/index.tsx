import { api } from '../../../Services/api';
import './modal.scss'
import {useState} from 'react'

function SaqueModal({isOpen, close, id}:any){

    const[valorSaque, setValorSaque] = useState<number|undefined>();

    async function handleSaque(){
        if(valorSaque == null){
            alert("Favor informar o valor do saque")
        }

        const data = {
            valor: valorSaque
        }
        const response = await api.put(`/contas/saque/${id}`, data)
            .then(res => {
                alert("Saque realizado com sucesso!")
                return close();
            }).catch(error => {
                return alert("Erro ao realizar o saque" + error)
            })
    }

    if(isOpen){
        return(
            <>
                <div className="backgroundStyle">
                    <div className='contentStyle'>
                        <h2>Sacar valor</h2>
                        <label htmlFor="">
                            <p>Insira o valor de saque:</p>
                            <input type="number" value={valorSaque} onChange={(e) => setValorSaque(parseFloat(e.target.value))}/>
                        </label>
                        <button onClick={handleSaque}>SACAR</button>
                        <button onClick={close}>close</button>
                    </div>
                </div>
            </>
        )
    }

}

export default SaqueModal;