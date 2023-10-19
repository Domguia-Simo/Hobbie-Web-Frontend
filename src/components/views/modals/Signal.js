import React,{useState} from 'react'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'
import Saving from './Saving'

const Signal =({userName ,setSignalModal,userId})=>{

    const [loading ,setLoading] = useState(false)

async function signalUser(){
    let body={
        userId:userId,
        signalingId:localStorage.getItem('userId')
    }

    setSignalModal([false,'',''])
    setLoading(true)

    let temp = await request({url:`http://${ipAdress}:5000/api/userAction/signalUser`,method:'post',body:body})
    console.log(temp)

    setLoading(false)
    
}

    return(
        <React.Fragment>
            {loading ? <Saving/> :''}
            <div style={{
                width:'100%',
                height:'200%',
                position:'fixed',
                top:'0',
                backgroundColor:'rgba(0,0,0,0.5)',
                zIndex:'1000',
                overflow:'hidden',
                marginTop:'-20px'
               
            }}>
                <div style={{
                    width:'250px',
                    padding:'25px 10px ',
                    backgroundColor:'white',
                    fontSize:'medium',
                    position:'fixed',
                    top:'45%',
                    left:'50%',
                    transform:'translate(-50% ,-50%)',
                    borderRadius:'10px',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    letterSpacing:'1px'
                }}> 
                   {/* <img src={require('../../../assets/images/loading.gif')} width='25px' height='25px'/> &nbsp;{text ? text: ''}
                    */}
                    <h3>Signaling {userName} !</h3><br/>

                    <div>Signal inadequate content.<br/>Are you sure ?</div><br/>
                    <div style={{
                        // border:'solid 1px',
                        width:'100%',
                        display:'flex',
                        justifyContent:'space-around',
                        color:'rgba(0,0,0,0.85)'
                    }}>
                        <span style={{
                            border:'solid 1px transparent',
                            borderRadius:'5px',
                            padding:'5px 15px',
                            backgroundColor:'rgba(255,0,0,0.1)'
                        }}
                        onClick={()=>setSignalModal([false,''])}
                        >
                          No <i className='fas fa-close'></i> 
                        </span>

                        <span style={{
                            border:'solid 1px transparent',
                            borderRadius:'5px',
                            padding:'5px 15px',
                            backgroundColor:'rgba(0,255,0,0.1)'

                        }}
                        onClick={()=>signalUser()}
                        >
                            Yes <i className='fas fa-check'></i>
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signal