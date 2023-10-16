import React from 'react'

const Saving =()=>{
    return(
        <React.Fragment>
            <div style={{
                width:'100%',
                height:'200%',
                position:'fixed',
                backgroundColor:'rgba(0,0,0,0.5)',
                zIndex:'100',
                overflow:'hidden',
                marginTop:'-20px'
               
            }}>
                <div style={{
                    width:'fit-content',
                    padding:'25px 15px ',
                    backgroundColor:'white',
                    fontSize:'medium',
                    position:'fixed',
                    top:'45%',
                    left:'50%',
                    transform:'translate(-50% ,-50%)',
                    borderRadius:'10px',
                    display:'flex',
                    alignItems:'center'
                }}> 
                   <img src={require('../../../assets/images/loading.gif')} width='25px' height='25px'/> &nbsp; Saving changes
                </div>
            </div>
        </React.Fragment>
    )
}

export default Saving