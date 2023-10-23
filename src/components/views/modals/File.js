import React from 'react'

import '../../../assets/styleSheets/styles.css'

const File =({file ,setFile ,text})=>{

function close(e){
    if(e.target.nodeName != 'IMG'){
        setFile([false ,''])
    }
}

    return(
        <React.Fragment>
 
            <div style={{
                width:'100%',
                height:'200%',
                position:'fixed',
                top:'0',
                backgroundColor:'rgba(0,0,0,0.99)',
                zIndex:'1000',
                overflow:'hidden',
                marginTop:'-20px',
            }}
            
                onClick={(e)=>close(e)}
            >

                <div style={{
                    position:'fixed',
                    top:'3%',
                    color:'white',
                    marginLeft:'20px',
                    letterSpacing:'1px',
                }}
                > 
                <h3><span className='fas fa-arrow-left'  onClick={()=>setFile([false ,''])}></span> &nbsp; &nbsp;{text}</h3>
                </div>


                <div style={{
                    width:'100%',
                    position:'fixed',
                    top:'45%',
                    left:'50%',
                    transform:'translate(-50% ,-50%)',
                    maxHeight:'300px',
                }}
                    className='file'
                > 
 
                 <img src={file} width={'100%'} style={{ animation:'zoomOut 0.3s ease-in-out'}}/>

                </div>
            </div>
        </React.Fragment>
    )
}

export default File