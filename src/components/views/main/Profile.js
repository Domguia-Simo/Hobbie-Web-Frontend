import React,{useState ,useMemo} from 'react'
import {Link ,useLocation, useNavigate} from 'react-router-dom'

import '../../../assets/styleSheets/profileStyles/profileStyles.css'
import { ipAdress } from '../../../generals'

const Profile =()=>{

    let navigate = useNavigate()
    
    const [body ,setBody] = useState('posts')

    const [initialX ,setInitialX] = useState()

const profileBackground = JSON.parse(localStorage.getItem('profileBackground')).file
const profilePicture = JSON.parse(localStorage.getItem('profilePicture')).file

    return(
        <React.Fragment>
            <div className='profile'>

                <div className='profile-bg'>
                    {profileBackground != 'no' ? 
                        <img 
                        src={profileBackground}
                        className='profile-bg'
                        />
                        :''
                    }
                </div>
                    <div >
                        {profilePicture != 'no'  ? 
                       
                        <img 
                        src={profilePicture}
                        className='profile-picture'
                        /> :
                        <img src={require('../../../assets/images/tempPp.jpg')} className='profile-picture'/>
                        }
                    </div>
                <br/>
                <br/>

                <div className='profile-actions'>
                   <h3> {localStorage.getItem('userName')}</h3><br/>

                   <div style={{display:'flex',justifyContent:'space-evenly'}} className='bold'>
                    <span>Following : {localStorage.getItem('following').split(',').length}</span>
                    <span>Followers : {localStorage.getItem('follower').split(',').length}</span>    
                   </div><br/>

                    <div>
                        
                        {/* <button>
                        <span className='fas fa-plus'></span> Create Story
                        </button> */}

                        <button onClick={()=>navigate('/home/profile/createPost')}>
                            {/* <Link to='/home/profile/createPost'> */}
                                <span className='fas fa-plus'></span> Create Post
                            {/* </Link> */}
                        </button>

                        <button onClick={()=>navigate('/home/profile/editProfile')}>
                            {/* <Link to='/home/profile/editProfile'> */}
                                <span className='fas fa-pen'></span> Edit Profile
                            {/* </Link> */}
                        </button>

                        <button onClick={()=>navigate('/home/setting')}>
                            <span className='fas fa-gear'></span> More
                        </button>

                    </div>
                </div>

                <div className='profile-body'>
                    <div className='head-links'>
                        <span 
                            style={{
                                borderColor:body == 'posts'? 'rgb(255, 136, 0)':'',
                                color:body == 'posts'? 'rgb(255, 136, 0)':''
                            }}
                            onClick={()=>setBody('posts')}
                        >Posts</span>
                        <span 
                            style={{
                                borderColor:body != 'posts'? 'rgb(255, 136, 0)':'',
                                color:body != 'posts'? 'rgb(255, 136, 0)':''
                            }}
                            onClick={()=>setBody('bio')}
                        >Bio</span>
                    </div>
                    {
                        body == 'posts' ?
                        <>
                            <div className='profile-posts'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </>
                        :
                        <>
                            <div className='profile-bio'>
                                {localStorage.getItem('bio') ? localStorage.getItem('bio'):
                                <>
                                Hey am {localStorage.getItem('userName')}.<br/>
                                </>

                                }
                            </div>
                        </>
                    }
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Profile