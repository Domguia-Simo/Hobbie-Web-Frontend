import React,{useState}  from 'react'
import request from '../../request/Request'

const Validate =()=>{

const [code ,setCode] = useState('')
const [respond ,setRespond] = useState()
const [loading ,setLoading] = useState(false)

function handleChange(e){setCode(e.target.value)}

const submit = async()=>{
    setLoading(true)
    let temp = await request({method:'post',body:code ,url:'http://localhost'})
    setRespond(temp)
    console.log(respond)
    setLoading(false)

}

    return(
        <React.Fragment>
             <div className='auths-box'>
               <div className='auths-box-title'>
                    <center>
                    <h1>Hobbie</h1>
                        {
                            <img 
                                src={require('../../../assets/images/loaders/loading4.gif')}
                                className='loader'
                                style={{visibility:loading ? 'visible':'hidden'}} 
                            />
                        }</center>
                    
                </div> 


                {/* <label htmlFor="code">Email Verification Code</label> */}
                <input 
                    type="text" 
                    id="code" 
                    placeholder="Email Verification Code"
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

                <div className='auths-box-more'>
                <span>Resend Verification Code</span> 

                </div>

            </div>

        </React.Fragment>
    )
}

export default Validate