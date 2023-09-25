import React,{useState,useMemo,useEffect} from 'react'
import NoAccount from '../modals/NoAccount'
import request from '../../request/Request'

import '../../../assets/styleSheets/postStyles/postStyles.css'

const posts = [
    {
        userName:'@Samuel_Escobar',
        description:'To Be Continued ... ',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/R_2.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Sam_Douglas',
        description:'Best Time Ever Anime !!!',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/OIP_14.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Simon',
        description:'So hungry',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/f4.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Stephan_Golberk',
        description:'Who can but me this ?',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/f13.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Simo_Ulrich',
        description:'No other anime like this !!!',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/OIP_9.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
]

const Posts = () => {

    const [posts ,setPosts] = useState([])
    const [NoAccountModal ,setNoAccountModal] = useState(false)
    const [user ,setUser] = useState(false)

useEffect(()=>{
    const fetchData =async()=>{
        let temp = await request({method:'GET' ,body:'',url:'http://localhost:5000/api/post/getAllPost'})
        setPosts(temp.posts.reverse())
    }
    fetchData()
},[0])

    useMemo(()=>{
        if(localStorage.getItem('userId')){
            setUser(true)
        }
    },[0])

    //Function to handle post Options 
function handleOptions(){
    if(!user){
        setNoAccountModal(true)
    }

}


    //Function to handle post Like
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
    let id=post._id
    // for(let i=0;i<100;i++){
    //     request({method:'post' ,body:body,url:'http://localhost:5000/api/post/likePost'})
    // }
     let temp = await request({method:'post' ,body:body,url:'http://localhost:5000/api/post/likePost'})
        if(temp.message == 'yes'){
            let newPosts = posts.map(post => {
                if(post._id == id){
                    post.like.push({likerId:localStorage.getItem('userId'),likerName:localStorage.getItem('userName')})
                }
                return post
            })
            setPosts(newPosts)
        }

}


    //Function to handle post Like
function handleComment(){
    if(!user){
         setNoAccountModal(true)
         return
    }
}


    //Function to handle post Like
const handleDownload=async(post)=>{
    if(!user){
         setNoAccountModal(true)
         return
    }

    let body={
        userId:post.userId,
        postId:post._id,
        fileName:post.fileName
    }
    await request({method:'post' ,body:body,url:'http://localhost:5000/api/post/downloadPost'})
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


let displayPosts = posts.map(post =>{
    return(
            <div className='post-container' key={post.description}>
                    
                <div className='post-head'>
                    <div>
                        {<img src={require('../../../assets/images/tempPp.jpg')} />}
                        <div>
                            <span className='bold'>{post.userName}</span>
                            <span className='light'>{stringDate(post.dateOfCreation)}</span>
                        </div>
                    </div>
                    <span className='options' onClick={()=>handleOptions()}>...</span>
                </div>

                <div className='post-body'>
                    <div className='content'>
                    {<img src={`http://localhost:5000/postFiles/${post.userId}/${post._id}/${post.fileName}`}/>}

                    </div>
                    <div className='description'>
                    <span style={{color:'darkblue'}}> {post.userName}: </span>{post.description}
                    </div>
                    <div className='actions'>
                        <div onClick={()=>handleLike(post)}>
                        {post.like.length} <span className='fas fa-heart' style={{color:'rgba(255,0,0,0.6)'}}></span>
                        </div>

                        <div onClick={()=>handleComment()}>
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
            {NoAccountModal ? <NoAccount setModal={setNoAccountModal}/> : ''}
            {displayPosts}
            <br/>
        </React.Fragment>
    )
}

export default Posts

function stringDate(date){
    let goodDate = date.split('/')
    let month = ''
    switch(goodDate[1]){
        case '1':
            month='January'
        break;    
        case '2':
            month='February'
        break; 
        case '3':
            month='March'
        break; 
        case '4':
            month='April'
        break; 
        case '5':
            month='May'
        break; 
        case '6':
            month='June'
        break; 
        case '7':
            month='July'
        break; 
        case '8':
            month='August'
        break; 
        case '9':
            month='September'
        break; 
        case '10':
            month='October'
        break; 
        case '11':
            month='November'
        break; 
        case '12':
            month='December'
        break; 
        
    }

    return goodDate[0]+' '+month+' '+goodDate[2]
}
