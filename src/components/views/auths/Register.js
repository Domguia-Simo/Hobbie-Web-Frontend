import React,{useState}  from 'react'
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
        let temp = await request({method:'post' ,url:'http://localhost' ,body:data})
        setRespond(temp)
        console.log(respond)

    }

    return(
        <React.Fragment>
            <div className='auths-box'>
            <div className='auths-box-title'>
                <h2>Hobbie</h2><br/>
                <center>Register &nbsp; 
                    {
                    loading ? 
                    <img src={require('../../../assets/images/loaders/loading.gif')} width='18px' height="18px"/>
                    :''
                    }</center>
            </div> 

            <label htmlFor="name">Full Name</label>
            <input 
                type="text" 
                id="name" 
                placeholder="Ex : Blaze Aron"
                name="fullName"
                value={data.fullName}
                onChange={(e)=>handleChange(e)}
            />

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Ex : mrABCD@gmail.com"
                name="email"
                value={data.email}
                onChange={(e)=>handleChange(e)}
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                placeholder="Ex : Bl4ze@ron237"
                name="password"
                value={data.password}
                onChange={(e)=>handleChange(e)}
            />
            
            <label htmlFor="confirm">Confirm Password</label>
            <input 
                type="password" 
                id="confirm" 
                placeholder="Ex : Bl4ze@ron237"
                name="confirm"
                value={data.confirm}
                onChange={(e)=>handleChange(e)}
            />

            <hr/>
            <div className='auths-box-button'>
                {/* <input type="button" value="Cancel"/> */}
                <input 
                    type="submit" 
                    value="Register"
                    onClick={submit}
                />
            </div>
        </div>

        <div className='auths-box-more'>
            {/* <span>Forgot Password</span> 
            <span>No Account</span>  */}
        </div>
        </React.Fragment>
    )
}

export default Register