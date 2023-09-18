import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import NovaTransacao from "./pages/NovaTransacao"
import Contas from "./pages/Contas"
import Transacoes from "./pages/Transacoes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/novaTransacao" element={<NovaTransacao/>}/>
        <Route path="/contas" element={<Contas/>}/>
        <Route path="/transacoes" element={<Transacoes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
