import React,{useState} from 'react'
import { ipAdress } from '../../../generals'
import { useNavigate } from 'react-router-dom'
import request from '../../request/Request'
import Saving from '../modals/Saving'
// import ReactTextareaAutocomplete from 'react-textarea-autocomplete';
import EmojiPicker from 'react-emoji-picker';


import '../../../assets/styleSheets/createPostStyles/createPostStyles.css'
import {Picker} from 'emoji-mart';

const CreatePostForm = () => {
let navigate = useNavigate()
    const [description ,setDecription] =  useState('')
    const [file ,setFile] = useState('')
    const [tempImage ,setTempImage] = useState('')
    const [loading ,setLoading] = useState(false)

    const [category ,setCategory] = useState([])

    //To have the current Date
let date = new Date
date = date.getDate() +'/'+ (date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

const sendPost=async()=>{
    console.log(category.length)
    if(category.length > 4){
        alert('You should only choose atmost 4 category')
        return
    }
    if(category.length == 0){
        alert('Please choose atleat one category')
        return
    }

    setLoading(true)

    console.log(description ,file)
    let body = {
        userId:localStorage.getItem('userId'),
        description:description,
        dateOfCreation:date,
        userName:localStorage.getItem('userName'),
        profilePicture:JSON.parse(localStorage.getItem('profilePicture')).name,
        category:category
    }

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
            .then(data => {
                console.log(data)
                setLoading(false)
                navigate(-1)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

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

const handleCategory=(e)=>{
    let newCat = category
    let occurance = false
    for(let i=0;i<category.length;i++){
        if(newCat[i] == e.target.value)
            occurance = true
    }
    if(!occurance){
        newCat.push(e.target.value)
    }else{
        newCat.pop(e.target.value)    
    }
    setCategory(newCat)
        
    console.log(category.length)

    console.log(category)
}
let text = 'anime'

    return(
        <React.Fragment>
            {loading ? <Saving text={'Uploading ...'}/>:''}
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
    
                            {/* <div className='upload-button'>
                                <span className='fas fa-plus'></span>  Upload a file
                            </div> */}
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
                        {/* <EmojiPicker emoji={'smile'}/> */}
                        <textarea
                            value={description}
                            onChange={(e)=>setDecription(e.target.value)}
                            style={{resize:'none'}}
                            placeholder='Hey! any description... ?'
                        >
                            {/* <ReactTextareaAutocomplete/> */}
                        </textarea>
                    </div>
                </center>

                    Select one or more related category <br/>
                <center style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(85px ,1fr))' ,textAlign:'left',padding:'10px 30px',rowGap:'10px'}}>
                Anime/Mangas <input type='checkbox' value='Anime' onClick={(e)=>handleCategory(e)} />
                Computer <input type='checkbox' value='Computer' onClick={(e)=>handleCategory(e)}/>
                Fun <input type='checkbox' value='Fun' onClick={(e)=>handleCategory(e)}/>
                Fashion <input type='checkbox' value='Fashion' onClick={(e)=>handleCategory(e)}/>
                Games <input type='checkbox' value='Games' onClick={(e)=>handleCategory(e)}/>
                Music <input type='checkbox' value='Music' onClick={(e)=>handleCategory(e)}/>
                News <input type='checkbox' value='News' onClick={(e)=>handleCategory(e)}/>
                Sport <input type='checkbox' value='Sport' onClick={(e)=>handleCategory(e)}/>
                Technology <input type='checkbox' value='Technology' onClick={(e)=>handleCategory(e)}/>
                Other <input type='checkbox' value='Other' onClick={(e)=>handleCategory(e)}/>


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