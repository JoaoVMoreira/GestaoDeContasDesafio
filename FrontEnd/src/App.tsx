import {BrowserRouter, Route, Routes} from "react-router-dom"
import CadastrarPessoa from "./pages/CadastroCliente"
import NovaTransacao from "./pages/NovaTransacao"
import Contas from "./pages/Contas"
import Transacoes from "./pages/Transacoes"
import CadastroConta from "./pages/CadastroConta"
import Menu from "./Components/Menu"
import { QueryClientProvider, QueryClient } from "react-query"
import ErrorPage from "./pages/ErrorPage"

function App() {

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30
      }
    }
  });
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CadastrarPessoa/>}/>
          <Route path="/novaTransacao" element={<NovaTransacao/>}/>
          <Route path="/contas" element={<Contas/>}/>
          <Route path="/transacoes" element={<Transacoes/>}/>
          <Route path="/criar_conta" element={<CadastroConta/>}/>
          <Route path="/menu" element={<Menu/>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
