import React,{useState}  from 'react'
import {Link,useNavigate} from 'react-router-dom'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'

const Login =()=>{
    let navigate = useNavigate()

const [data ,setData] = useState({
    email:'',
    password:'',
})
const [respond ,setRespond] = useState()
const [loading,setLoading] = useState(false)

function handleChange(e){
    setData({...data ,[e.target.name]:e.target.value})
}
const submit = async()=>{
    setLoading(true)
    let temp = await request({method:'post' ,body:data,url:`http://${ipAdress}:5000/api/user/login`})
    console.log(temp)
    if(temp.id){
        localStorage.removeItem('userId')
        localStorage.setItem('userId',temp.id)
        localStorage.setItem('userName',temp.userName)

        navigate('/home/post');
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
                        }
                        </center>
                    
                </div> 

                <input
                    type="email" 
                    id="email" 
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e)=>{handleChange(e)}}
                />

                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={(e)=>{handleChange(e)}}
                />
                <center className='error-msg'>
                    {respond ? respond.error:''}
                </center>
                    <hr/>
                <div className='auths-box-button'>
                    <input
                        type="submit"
                        value="Login"
                        onClick={submit}
                      />
                </div>

                <div className='auths-box-more'>
                   <Link to="/auths/forgot_password"> <span>Forgot Password ?</span> </Link>
                    <Link to="/auths/register"> <span>No Account</span> </Link>
                </div>

            </div>

        </React.Fragment>
    )
}

export default Login