import React,{useState}  from 'react'
import {Link} from 'react-router-dom'
import request from '../../request/Request'

const Login =()=>{

const [data ,setData] = useState({
    email:'',
    password:'',
})
const [respond ,setRespond] = useState()
const [loading,setLoading] = useState(true)

function handleChange(e){
    setData({...data ,[e.target.name]:e.target.value})
}
const submit = async()=>{
    // console.log(data)
    let temp = await request({method:'post' ,body:data,url:'http://localhost'})
    setRespond(temp)
    console.log(respond)

}

    return(
        <React.Fragment>
            <div className='auths-box'>
               <div className='auths-box-title'>
                    <center>
                    <h1>Hobbie</h1>
                        {/* {loading ?
                         <img src={require('../../../assets/images/loaders/loading.gif')} width='18px' height="18px"/>
                        :''
                        } */}
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