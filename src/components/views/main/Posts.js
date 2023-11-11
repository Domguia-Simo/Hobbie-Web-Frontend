import React,{useState,useMemo,useEffect,useRef ,useContext} from 'react'
import { useNavigate ,useLocation } from 'react-router-dom'
import NoAccount from '../modals/NoAccount'
import request from '../../request/Request'
import { ipAdress,stringDate } from '../../../generals'
import Comment from './Comment'
import Saving from '../modals/Saving'
import Signal from '../modals/Signal'
import Delete from '../modals/Delete'

import InfiniteScroll from 'react-infinite-scroll-component'

//context provider
import { SocketContext, ThemeContext } from '../../contextProvider/Provider'

//styling sheet
import '../../../assets/styleSheets/postStyles/postStyles.css'

// const socketClient = require('socket.io-client')

// const io = socketClient.io

//socket connection with the server
// let socket = new io(`http://${ipAdress}:5000`)

const Posts = ({InCommingposts ,viewing ,canDelete}) => {
    let navigate = useNavigate()
  
    const socket = useContext(SocketContext)

    const mainContent = useRef(null)
    const [posts ,setPosts] = useState(InCommingposts)

    const [NoAccountModal ,setNoAccountModal] = useState(false)
    const [signalModal ,setSignalModal] = useState([false,'',''])
    const [deleteModal ,setDeleteModal] = useState([false ,''])

    const [user ,setUser] = useState(false)
    const [playing ,setPlaying] = useState({video:{} ,e:''})
    const [displayComment ,setDisplayComment] = useState([false,{}])
    const [switchView ,setSwitchView] = useState(false)

    const [follow ,setFollow] = useState(false)

    
    const [page ,setPage] = useState(0)
    const [loadMoreCall ,setLoadMoreCall] = useState(false)

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    },[useLocation()])

let theme = useContext(ThemeContext).theme

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
            {/* <span dangerouslySetInnerHTML={{ __html: newText }}/> */}

            <strong onClick={()=>{}}>... Read More </strong>
            </>
            )
    }

return <span dangerouslySetInnerHTML={{ __html: text }}/> 
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

return <span dangerouslySetInnerHTML={{ __html: text}}/>
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

        if(post.following){
            return
        }

    let body={
        userId:localStorage.getItem('userId'),
        followingId : post.userId
    }

    setFollow(true)

    let temp = await request({url:`http://${ipAdress}:5000/api/userAction/followUser`,method:'post',body:body})
        console.log(temp)

           let newFollowing 
           let tempFollowing = localStorage.getItem('following').split(',')

            if(localStorage.getItem('following')){
                newFollowing = tempFollowing
                newFollowing.push(post.userId)
            }else{
                newFollowing = post.userId
            }

        localStorage.setItem('following',newFollowing)


    setFollow(false)

}

function displayFile(post){
    let ext = post.fileName.split('.')
    ext = ext[ext.length - 1]
        ext = ext.toLowerCase()
    
    if(ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'jpeg' || ext == 'bmp' || ext == 'webp' || ext == 'jfif'){
        return  (
                <img src={ `http://${ipAdress}:5000/postFiles/${post.userId}/${post._id}/${post.fileName}`}/>
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

function closeOptions(e){
    // console.log(e.target.className)
    if(e.target.className != 'options'){
        let newPosts = posts.map(post => {
                post.option = false
            return post
        })
        setPosts(newPosts)
    }
}
async function viewProfile(post){
    setSwitchView(true)

    let body = {
        userId:post.userId
    }
    let temp = await request({method:'post',url:`http://${ipAdress}:5000/api/userAction/viewProfile`,body:body})
    // console.log(temp)
    setSwitchView(false)

    navigate('/viewProfile',{state:temp})
}

async function signalAccount(post){
    setSignalModal([true ,post.userName ,post.userId])
}

async function deletePost(post){
    setDeleteModal([true,post._id])
}


let displayPosts = posts.map(post =>{

        for(let i =0;i<post.like.length;i++){
            if(post.like[i].likerId == localStorage.getItem('userId')){
                post.liked = true
                break;
            }
        }

        post.following = false
        if(localStorage.getItem('following')){

            let following = localStorage.getItem('following').split(',')
            for(let i =0;i<following.length;i++){
                if(following[i] == post.userId){
                    post.following = true
                    break;
                }
            }
        }

        if(post.display == 'none'){
            return
        }

        if(post.description){
            // console.log(post.description)
            // post.description = post.description.replaceAll('\n','<br />')
        }

    return( 
            <div className='post-container' key={post._id}  style={{backgroundColor:theme == 'dark' ? 'rgba(30,30,35,1)':'',color:theme == 'dark'?'white':''}} >
                    
                <div className='post-head'>
                    <div>
                        {post.profilePicture ? 
                            <img src={`http://${ipAdress}:5000/userPictures/${post.profilePicture}`} />
                        :
                        <img src={require('../../../assets/images/tempPp.jpg')} />
                        }
                        <div>
                            <span className='bold' style={{letterSpacing:'1.5px'}}>{post.userName}</span>
                            <span className=''>{post.dateOfCreation.split(' ')[1] ? stringDate(post.dateOfCreation.split(' ')[0]) +' | '+post.dateOfCreation.split(' ')[1]:stringDate(post.dateOfCreation.split(' ')[0])}</span>
                        </div>
                    </div>

                        
                            <div style={{
                                display:'flex',
                                alignItems:'flex-end',
                                columnGap:'12px',
                            }}>
                        
                            {viewing ? 
                            <>
                                {
                                    canDelete ? <span onClick={()=>deletePost(post)}><span className='fas fa-trash-can' style={{marginTop:'18px'}} ></span> Delete</span>:''
                                }
                            </>
                            :
                                <>
                                    <span style={{
                                        padding:'5px 7px',
                                        borderRadius:'5px',
                                        color:post.following ? theme ==  'dark' ? 'rgba(255,255,255,0.5)':'rgba(0,0,0,0.4)': theme ==  'dark' ? 'rgba(255,255,255,0.8)':'rgba(0,0,0,0.9)',
                                        // backgroundColor:'white',
                                        fontWeight:'bold',
                                        display:localStorage.getItem('userId') == post.userId ? 'none' : ''

                                    }} 
                                        onClick={()=>followUser(post)}
                                    >
                                    {
                                        post.following ? 'Following' : 'Follow'
                                    } 
                                    </span> 
                                    

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
                                </>
                            }
                            </div>

                    {
                        post.option ? 
                        <div className='post-options' style={{backgroundColor:theme == 'dark' ? 'rgba(50,50,50,1)':''}}>
                            
                            <span onClick={()=>viewProfile(post)} ><i className='fas fa-eye'></i> View Profile</span>

                            <span onClick={()=>signalAccount(post)}> <i className='fas fa-thumbs-down'></i> Signal</span>
                        </div>
                             : ''
                    }
                </div>

                <div className='post-body'>
                    <div className='content'>
                    {displayFile(post)}

                    </div>
                    { post.description.length == 0 ? '':
                    <div className='description'  style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}>
                        
                            
                        <span style={{color:theme == 'dark' ? 'rgb(255, 136, 0)':'darkblue'}} > {post.userName}: </span>
                        
                    {
                        <>
                        {
                            post.fullText ? 
                            <span onClick={()=>{showFullText(post._id)}} >
                                {longText(post.description)}
                            </span>  :
                            <span onClick={()=>{showFullText(post._id)}} >
                                {shortText(post.description)}
                            </span>
                         }
                        </> 
                    }
                    </div>
                    }
                    <div className='actions' style={{borderTop:theme == 'dark' ? 'solid 1px rgba(255,255,255,0.1)':''}} >
                        <div onClick={()=>handleLike(post)}  style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}>
                        {post.like.length} <span className={post.liked ? 'fas fa-heart':'far fa-heart'} style={{color:'rgba(255,0,0,0.6)'}}></span>
                        </div>

                        <div onClick={()=>handleComment(post)} style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}>
                        {post.comment.length} <span className='fas fa-comment' style={{color:theme ==  'dark'? 'skyblue':'rgba(0,0,255,0.6)'}}></span>
                        </div>

                        <div onClick={()=>handleDownload(post)} >
                           
                            <span className='fas fa-download' style={{color:'rgba(100,200,100,0.7)'}}></span>
                            
                        </div>

                        <div onClick={()=>handleShare()}>
                            <span className='fas fa-share' style={{color:theme == 'dark' ?'rgba(255,255,255,0.7)': 'rgba(0,0,0,0.6)'}}></span>
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

            {deleteModal[0] ? <Delete setDeleteModal={setDeleteModal} postId={deleteModal[1]}/>:'' }

            { switchView ? <Saving text={'Loading ... '}/> : '' }

            {follow ? <Saving text={'Wait a moment ...'}/>:''}

            {signalModal[0] ? <Signal userName={signalModal[1]} setSignalModal={setSignalModal} userId={signalModal[2]}/>:''}
            
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
              

            <div className='full-post-body' onClick={(e)=>closeOptions(e)} ref={mainContent}>
                {displayPosts}

            </div>
                {/* <span className='end'></span> */}

            <br/>
            
            
        </React.Fragment>
    )
}

export default Posts


