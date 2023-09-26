import { api } from '../../../Services/api';
import '../modal.scss'
import {useState} from 'react'

function DepositoModal({isOpen, close, id}:any){

    const[valorDeposito, setValorDeposito] = useState<number|undefined>();

    async function handleSaque(){
        if(valorDeposito == null){
            alert("Favor informar o valor do deposito")
        }

        const data = {
            valor: valorDeposito
        }
        const response = await api.put(`/contas/deposito/${id}`, data)
            .then(res => {
                alert("Deposito realizado com sucesso!")
                return close();
            }).catch(error => {
                return alert("Erro ao realizar o deposito" + error)
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
                            <input type="number" value={valorDeposito} onChange={(e) => setValorDeposito(parseFloat(e.target.value))}/>
                        </label>
                        <div className='modal-btn'>
                            <button onClick={handleSaque}>DEPOSITAR</button>
                            <button onClick={close}>CLOSE</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default DepositoModal;