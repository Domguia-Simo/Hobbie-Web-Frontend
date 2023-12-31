import React,{useState ,useMemo ,useEffect ,useRef} from 'react'
import {Link ,useLocation, useNavigate} from 'react-router-dom'

import '../../../assets/styleSheets/profileStyles/profileStyles.css'
import { ipAdress } from '../../../generals'
import request from '../../request/Request' 
import File from '../modals/File'
 
import Posts from './Posts'

const Profile =()=>{

    let navigate = useNavigate()
    
    const mainContent = useRef(null)
    const [body ,setBody] = useState('posts')
    const [fileModal ,setFileModal] = useState([false,'',''])
    const [posts ,setPosts] = useState([])

    const [loadingPosts ,setLoadingPosts] = useState(false)

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    },[useLocation()])

let profileBackground = 'no'
let profilePicture = 'no'

if(JSON.parse(localStorage.getItem('profileBackground')))
     profileBackground = JSON.parse(localStorage.getItem('profileBackground')).file

 if(JSON.parse(localStorage.getItem('profilePicture')))
     profilePicture = JSON.parse(localStorage.getItem('profilePicture')).file

function displayFile(file,text){
    setFileModal([true ,file,text])
}


useEffect(()=>{
    async function fetchData(){
        let body={
            userId:localStorage.getItem('userId')
        }
        setLoadingPosts(true)
            let temp = await request({url:`http://${ipAdress}:5000/api/userAction/getUserPosts`,method:'post',body:body})
            setPosts(temp.posts)
        setLoadingPosts(false)
    }
    fetchData()
},[0])



    return(
        <React.Fragment>
            <div className='profile' ref={mainContent}>
                    {fileModal[0] ? <File file={fileModal[1]} setFile={setFileModal} text={fileModal[2]} />:''}
                <div className='profile-bg'>
                    {profileBackground != 'no' ? 
                        <img 
                        src={profileBackground}
                        className='profile-bg'
                        onClick={()=>displayFile(profileBackground,'Profile Background')}
                        />
                        :''
                    }
                </div>
                    <div >
                        {profilePicture != 'no'  ? 
                       
                        <img 
                        src={profilePicture}
                        className='profile-picture'
                        onClick={()=>displayFile(profilePicture,'Profile Picture')}
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
                    <span>Posts : {posts.length}</span>    

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
                                {loadingPosts ? 
                                <center><br/><br/>
                                    <img src={require('../../../assets/images/loading.gif')} width='30px' height='30px'/>
                                </center>:
                                
                                <Posts InCommingposts={posts} viewing={true} canDelete={true}/>
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className='profile-bio'>
                                {localStorage.getItem('bio') == 'undefined' ? localStorage.getItem('bio'):
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