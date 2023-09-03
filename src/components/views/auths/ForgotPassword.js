import React,{useState}  from 'react'
import {Link } from 'react-router-dom'
import request from '../../request/Request'

const ForgotPassword =()=>{

    const [data ,setData] = useState({
        email:'',
        password:'',
        confirm:''
    })
    const [respond ,setRespond] = useState()
    const [loading ,setLoading] = useState(false)

    function handleChange(e){
        setData({...data ,[e.target.name]:e.target.value})
    }

    const submit = async()=>{
        setLoading(true)
        let temp = await request({method:'post' ,url:'http://localhost' ,body:data})
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

            <input 
                type="email" 
                id="email" 
                placeholder="Current Email"
                name="email"
                value={data.email}
                onChange={(e)=>handleChange(e)}
            />

            {/* <input 
                type="password" 
                id="password" 
                placeholder="New Password"
                name="password"
                value={data.password}
                onChange={(e)=>handleChange(e)}
            />
            
            <input 
                type="password" 
                id="confirm" 
                placeholder="Confirm New Password"
                name="confirm"
                value={data.confirm}
                onChange={(e)=>handleChange(e)}
            /> */}

            <hr/>
            <div className='auths-box-button'>
                <input 
                    type="submit" 
                    value="Authenticate"
                    onClick={submit}
                />
            </div>

            {/* <div className='auths-box-more'>
               <Link to="/auths/login"> <span>Already Have an Account</span> </Link>
            </div> */}

        </div>
        </React.Fragment>
    )
}

export default ForgotPassword