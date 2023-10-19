import React,{useState,useMemo} from 'react'
import {Link ,useLocation, useNavigate} from 'react-router-dom'

import '../../../assets/styleSheets/profileStyles/profileStyles.css'
import { ipAdress } from '../../../generals'
import Posts from './Posts'

const ViewProfile =()=>{
    let navigate = useNavigate()
    let location = useLocation()

    const [userInfo ,setUserInfo] = useState('')
    const [posts ,setPosts] = useState([])

    if(location.state == ''){
        navigate(-1)
    }
    useMemo(()=>{
        setUserInfo(location.state.user)
        setPosts(location.state.posts)
    },[0])

    const profileBackground = userInfo.profileBackground
const profilePicture = userInfo.profilePicture

    return(
        <React.Fragment>
            <div className='profile'>

                <div className='profile-bg'>
                    {profileBackground != 'no' ? 
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${userInfo._id}/${profileBackground}`}
                        className='profile-bg'
                        />
                        :''
                    }
                </div>
                    <div >
                        {profilePicture != 'no'  ? 
                       
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${userInfo._id}/${profilePicture}`}
                        className='profile-picture'
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

                   <div>

                    </div>

                </div>

                <div className='profile-actions' style={{lineHeight:'25px',padding:'0px 10px'}}>
                        <h3>Biography</h3>
                        {userInfo.description ? userInfo.description : `Hey ! am ${userInfo.name}`}
                </div>

                <div className='profile-body'>
                        <h3>&nbsp;&nbsp;&nbsp;Posts</h3>
                    <div className='profile-posts'>
                      <Posts InCommingposts={posts} viewing={true}/>
                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default ViewProfile