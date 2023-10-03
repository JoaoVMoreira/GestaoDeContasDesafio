import img from '../../assets/Designer (9).png'
import './ErrorPage.scss'

function ErrorPage(){
    return (
        <>
            <div className="center">
                <div className="lateral">
                    <h1>404!</h1>
                    <p>Pagina não encontrada!</p>
                    <button><a href="/">Voltar</a></button>
                </div>
                <div>
                    <img src={img} alt="astronauta de costas olhando um mapa" />
                </div>
            </div>
        </>
    )
}

export default ErrorPage;