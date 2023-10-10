
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../assets/styleSheets/editProfileStyles/editProfileStyles.css'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'

const EditProfile =()=>{
let navigate = useNavigate()
    const [info ,setInfo] = useState({
        name:'',
        bio:'',
    })
    const [picture ,setPicture] = useState('')
    const [background ,setBackground] = useState('')

    const [tempPicture ,setTempPicture] = useState('')
    const [tempBackground ,setTempBackground] =  useState('')

    const [removePicture ,setRemovePicture] = useState(false)
    const [removeBackground ,setRemoveBackground] = useState(false)


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
        console.log(picture)
        if(picture == 'no'){
            let body1 = {userId:localStorage.getItem('userId')}
            let temp1 =await  request({body:body1 ,method:'post',url:`http://${ipAdress}:5000/api/userAction/removeProfilePicture`})
            console.log(temp1)
            localStorage.setItem('profilePicture',JSON.stringify({name:'no' ,file:'no'}))
        }else{
            const formData1 = new FormData()
            formData1.append('file',picture)
               await fetch(`http://${ipAdress}:5000/api/userAction/uploadProfilePicture/${userId}`,{
                    method:'post',
                    body:formData1
                })
                .then(res => res.json())
                .then(async(data) =>{
                    console.log(data)
    
                    let url = `http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${data.profilePicture}`
                    const xhr1 = new XMLHttpRequest()
                    xhr1.responseType = 'blob'
                    await xhr1.open('GET',url)
                    await xhr1.send()
    
                    xhr1.onload = async ()=>{
                        const reader1 = new FileReader()
                        reader1.onload = async()=>{
                            console.log(reader1.result)
                            await localStorage.setItem('profilePicture',JSON.stringify({name:data.profilePicture ,file:reader1.result}))
                        }
                       await reader1.readAsDataURL(xhr1.response)
                    }
    
                })
                .catch(err => console.log(err))
        }
    }

    if(background != ''){
        console.log(background)

        if(background == 'no'){
            let body2 = {userId:localStorage.getItem('userId')}
            let temp2 =await  request({body:body2 ,method:'post',url:`http://${ipAdress}:5000/api/userAction/removeProfileBackground`})
            console.log(temp2)
            localStorage.setItem('profileBackground',JSON.stringify({name:'no' ,file:'no'}))
        }else{
            const formData2 = new FormData()
            formData2.append('file',background)
               await fetch(`http://${ipAdress}:5000/api/userAction/uploadProfileBackgroundPicture/${userId}`,{
                    method:'post',
                    body:formData2
                })
                .then(res => res.json())
                .then(async (data) => {
                    console.log(data)
    
                    let url = `http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${data.profileBackground}`
                    const xhr2 = new XMLHttpRequest()
                    xhr2.responseType = 'blob'
                    await xhr2.open('GET',url)
                    await xhr2.send()
    
                    xhr2.onload = async()=>{
                        const reader2 = new FileReader()
                        reader2.onload =async()=>{
                            console.log(reader2.result)
                           await localStorage.setItem('profileBackground',JSON.stringify({name:data.profileBackground ,file:reader2.result}))
                        }
                      await  reader2.readAsDataURL(xhr2.response)
                    }
    
                })
                .catch(err => console.log(err))
        }
    }

    setTimeout(()=>{
        navigate(-1)
    },750)
    // window.location.pathname ='/home/profile'
}

function handlePictureChange(e){
    if(e.target.files.length != 0){
        const reader = new FileReader()
            reader.onload =()=>{
                setTempPicture(reader.result)
            }
        reader.readAsDataURL(e.target.files[0])
        setPicture(e.target.files[0])
    }
}

function handleBackgroundChange(e){
    if(e.target.files.length != 0){
        const reader = new FileReader()
            reader.onload =()=>{
                setTempBackground(reader.result)
            }
        reader.readAsDataURL(e.target.files[0])
        setBackground(e.target.files[0])
    }
}

function handleFileClose(file){
    if(file == 'picture'){
        console.log('remove picture')
        if(tempPicture != '')
            setTempPicture('')
        else{
            setPicture('no')
            setRemovePicture(true)
        }
        
    }else{
        console.log('remove background')
        if(tempBackground != '')
            setTempBackground('')
        else{
            setBackground('no')
            setRemoveBackground(true)
        }
    }
}

const profilePicture = JSON.parse(localStorage.getItem('profilePicture')).file
const profileBackground = JSON.parse(localStorage.getItem('profileBackground')).file

    return(
        <React.Fragment>
            <div className='edit-form'>

            <h2> <span className='fas fa-arrow-left' onClick={()=>navigate(-1)}></span> &nbsp;&nbsp;Edit your profile</h2>

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

                    <div className='file'>
                        {
                            profilePicture == 'no' && tempPicture == '' || removePicture ?

                            <label htmlFor='picture'>
                                <span className='fas fa-image'></span>
                            </label>
                            
                            :
                            <>
                            {
                                tempPicture == '' ?
                                <img src={profilePicture} style={{maxHeight:'300px'}} width='100%' className='rounded'/>
                                :
                                <img src={tempPicture} style={{maxHeight:'300px'}} width='100%' className='rounded' />
                            }
                            </>
                        }
                    </div>

                        {
                             profilePicture == 'no' && tempPicture == '' || removePicture ?
                              '':
                                <div className='file-actions'>
                                    <span onClick={()=>handleFileClose('picture')}> <i className='fas fa-trash-can'></i> remove</span>|
                                    <label htmlFor='picture'>
                                        <span> <i className='fas fa-recycle'></i> change</span>
                                    </label>
                                </div>
                        }
                        
                        <input 
                            type='file' 
                            name='file' 
                            id='picture'
                            onChange={(e)=>handlePictureChange(e)}
                            style={{display:'none'}}
                        />
               </div>

               <div>
                    <h3> Profile Background</h3>
                    <div className='file'>

                    {
                        profileBackground == 'no' && tempBackground == '' || removeBackground ?
                            <label htmlFor='background'>
                                <span className='fas fa-image'></span>
                            </label>
                        :
                            <>
                            {
                                tempBackground == '' ?
                                <img src={profileBackground} style={{maxHeight:'300px'}} width='100%' />
                                :
                                <img src={tempBackground} style={{maxHeight:'300px'}} width='100%' />
                            }
                            </>
                        }
                    </div>

                        {
                            profileBackground == 'no' && tempBackground == ''  || removeBackground ? 
                            '':
                            <div className='file-actions'>
                                <span onClick={()=>handleFileClose('background')}> <i className='fas fa-trash-can'></i> remove</span>|
                                <label htmlFor='background'>
                                    <span> <i className='fas fa-recycle'></i> change</span>
                                </label>
                            </div>
                        }

                        <input 
                            type='file' 
                            name='file' 
                            id='background'
                            onChange={(e)=>handleBackgroundChange(e)}
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
                </div><br/><br/>
                </center>

            </div>
        </React.Fragment>
    )
}

export default EditProfile