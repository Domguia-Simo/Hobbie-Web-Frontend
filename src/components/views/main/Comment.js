import React,{useState,useEffect} from 'react'
import { ipAdress ,stringDate } from '../../../generals'
import request from '../../request/Request'

import '../../../assets/styleSheets/commentStyles/commentStyles.css'

const Comment =({displayComment ,setDisplayComment,socket,posts,setPosts})=>{
    const [comments, setComments] = useState(displayComment.comment.reverse())
    const [commentText ,setCommentText] = useState('')

let displayComments = []
if(comments.length != 0){
     displayComments = comments.map((comment)=>{
        return (
            <div className='comment-body' key={comment.comment + comment.dateOfComment + Date.now()}>
                <div className='comment-profile-picture'>
                    <img src={require('../../../assets/images/tempPp.jpg')} />
                </div>
                <div className='comment-content'>
                    <span>{comment.userName}</span>
                    <span style={{textIndent:'10px'}}>{comment.comment}</span>
                    <span className='date'>{stringDate(comment.dateOfComment)}</span>
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
    date = date.getDate() +'/'+ (date.getMonth()+1)+'/'+date.getFullYear();

    let body={
        dateOfComment:date,
        userId:localStorage.getItem('userId'),
        userName:localStorage.getItem('userName'),
        comment:commentText,
        postId:displayComment._id
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
            <div className='comment-container'>
                {/* <br/> */}
                <h2 style={{
                    display:'flex',
                    columnGap:'20px',
                    padding:'0px 10px'
                }}><span className='fas fa-arrow-left' onClick={()=>setDisplayComment([false,{}])}></span> Comments &nbsp;&nbsp; {comments.length}</h2>
                {/* <br/> */}

                <div className='comments'>
                    {displayComments}
                </div>

                <div className='form'>

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