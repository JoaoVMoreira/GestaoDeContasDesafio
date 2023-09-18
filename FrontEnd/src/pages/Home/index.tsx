function Home(){
    return(
        <>
            <h1>CRIAR CONTA</h1>

            <form action="">
                <input type="text" placeholder="Nome"/>
                <input type="number" placeholder="CPF"/>
                <input type="date" placeholder="Data de Nascimento"/>
                <input type="text" placeholder="Tipo de conta"/>
                <input type="number" placeholder="Saldo Inicial"/>
                <input type="number" placeholder="Limite diário"/>
                <button>CONFIRMAR</button>
            </form>
        </>
    )
}

export default Home;