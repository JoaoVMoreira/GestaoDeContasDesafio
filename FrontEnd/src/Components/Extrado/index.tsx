import './extrato.scss'

function ExtratoModal({isOpen, close}:any){
    if(isOpen){
        return(
            <>  
                <div className='backgroundStyle'>
                    <div className='contentStyle'>
                        <p>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p>
                        <p>Extrato transação</p>
                        <p>---------------------------------------------------------------------</p>
                        <button onClick={close}>CLOSE</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ExtratoModal;