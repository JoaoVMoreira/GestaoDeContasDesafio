import {BrowserRouter, Route, Routes} from "react-router-dom"
import CadastrarPessoa from "./pages/CadastroCliente"
import NovaTransacao from "./pages/NovaTransacao"
import Contas from "./pages/Contas"
import Transacoes from "./pages/Transacoes"
import CadastroConta from "./pages/CadastroConta"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastrarPessoa/>}/>
        <Route path="/novaTransacao" element={<NovaTransacao/>}/>
        <Route path="/contas" element={<Contas/>}/>
        <Route path="/transacoes" element={<Transacoes/>}/>
        <Route path="/criar_conta" element={<CadastroConta/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
