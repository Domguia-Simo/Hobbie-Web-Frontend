
import React,{useState} from 'react'

import '../../../assets/styleSheets/editProfileStyles/editProfileStyles.css'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'

const EditProfile =()=>{

    const [info ,setInfo] = useState({
        name:'',
        bio:'',
    })
    const [picture ,setPicture] = useState('')
    const [background ,setBackground] = useState('')


function handleChange(e){
    setInfo({...info,[e.target.name]:e.target.value})
}

async function saveInfo(){
    let userId = localStorage.getItem('userId')
    if(info.name != '' || info.bio != ''){
        let body={
            name:info.name,
            bio:info.bio,
            userId:localStorage.getItem('userId')
        }
        let temp =await  request({body:body,method:'post',url:`http://${ipAdress}:5000/api/userAction/editProfile`})
        console.log(temp)
        localStorage.setItem('userName',temp.name)
    }

    if(picture != ''){
        const formData1 = new FormData()
        formData1.append('file',picture)
            fetch(`http://${ipAdress}:5000/api/userAction/uploadProfilePicture/${userId}`,{
                method:'post',
                body:formData1
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                localStorage.setItem('profilePicture',data.profilePicture)
            })
            .catch(err => console.log(err))
    }

    if(background != ''){
        const formData2 = new FormData()
        formData2.append('file',background)
            fetch(`http://${ipAdress}:5000/api/userAction/uploadProfileBackgroundPicture/${userId}`,{
                method:'post',
                body:formData2
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('profileBackground',data.profileBackground)
            })
            .catch(err => console.log(err))
    }
}

    return(
        <React.Fragment>
            <div className='edit-form'>
               <div>
                    <h3> Name</h3>
                    <input 
                        type='text'
                        placeholder={localStorage.getItem('userName')}
                        value={info.name}
                        onChange={(e)=>handleChange(e)}
                        name='name'
                    />
               </div>

               <div>
                    <h3> Profile Picture</h3>
                    <label htmlFor='picture' className='file'>
                            <span className='fas fa-image'></span>
    
                            {/* <div className='upload-button'>
                                <span className='fas fa-plus'></span>   profile picture
                            </div> */}
                        </label>
                        <input 
                            type='file' 
                            name='file' 
                            id='picture'
                            onChange={(e)=>setPicture(e.target.files[0])}
                            style={{display:'none'}}
                        />
               </div>

               <div>
                    <h3> Profile Background</h3>
                    <label htmlFor='background' className='file'>
                            <span className='fas fa-image'></span>
    
                            {/* <div className='upload-button'>
                                <span className='fas fa-plus'></span>   profile Background
                            </div> */}
                        </label>
                        <input 
                            type='file' 
                            name='file' 
                            id='background'
                            onChange={(e)=>setBackground(e.target.files[0])}
                            style={{display:'none'}}
                        />
               </div>

               <div>
                    <h3> Bio</h3>
                    <textarea
                        value={info.bio}
                        onChange={(e)=>handleChange(e)}
                        style={{resize:'none'}}
                        name='bio'
                        placeholder='Hey! any thing about you ?'
                    >
                    </textarea>
               </div>

                <center>
               <div className='post-button' onClick={()=>saveInfo()}>
                    Save
                </div>
                </center>

            </div>
        </React.Fragment>
    )
}

export default EditProfile