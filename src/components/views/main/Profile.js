import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import '../../../assets/styleSheets/profileStyles/profileStyles.css'
import { ipAdress } from '../../../generals'

const Profile =()=>{
    
    const [body ,setBody] = useState('posts')

    return(
        <React.Fragment>
            <div className='profile'>

                <div className='profile-bg'>
                    {localStorage.getItem('profileBackground') != 'no' ? 
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${localStorage.getItem('profileBackground')}`}
                        className='profile-bg'
                        />
                        :''
                    }
                </div>
                    <div >
                        {localStorage.getItem('profilePicture') != 'no'  ? 
                       
                        <img 
                        src={`http://${ipAdress}:5000/userPictures/${localStorage.getItem('userId')}/${localStorage.getItem('profilePicture')}`}
                        className='profile-picture'
                        /> :
                        <img src={require('../../../assets/images/tempPp.jpg')} className='profile-picture'/>
                        }
                    </div>
                <br/>
                <br/>

                <div className='profile-actions'>
                   <h3> {localStorage.getItem('userName')}</h3><br/>
                    <div>
                        
                        <button>
                        <span className='fas fa-plus'></span> Create Story
                        </button>

                        <button>
                            <Link to='/home/profile/createPost'>
                                <span className='fas fa-plus'></span> Create Post
                            </Link>
                        </button>

                        <button>
                            <Link to='/home/profile/editProfile'>
                                <span className='fas fa-pen'></span> Edit Profile
                            </Link>
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
                            Cookies obligatoires pour effectuer les fonctions essentielles du site web. Ces cookies sont nécessaires au bon fonctionnement de nos sites web. Les fonctions incluent la connexion, l’enregistrement des préférences linguistiques, la mesure et l’amélioration des performances, le routage du trafic entre les serveurs web, la détection de la taille de l’écran,
                             la mesure des temps de chargement des pages, l’amélioration de l’expérience utilisateur, notamment la pertinence, la mesure de l’audience, la détection des fraudes et des abus, 
                            </div>
                        </>
                    }
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Profile