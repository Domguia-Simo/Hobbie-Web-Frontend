import React,{useState}  from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import request from '../../request/Request'

const Register =()=>{
    let navigate = useNavigate()

    const [data ,setData] = useState({
        userName:'',
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
        let temp = await request({method:'post' ,url:'http://localhost:5000/api/user/register' ,body:data})
        console.log(temp)
            if(temp.message){
                navigate('auths/login')
            }
        setRespond(temp)
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
                type="text" 
                id="name" 
                placeholder="User Name"
                name="userName"
                value={data.userName}
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