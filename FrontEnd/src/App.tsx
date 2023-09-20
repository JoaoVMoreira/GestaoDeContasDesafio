import {BrowserRouter, Route, Routes} from "react-router-dom"
import CadastrarPessoa from "./pages/CadastroCliente"
import NovaTransacao from "./pages/NovaTransacao"
import Contas from "./pages/Contas"
import Transacoes from "./pages/Transacoes"
import CadastroConta from "./pages/CadastroConta"
import Menu from "./Components/Menu"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarPessoa/>}/>
        <Route path="/novaTransacao" element={<NovaTransacao/>}/>
        <Route path="/contas" element={<Contas/>}/>
        <Route path="/transacoes" element={<Transacoes/>}/>
        <Route path="/criar_conta" element={<CadastroConta/>}/>
        <Route path="/menu" element={<Menu/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
