import React,{useState}  from 'react'
import request from '../../request/Request'

const Validate =()=>{

const [code ,setCode] = useState('')
const [respond ,setRespond] = useState()
const [loading ,setLoading] = useState(false)

function handleChange(e){setCode(e.target.value)}

const submit = async()=>{
    // console.log(code)
    let temp = await request({method:'post',body:code ,url:'http://localhost'})
    setRespond(temp)
    console.log(respond)
}

    return(
        <React.Fragment>
             <div className='auths-box'>
               <div className='auths-box-title'>
                    <h2>Hobbie</h2><br/>
                    <center>Validate Email &nbsp;
                        {
                            loading ?
                            <img src={require('../../../assets/images/loaders/loading.gif')} width='18px' height="18px"/>
                            :''
                        }</center>
                    
                </div> 


                <label htmlFor="code">Email Verification Code</label>
                <input 
                    type="text" 
                    id="code" 
                    placeholder="Ex : 10927"
                    onChange={(e)=>handleChange(e)}
                />

                <hr/>
                <div className='auths-box-button'>
                    {/* <input type="button" value="Cancel"/> */}
                    <input 
                        type="submit"
                        value="Verify"
                        onClick={submit}
                    />
                </div>
            </div>

            {/* <div className='auths-box-more'>
               <span>Forgot Password</span> 
               <span>No Account</span> 
            </div> */}
        </React.Fragment>
    )
}

export default Validate