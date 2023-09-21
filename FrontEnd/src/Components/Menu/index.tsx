import logo from '../../assets/Designer__8_-removebg-preview.png'
import './menu.scss'
import {Link} from 'react-router-dom'
import { BsFillPersonPlusFill, BsFillPersonVcardFill, BsPersonRolodex } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";




function Menu(){
    return(
        <>
            <div className="menu">
                <Link to={"/"}><img src={logo}/></Link>
                <nav>
                    <ul>
                        <li><Link to={'/'}>
                            <div className='menu-icon'>
                                <BsFillPersonVcardFill/>
                                <label>Cadastra Cliente</label>
                            </div>
                        </Link></li>
                        <li><Link to={'/criar_conta'}>
                            <div className='menu-icon'>
                                <BsFillPersonPlusFill/>
                                <label>Cadastra Conta</label>
                            </div>
                        </Link></li>
                        <li><Link to={'/novaTransacao'}>
                            <div className='menu-icon'>
                                <FaMoneyBillTransfer/>
                                <label>Nova Transação</label>
                            </div>
                        </Link></li>
                        <li><Link to={'/transacoes'}>
                            <div className='menu-icon'>
                                <TbReportMoney/>
                                <label>Transações</label>
                            </div>
                        </Link></li>
                        <li><Link to={'/contas'}>
                            <div className='menu-icon'>
                                <BsPersonRolodex/>
                                <label>Contas</label>
                            </div>
                        </Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Menu;