import React,{useState,useMemo ,useRef ,useEffect} from 'react'
import {Link ,useLocation, useNavigate} from 'react-router-dom'
import File from '../modals/File'
import Signal from '../modals/Signal'
import Invite from '../modals/Invite'

import {PrivateChat} from './Chat'

import '../../../assets/styleSheets/profileStyles/profileStyles.css'

import '../../../assets/styleSheets/chatStyles/chatStyles.css'


import { ipAdress } from '../../../generals'
import Posts from './Posts'

const ViewProfile =()=>{
    let navigate = useNavigate()
    let location = useLocation()

    const mainContent = useRef(null)
    const [userInfo ,setUserInfo] = useState('')
    const [fileModal ,setFileModal] = useState([false ,'' ,''])

    const [signalModal ,setSignalModal] = useState([false ,'' ,''])
    const [inviteModal ,setInviteModal] = useState([false ,'' ,''])

    const [chatModal ,setChatModal] = useState(false)

    const [posts ,setPosts] = useState([])

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    },[useLocation()])

    if(location.state == ''){
        navigate(-1)
    }
    useMemo(()=>{
        setUserInfo(location.state.user)
        setPosts(location.state.posts)
    },[0])

    const profileBackground = userInfo.profileBackground
const profilePicture = userInfo.profilePicture

function displayFile(file ,text){
    let newFile = `http://${ipAdress}:5000/userPictures/${userInfo._id}/${file}`
    setFileModal([true ,newFile ,text])
}

function handleSignal(){
    setSignalModal([true ,userInfo.name,userInfo._id])
}

function handleInvitation(){
    setInviteModal([true ,userInfo.name ,userInfo._id])
}

function handleMessage(){
    let body = {
        userName:userInfo.name,
        userId:userInfo._id,
        profilePicture:profilePicture,
        view:true
    }
    navigate('/privateChat',{state:JSON.stringify(body)})
}

    return(
        <React.Fragment>
            <div className='profile' ref={mainContent}>

                {fileModal[0] ? <File file={fileModal[1]} setFile={setFileModal} text={fileModal[2]}/>:''}

                {signalModal[0] ? <Signal userName={signalModal[1]} setSignalModal={setSignalModal} userId={signalModal[2]}/>:''}

                {inviteModal[0] ? <Invite userName={inviteModal[1]} setInviteModal={setInviteModal} userId={inviteModal[2]}/>:''}

                <div className='profile-bg'>
                    {profileBackground != 'no' ? 
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${userInfo._id}/${profileBackground}`}
                        className='profile-bg'
                        onClick={()=>displayFile(profileBackground ,'Profile Background')}
                        />
                        :''
                    }
                </div>
                    <div>
                        {profilePicture != 'no'  ? 
                       
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${userInfo._id}/${profilePicture}`}
                        className='profile-picture'
                        onClick={()=>displayFile(profilePicture,'Profile Picture')}
                        
                        /> :
                        <img src={require('../../../assets/images/tempPp.jpg')} className='profile-picture'/>
                        }
                    </div>
                <br/>
                <br/>

                <div className='profile-actions'>

                   <h3> {userInfo.name}</h3><br/>

                   <div style={{display:'flex',justifyContent:'space-evenly'}} className='bold'>
                    <span>Following : {userInfo.following ? userInfo.following.length:'' }</span>
                    <span>Followers : {userInfo.followed_by ? userInfo.followed_by.length:''}</span>  
                    <span>Posts : {posts.length}</span>  
                   </div><br/>

                   <div style={{display:'flex',justifyContent:'space-around'}}>

                        <button>
                        <span className='fas fa-plus'></span>  Follow
                        </button>

                        <button onClick={handleMessage}>
                           <span className='far fa-message'></span> message
                        </button>
                        {/* <button onClick={handleSignal}>
                        <span className='far fa-thumbs-down'></span> Signal
                        </button> */}
                        <button onClick={handleInvitation}>
                        <span className='far fa-envelope'></span>  Invite
                        </button>
                    </div>

                </div>

                <div className='profile-actions' style={{lineHeight:'25px',padding:'0px 10px'}}>
                        <h3>Biography</h3>
                        {userInfo.description != 'no' ? userInfo.description : `Hey ! am ${userInfo.name}`}<br/><br/>
                </div>

                <div className='profile-body'>
                        <h3 >&nbsp;&nbsp;&nbsp;Posts</h3>
                    <div className='profile-posts'>
                      <Posts InCommingposts={posts} viewing={true}/>
                    </div>
                    
                </div>

            </div>
        </React.Fragment>
    )
}

export default ViewProfile