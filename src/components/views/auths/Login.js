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
        localStorage.setItem('following' ,temp.following)
        localStorage.setItem('follower',temp.follower)

        //Storing some files in the localstorage
        //Saving locally th user's profile picture
        const reader = new FileReader()
        if(temp.profilePicture != 'no'){
            console.log('convert')
            let url = `http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${temp.profilePicture}`
    
            const xhr1 = new XMLHttpRequest()
            xhr1.responseType = 'blob'
            xhr1.open('GET',url)
            xhr1.send()
    
            xhr1.onload =() =>{
                 reader.onload = () =>{
                     localStorage.setItem('profilePicture',JSON.stringify({name:temp.profilePicture ,file:reader.result}))
                 }
                 reader.readAsDataURL(xhr1.response)
            }
        }else{
            localStorage.setItem('profilePicture',JSON.stringify({name:temp.profilePicture ,file:temp.profilePicture}))
        }

        //Saving locally the profile background image
        if(temp.profileBackground != 'no'){
            let url2 = `http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${temp.profileBackground}`
            const xhr2 = new XMLHttpRequest()
            xhr2.responseType = 'blob'
            xhr2.open('GET',url2)
            xhr2.send()
                const reader2 = new FileReader()

            xhr2.onload =()=>{
                reader2.onload =() =>{
                    localStorage.setItem('profileBackground',JSON.stringify({name:temp.profileBackground,file:reader2.result}))
                }
                reader2.readAsDataURL(xhr2.response)
            }
        }else{
            localStorage.setItem('profileBackground',JSON.stringify({name:temp.profileBackground ,file:temp.profileBackground}))
        }

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