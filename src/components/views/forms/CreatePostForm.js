import React,{useState} from 'react'

import '../../../assets/styleSheets/createPostStyles/createPostStyles.css'
import request from '../../request/Request'

const CreatePostForm = () => {

    const [description ,setDecription] =  useState('')
    const [file ,setFile] = useState('')
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
        userName:localStorage.getItem('userName')
    }
    setLoading(true)

        let temp = await request({method:'post',url:'http://localhost:5000/api/post/createPost',body:body})
            console.log(temp)

        let postId = temp.postId
        let userId = localStorage.getItem('userId')
        console.log(userId ,postId)

        let formData = new FormData
            formData.append('file',file)
            console.log(formData)
            fetch(`http://localhost:5000/api/post/uploadFile/${userId}/${postId}`,{
                method:'post',
                body:formData
            })
            .then(res=>res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    setLoading(false)
}

    return(
        <React.Fragment>
            
            <div className='post-form'>

                <h2>Create a post</h2>
                
                <div>
                    <center>
                        <label htmlFor='file' className='file'>
                            <span className='fas fa-image'></span>
    
                            <div className='upload-button'>
                                <span className='fas fa-plus'></span>  Upload a file
                            </div>
                        </label>
                        <input 
                            type='file' 
                            name='file' 
                            id='file'
                            onChange={(e)=>setFile(e.target.files[0])}
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