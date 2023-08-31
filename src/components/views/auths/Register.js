import React,{useState}  from 'react'
import {Link } from 'react-router-dom'
import request from '../../request/Request'

const Register =()=>{

    const [data ,setData] = useState({
        fullName:'',
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
        // console.log(data)
        // return
        let temp = await request({method:'post' ,url:'http://192.168.179.195:5000/api/user/register' ,body:data})
            console.log(temp)
            setRespond(temp)
            console.log(respond)

    }

    return(
        <React.Fragment>
            <div className='auths-box'>
            <div className='auths-box-title'>
                <center>
                <h1>Hobbie</h1>
                    {
                    loading ? 
                    <img src={require('../../../assets/images/loaders/loading.gif')} width='18px' height="18px"/>
                    :''
                    }</center>
            </div> 

            <input 
                type="text" 
                id="name" 
                placeholder="Full Name"
                name="fullName"
                value={data.fullName}
                onChange={(e)=>handleChange(e)}
            />

            <input 
                type="email" 
                id="email" 
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={(e)=>handleChange(e)}
            />

            <input 
                type="password" 
                id="password" 
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={(e)=>handleChange(e)}
            />
            
            <input 
                type="password" 
                id="confirm" 
                placeholder="Confirm Password"
                name="confirm"
                value={data.confirm}
                onChange={(e)=>handleChange(e)}
            />
            <center className='error-msg'>
                {respond ? respond.error:''}
            </center>
            <hr/>
            <div className='auths-box-button'>
                <input 
                    type="submit" 
                    value="Register"
                    onClick={submit}
                />
            </div>

            <div className='auths-box-more'>
               <Link to="/auths/login"> <span>Already Have an Account</span> </Link>
            </div>

        </div>
        </React.Fragment>
    )
}

export default Register