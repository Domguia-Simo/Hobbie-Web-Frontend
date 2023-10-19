import React,{useState,useEffect, useContext} from 'react'
import { ipAdress ,stringDate } from '../../../generals'
import request from '../../request/Request'

import '../../../assets/styleSheets/commentStyles/commentStyles.css'
import { ThemeContext } from '../../contextProvider/Provider'

const Comment =({displayComment ,setDisplayComment,socket,posts,setPosts})=>{
    const [comments, setComments] = useState(displayComment.comment.reverse())
    const [commentText ,setCommentText] = useState('')

const profilePicture = JSON.parse(localStorage.getItem('profilePicture')).name
let theme = useContext(ThemeContext).theme

async function likeComment(comment){
    if(comment._id){
        let body = {
            commentId:comment._id,
            likerId:localStorage.getItem('userId')
        }
         socket.emit('likeComment',body)
    }
}
socket.on('commentLiked',async({comment ,commentId})=>{
    let newComment = comment.map(com => {
        if(com._id == commentId){
            for(let i=0;i<com.like.length;i++){
                if(com.like[i] == localStorage.getItem('userId')){
                    com.liked = true
                }
            }
        }
        return com
    })
    setComments(newComment)

})
socket.on('commentUnLiked',async({comment,commentId})=>{
    let newComment = comment.map(com => {
        if(com._id == commentId){
            for(let i=0;i<com.like.length;i++){
                if(com.like[i] == localStorage.getItem('userId')){
                    com.liked = false
                }
            }
        }
        return com
    })
    setComments(newComment)
})


let displayComments = []
if(comments.length != 0){
     displayComments = comments.map((comment)=>{

        for(let i=0;i<comment.like.length;i++){
            if(comment.like[i] == localStorage.getItem('userId'))
                comment.liked = true
        }
        
        return (
            <div className='comment-body' key={comment.comment + comment.dateOfComment + Date.now()}>
                <div className='comment-profile-picture'>
                    {
                       comment.profilePicture && comment.profilePicture != 'no' ?
                        <img src={comment.profilePicture} />
                        :
                        <img src={require('../../../assets/images/tempPp.jpg')} />
                    }
                </div>
                <div className='comment-content' >
                    <span>{comment.userName}</span>
                    <span style={{textIndent:'10px'}}>{comment.comment}</span>
                    <span className='date'>{ comment.dateOfComment.split(' ')[1] ? comment.dateOfComment.split(' ')[0].replaceAll('/','-') +' | '+comment.dateOfComment.split(' ')[1]:comment.dateOfComment.split(' ')[0]}</span>
                </div>
                <div className='comment-actions'>
                    <div>
                        {comment.like && comment.like != 0 ? comment.like.length:''} <span style={{color:'rgba(255,0,0,0.6)'}} className={comment.liked ? 'fas fa-heart' : 'far fa-heart' } onClick={()=>likeComment(comment)}> </span>
                    </div>
                    {/* <div>
                        {comment.reply && comment.reply != 0 ? comment.reply.length:''} <span className='fas fa-reply'> </span>
                    </div> */}
                </div>

            </div>
        )
    })
}else{
    displayComments = <h2>No Comment</h2>
}


const sendComment=async(e)=>{   
    e.preventDefault()
        //To have the current Date
    let date = new Date
    date = date.getDate() +'/'+ (date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

let pp = profilePicture != 'no' ? `http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${profilePicture}`:'no'

    let body={
        dateOfComment:date,
        userId:localStorage.getItem('userId'),
        userName:localStorage.getItem('userName'),
        comment:commentText,
        postId:displayComment._id,
        profilePicture:pp
    }
    socket.emit('comment',body)

}
socket.on('commented',({id ,newComment})=>{
    // console.log(id)
    setCommentText('')
    let newPosts = posts.map(post => {
        if(post._id == id){
            // console.log(post)
            post.comment = newComment
            setComments(post.comment.reverse())
        }
        return post
    })
    setPosts(newPosts)}
)


    return(
        <React.Fragment>
            <div className='comment-container' style={{backgroundColor:theme == 'dark' ? 'rgba(30,30,35,1)':'' ,color:theme == 'dark' ? 'white':""}}>
                {/* <br/> */}
                <h2 style={{
                    display:'flex',
                    columnGap:'20px',
                    padding:'0px 10px'
                }}><span className='fas fa-arrow-left' onClick={()=>setDisplayComment([false,{}])}></span> Comments &nbsp;&nbsp; {comments.length}</h2>
                {/* <br/> */}

                <div className='comments' style={{backgroundColor:theme == 'dark' ? 'rgba(30,30,35,1)':'' ,color:theme == 'dark' ? 'black':""}}>  
                    {displayComments}
                    <br/><br/><br/><br/><br/>
                </div>

                <div className='form' style={{backgroundColor:theme == 'dark' ? 'rgba(30,30,35,1)':'' ,color:theme == 'dark' ? 'white':""}}>

                    <form 
                    onSubmit={(e)=>sendComment(e)}
                    >
                        <div>
                            <span className='far fa-smile'></span>
                        </div>

                        <input 
                            type="text"
                            value={commentText}
                            onChange={(e)=>setCommentText(e.target.value)}
                            placeholder='Write a comment !'
                        />
                        <div onClick={(e)=>sendComment(e)}>
                            <span className='far fa-paper-plane'></span>
                        </div>
                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Comment