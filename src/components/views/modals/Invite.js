import React,{useState} from 'react'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'
import Saving from './Saving'

const Invite =({userName ,setInviteModal,userId})=>{

    const [loading ,setLoading] = useState(false)

async function InviteUser(){
    let body={
        userId:userId,
        Inviter:localStorage.getItem('userId')
    }

    return
    setInviteModal([false,'',''])
    setLoading(true)

    let temp = await request({url:`http://${ipAdress}:5000/api/userAction/InviteUser`,method:'post',body:body})
    console.log(temp)

    setLoading(false)
    
}

    return(
        <React.Fragment>
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
                    letterSpacing:'1px',
                    lineHeight:'20px',
                    display:loading ? 'none':''
                }}> 
                   {/* <img src={require('../../../assets/images/loading.gif')} width='25px' height='25px'/> &nbsp;{text ? text: ''}
                    */}
                    <h3 style={{borderBottom:'solid 1px ',paddingBottom:'2px'}}>Invitation</h3>

                    <div>Inviting <b>{userName}</b> to follow you ?</div><br/>
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
                        onClick={()=>setInviteModal([false,''])}
                        >
                          No <i className='fas fa-close'></i> 
                        </span>

                        <span style={{
                            border:'solid 1px transparent',
                            borderRadius:'5px',
                            padding:'5px 15px',
                            backgroundColor:'rgba(0,255,0,0.1)'

                        }}
                        onClick={()=>InviteUser()}
                        >
                            Yes <i className='fas fa-check'></i>
                        </span>
                    </div>
                </div>
            </div>
            {loading ? <Saving text='Sending Invitation'/> :''}

        </React.Fragment>
    )
}

export default Invite