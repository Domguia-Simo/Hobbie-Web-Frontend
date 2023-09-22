import React,{useState} from 'react'

const NoAccount = ({setModal}) =>{

    const [display ,setDisplay] = useState('block')

    return(
        <React.Fragment>
            <div className='modal-bg' style={{
                position:'fixed',
                width:'100%',
                top:'0',
                height:'150%',
                overflow:'hidden',
                backgroundColor:'rgba(0,0,0,0.5)',
                zIndex:'10000000',
                display:display,
            }}
                onClick={()=>{
                    setDisplay('none')
                    setModal(false)
                }}
            >
                <div className='modal-content' style={{
                    position:'fixed',
                    width:'max-content',
                    height:'fit-content',
                    padding:'30px 20px',
                    backgroundColor:'white',
                    zIndex:'101',
                    top:'45%',
                    left:'50%',
                    transform:'translate(-50%,-50%)',
                    borderRadius:'30px',
                    lineHeight:'25px',
                    letterSpacing:'1px',
                    fontSize:'medium',
                }}
                >
                    Login First !. <br/>
                    You can only view content.<br/>
                    Where to login : <span className='fas fa-power-off'></span><br/><br/>
                    Login for better experience<br/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NoAccount;