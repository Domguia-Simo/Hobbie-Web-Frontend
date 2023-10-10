import React,{useState} from 'react'
import { ipAdress } from '../../../generals'
import { useNavigate } from 'react-router-dom'
import '../../../assets/styleSheets/createPostStyles/createPostStyles.css'
import request from '../../request/Request'

const CreatePostForm = () => {
let navigate = useNavigate()
    const [description ,setDecription] =  useState('')
    const [file ,setFile] = useState('')
    const [tempImage ,setTempImage] = useState('')
    const [loading ,setLoading] = useState(false)

    //To have the current Date
let date = new Date
date = date.getDate() +'/'+ (date.getMonth()+1)+'/'+date.getFullYear();

const sendPost=async()=>{
    console.log(description ,file)
    let body = {
        userId:localStorage.getItem('userId'),
        description:description,
        dateOfCreation:date,
        userName:localStorage.getItem('userName'),
        profilePicture:JSON.parse(localStorage.getItem('profilePicture')).name
    }
    setLoading(true)

        let temp = await request({method:'post',url:`http://${ipAdress}:5000/api/post/createPost`,body:body})
            console.log(temp)

        let postId = temp.postId
        let userId = localStorage.getItem('userId')
        console.log(userId ,postId)

        let formData = new FormData
            formData.append('file',file)
            console.log(formData)
            fetch(`http://${ipAdress}:5000/api/post/uploadFile/${userId}/${postId}`,{
                method:'post',
                body:formData
            })
            .then(res=>res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    setLoading(false)
    
    navigate(-1)
}

const handleFileChange = async(e)=>{
    if(e.target.files.length != 0){
        console.log(e.target.files.length)
        const reader = new FileReader()
        reader.onload = () =>{
            setTempImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    setFile(e.target.files[0])
    }
}
    return(
        <React.Fragment>
            
            <div className='post-form'>

                <h2> <span className='fas fa-arrow-left' onClick={()=>navigate(-1)} ></span> &nbsp;&nbsp;&nbsp; Create a post</h2>
                
                <div>
                    <center>
                        <label htmlFor='file' className='file'>
                            {
                                tempImage == '' ?
                                <span className='fas fa-image'></span>
                                :
                                <>
                                   {
                                    file.type.split('/')[0] == 'image' ?
                                    <img src={tempImage} style={{maxHeight:'400px'}} width='100%' />
                                    :
                                    <video 
                                        src={tempImage}
                                        style={{maxHeight:'400px' ,backgroundColor:'rgba(0,0,0,0.95)'}}
                                        width='100%'
                                        controls={true}
                                        controlsList='nodownload'
                                    >
                                    </video>
                                    }
                                </>
                                
                            }
    
                            <div className='upload-button'>
                                <span className='fas fa-plus'></span>  Upload a file
                            </div>
                        </label>
                        <input 
                            type='file' 
                            name='file' 
                            id='file'
                            onChange={(e)=>handleFileChange(e)}
                            style={{display:'none'}}
                        />
                    </center><br/>
                </div>

                <center>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e)=>setDecription(e.target.value)}
                            style={{resize:'none'}}
                            placeholder='Hey! any description... ?'
                        >

                        </textarea>
                    </div>
                </center>

                    <center>
                <div className='post-button' onClick={sendPost}>
                    Post
                </div>
                    </center><br/>

            </div>
        </React.Fragment>
    )
}

export default CreatePostForm