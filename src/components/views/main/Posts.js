import React,{useState,useMemo,useEffect,useRef ,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoAccount from '../modals/NoAccount'
import request from '../../request/Request'
import { ipAdress,stringDate } from '../../../generals'
import Comment from './Comment'

//context provider
import { ThemeContext,PostContext } from '../../contextProvider/Provider'

//styling sheet
import '../../../assets/styleSheets/postStyles/postStyles.css'

const socketClient = require('socket.io-client')

const io = socketClient.io

//socket connection with the server
let socket = new io(`http://${ipAdress}:5000`)

const Posts = ({InCommingposts}) => {
  
    const [posts ,setPosts] = useState(InCommingposts)
    const [NoAccountModal ,setNoAccountModal] = useState(false)
    const [user ,setUser] = useState(false)
    const [playing ,setPlaying] = useState({video:{} ,e:''})
    const [displayComment ,setDisplayComment] = useState([false,{}])

    const [scrollY ,setScrollY] = useState(0)

useEffect(()=>{
    if(InCommingposts.length != 0){
        setPosts(InCommingposts)
    }
},[0,InCommingposts])

    useMemo(()=>{
        if(localStorage.getItem('userId')){
            setUser(true)
        }
    },[0])


    //Function to handle post Options 
function handleOptions(id){
    if(!user){
        setNoAccountModal(true)
        return
    }
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.option = !post.option
        }
        return post
    })
    setPosts(newPosts)
}

const handleLike=async(post)=>{
    if(!user){
         setNoAccountModal(true)
         return
    }
        let body={
            likerId:localStorage.getItem('userId'),
            likerName:localStorage.getItem('userName'),
            postId:post._id
        }
        socket.emit('like',body)

}
socket.on('liked',( {id ,newLike})=>{
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.like = newLike
            post.liked = true
        }
        return post
    })
    setPosts(newPosts)
})
socket.on('unLiked',( {id ,newLike})=>{
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.like = newLike
            post.liked = false
        }
        return post
    })
    setPosts(newPosts)
})

    //Function to handle post comments
const handleComment=async(post)=>{
    if(!user){
         setNoAccountModal(true)
         return
    }
    setDisplayComment([true ,post,socket])
}

    //Function to handle post Like
const handleDownload=async(post)=>{
    if(!user){
         setNoAccountModal(true)
         return
    }
}

    //Function to handle post Like
function handleShare(){
    if(!user){
         setNoAccountModal(true)
         return
    }
}

//to disable the modal after a few second
useMemo(()=>{
    if(NoAccountModal){
        clearTimeout()
        setTimeout(()=>{
            setNoAccountModal(false)
        },10000)
    }
},[NoAccountModal])

function shortText(text){
    let newText = []

    if(text.length > 200 ){
        for(let i=0;i<text.length;i++){
            if(i == 200){
                break;
            }
            newText[i] = text[i]
        }
        return (
            <>
            {newText}
            <strong onClick={()=>{}}>... Read More </strong>
            </>
            )
    }

return text
}
function longText(text){

    if(text.length > 200 ){

        return (
            <>
            {text}
            <strong onClick={()=>{}}> Read Less </strong>
            </>
            )
    }

return text
}

//To show or hide the description of a  post
function showFullText(id){
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.fullText = !post.fullText
        }
        return post
    })
    setPosts(newPosts)
}

function playVideo(e,post){
    let id = post._id
    console.log(playing)
    if(playing.video._id){
        console.log('another id playing')
        pauseVideo(playing.e ,playing.video)
    }
    e.target.play()
    setPlaying({video:post ,e:e})
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.playing = true
        }
        return post
    })
    setPosts(newPosts)
}

function pauseVideo(e ,post){
    let id = post._id
    e.target.pause()

    let newPosts = posts.map(post => {
        if(post._id == id){
            post.playing = false
        }
        return post
    })
    setPosts(newPosts)
    setPlaying({video:{},e:''})

}

function verifyFocus(e,post){
let video = e.target
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

          } else {
            pauseVideo(e,post);
            setPlaying({video:{},e:''})
          }
        });
      });
        // Observe the video element.
  observer.observe(video);
}

function closePost(post){
    let id = post._id
    let newPosts = posts.map(post => {
        if(post._id == id){
            post.display = 'none'
        }
        return post
    })
    setPosts(newPosts)
}

async function followUser(post){

    console.log(post.userId)
    let body={
        userId:localStorage.getItem('userId'),
        followingId : post.userId
    }
    let temp = await request({url:`http://${ipAdress}:5000/api/userAction/followUser`,method:'post',body:body})
        console.log(temp)

}


function displayFile(post){
    let ext = post.fileName.split('.')
    ext = ext[ext.length - 1]
        ext = ext.toLowerCase()
    
    if(ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'jpeg' || ext == 'bmp' || ext == 'webp' || ext == 'jfif'){
        return  (
                <img src={`http://${ipAdress}:5000/postFiles/${post.userId}/${post._id}/${post.fileName}`}/>
            )
    }
    else if(ext == 'mp4' || ext == 'avi' || ext == 'mpeg' || ext == 'ts' || ext == 'mkv'){
        return (
            <div className='video-container'>
                    { <span style={{
                        visibility: post._id == playing.video._id ? 'hidden':'visible'
                    }} className='fas fa-play play-btn'></span>}
                <video 
                    src={`http://${ipAdress}:5000/postFiles/${post.userId}/${post._id}/${post.fileName}`} 
                    width='100%' 
                    autoFocus
                    controls={post._id == playing.video._id}
                    controlsList="nodownload"
                    loop
                    onClick={(e)=>playVideo(e,post)}
                    onPlay={(e)=>verifyFocus(e,post)}
                    // onFocus={(e)=>playVideo(e,post)}
                    onBlur={(e)=>pauseVideo(e,post)}
                >

                </video>
            </div>
        )
    }
}

let displayPosts = posts.map(post =>{

        for(let i =0;i<post.like.length;i++){
            if(post.like[i].likerId == localStorage.getItem('userId')){
                post.liked = true
                break;
            }
        }
        if(post.display == 'none'){
            return
        }

    return(
            <div className='post-container' key={post._id} >
                    
                <div className='post-head'>
                    <div>
                        {post.profilePicture ? 
                            <img src={`http://${ipAdress}:5000/userPictures/${post.profilePicture}`} />
                        :
                        <img src={require('../../../assets/images/tempPp.jpg')} />
                        }
                        <div>
                            <span className='bold'>{post.userName}</span>
                            <span className=''>{stringDate(post.dateOfCreation)}</span>
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        alignItems:'flex-end',
                        columnGap:'12px'
                    }}>
                        <span style={{
                            padding:'5px 7px',
                            borderRadius:'5px',
                            color:'rgba(0,0,0,0.9)',
                            backgroundColor:'white',
                            fontWeight:'bold',
                            display:localStorage.getItem('userId') == post.userId ? 'none' : ''

                        }} 
                            onClick={()=>followUser(post)}
                        >Follow</span>
                        <span 
                        className='options' 
                        onClick={()=>handleOptions(post._id)}
                        style={{display:localStorage.getItem('userId') == post.userId ? 'none' : ''}}
                        >...</span>

                        <span 
                        className='fas fa-close options' 
                        onClick={()=>closePost(post)}
                        style={{display:localStorage.getItem('userId') == post.userId ? '' : 'none'}}
                        ></span>
                    </div>
                    {
                        post.option ? 
                        <div className='post-options'>
                            <span>View Profile</span>
                            <span>Signal</span>
                        </div>
                             : ''
                    }
                </div>

                <div className='post-body'>
                    <div className='content'>
                    {displayFile(post)}

                    </div>
                    { post.description.length == 0 ? '':
                    <div className='description'>
                        
                            
                        <span style={{color:'darkblue'}}> {post.userName}: </span>
                        
                    {
                        <>
                        {
                            post.fullText ? 
                            <span onClick={()=>{showFullText(post._id)}}>
                                {longText(post.description)}
                            </span>  :
                            <span onClick={()=>{showFullText(post._id)}}>
                                {shortText(post.description)}
                            </span>
                         }
                        </> 
                    }
                    </div>
                    }
                    <div className='actions'>
                        <div onClick={()=>handleLike(post)}>
                        {post.like.length} <span className={post.liked ? 'fas fa-heart':'far fa-heart'} style={{color:'rgba(255,0,0,0.6)'}}></span>
                        </div>

                        <div onClick={()=>handleComment(post)}>
                        {post.comment.length} <span className='fas fa-comment' style={{color:'rgba(0,0,255,0.6)'}}></span>
                        </div>

                        <div onClick={()=>handleDownload(post)}>
                           
                            <span className='fas fa-download' style={{color:'rgba(100,200,100,0.7)'}}></span>
                            
                        </div>

                        <div onClick={()=>handleShare()}>
                            <span className='fas fa-share' style={{color:'rgba(0,0,0,0.6)'}}></span>
                        </div>

                    </div>
                </div>

                <div className='post-foot'>

                </div>

            </div>
    )
})

    return(
        <React.Fragment>
            {
                displayComment[0] ? 
                    <Comment 
                        displayComment={displayComment[1]} 
                        setDisplayComment={setDisplayComment} 
                        socket={displayComment[2]} 
                        posts={posts} 
                        setPosts={setPosts} 
                    /> : ''
            }
             
            {NoAccountModal ? <NoAccount setModal={setNoAccountModal}/> : ''}
            <div className='full-post-body'>
             {displayPosts}
            </div>
            <br/>
            
            
        </React.Fragment>
    )
}

export default Posts


