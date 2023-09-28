import { format, parseISO } from 'date-fns';
import './extrato.scss'
import { IModalTransacao } from '../../Interfaces/IModal';

function ExtratoModal({isOpen, close, transacao}:IModalTransacao){
    if(isOpen){
        return(
            <>  
                <div className='backgroundStyle'>
                    <div className='contentStyle'>
                        <hr />
                        <h3>Extrato transação</h3>
                        <hr />
                        <table>
                            <tr>
                                <th>Nome:</th>
                                <td>{transacao.conta_id.pessoaId.nome}</td>
                                <th>Data de Nascimento:</th>
                                <td>{format(parseISO(transacao.conta_id.pessoaId.dataNascimento),"dd/MM/yyyy")}</td>
                            </tr>
                            <tr>
                                <th>CPF:</th>
                                <td>{transacao.conta_id.pessoaId.cpf}</td>
                                <th>Tipo de Conta:</th>
                                <td>{transacao.conta_id.tipoConta}</td>
                            </tr>
                            <tr>
                                <th>Limite diário:</th>
                                <td>R${transacao.conta_id.limiteSaldoDiario?.toFixed(2)}</td>
                                <th>Saldo Atual:</th>
                                <td>R${transacao.conta_id.saldo?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Tipo de transação:</th>
                                <td>{transacao.tipoTransacao}</td>
                                <th>Valor Transação</th>
                                <td>R${transacao.valorTransacao?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Data da Transação:</th>
                                <td>{format(parseISO(transacao.dataTransacao),"dd/MM/yyyy")}</td>
                            </tr>
                        </table>
                        <button onClick={close}>CLOSE</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ExtratoModal;