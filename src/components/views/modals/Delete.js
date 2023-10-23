import React,{useState} from 'react'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'
import Saving from './Saving'

const Delete =({ setDeleteModal,postId})=>{

    const [loading ,setLoading] = useState(false)

async function handleDelete(){
    const body={
        postId:postId
    }

    setLoading(true)
    
    let temp = await request({url:`http://${ipAdress}:5000/api/post/deletePost` ,method:'delete' ,body:body})
    console.log(temp)
    setLoading(false)
    setDeleteModal([false,''])
    
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

                    <div>Are you sure ?</div><br/>
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
                            backgroundColor:'rgba(255,0,0,0.5)'
                        }}
                        onClick={()=>setDeleteModal([false,''])}
                        >
                          No <i className='fas fa-close'></i> 
                        </span>

                        <span style={{
                            border:'solid 1px transparent',
                            borderRadius:'5px',
                            padding:'5px 15px',
                            backgroundColor:'rgba(0,255,0,0.5)',

                        }}
                        onClick={()=>handleDelete()}
                        >
                            Yes <i className='fas fa-check'></i>
                        </span>
                    </div>
                </div>
            </div>
            {loading ? <Saving text='Deleting'/> :''}

        </React.Fragment>
    )
}

export default Delete