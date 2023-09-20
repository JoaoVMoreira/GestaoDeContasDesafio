import logo from '../../assets/Designer__8_-removebg-preview.png'
import './menu.scss'
import {Link} from 'react-router-dom'

function Menu(){
    return(
        <>
            <div className="menu">
                <img src={logo}/>
                <nav>
                    <ul>
                        <li><Link to={'/'}>CLiente</Link></li>
                        <li><Link to={'/criar_conta'}>Conta</Link></li>
                        <li><Link to={'/novaTransacao'}>Transação</Link></li>
                        <li><Link to={'/transacoes'}>Transações</Link></li>
                        <li><Link to={'/contas'}>Contas</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Menu;