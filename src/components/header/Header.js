import React,{useState ,useMemo ,useContext } from 'react'
import {Link } from 'react-router-dom'

//context Provider
import { ThemeContext } from '../contextProvider/Provider'

//styleing sheet
import '../../assets/styleSheets/headerStyles/headerStyles.css'

export const Header =()=>{
    const [active ,setActive] = useState('home')
    const [user ,setUser] = useState(false)

let theme = useContext(ThemeContext).theme

let path = window.location.pathname.split('/')
path = path[path.length-1]
useMemo(()=>{
    if(path == 'chat'){
        setActive('message')
    }else if( path == 'profile'){
        setActive('user')
    }else if(path == 'setting'){
        setActive('option')
    }else if(path == 'notification'){
        setActive('notification')
    }else if(path == 'posts'){
        setActive('home')
    }
},[0])

useMemo(()=>{
    if(localStorage.getItem('userId')){
        setUser(true)
    }
},[0])

    return(
    <React.Fragment>
    <div className='header' style={{backgroundColor:theme == 'dark' ? 'rgba(50,50,52,1)':''}}>
        <h2> Hobbie </h2>

        {user ? 
            <div className='options' >
                <Link to='/home/posts' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}> 
                    <span className='fas fa-home' title='home' onClick={()=>setActive('home')} id={active == 'home' ? 'active':''} ></span>
                </Link>

                <Link to='/home/profile' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}>
                    <span className='far fa-user' title='account' onClick={()=>setActive('user')} id={active == 'user' ? 'active':''} ></span>
                </Link>

                {/* <Link to='/home/chat' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}> 
                    <span className='far fa-message' title='messages' onClick={()=>setActive('message')} id={active == 'message' ? 'active':''} ></span> 
                </Link> */}

                <Link to='/home/notification' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}> 
                    <span className='far fa-bell' title='notification' onClick={()=>setActive('notification')} id={active == 'notification' ? 'active':''} ></span> 
                </Link>

                <Link to='/home/setting' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}> 
                    <span className='fas fa-bars' title='option' onClick={()=>setActive('option')} id={active == 'option' ? 'active':''} ></span> 
                </Link>

            </div>
        
            :

            <div className='options'>
                <Link to='/home/posts'> 
                    <span className='fas fa-home' title='home' onClick={()=>setActive('home')} id={active == 'home' ? 'active':''} ></span>
                </Link>

                <Link to='/auths/login'> 
                    &nbsp;&nbsp;
                    <span className='fas fa-power-off' ></span>
                    &nbsp;&nbsp;&nbsp;
                </Link>

            </div>
        }
    </div>
    </React.Fragment>
    )
}

let category = [
    'General','Anime/Mangas' , 'Sport','News','Electronics','Programming' ,'Music','Fashion','Games'
]

export const Category =()=>{
    const [activeCat ,setActiveCat] = useState('General')

    let theme = useContext(ThemeContext).theme

let displayCategory = category.map(cat => {
    return (

    <span 
        className='category' 
        title={cat} 
        key={cat} 
        onClick={()=>setActiveCat(`${cat}`)} 
        id={activeCat == cat ? 'activeCat':''}
        style={{backgroundColor:theme == 'dark' ? 'rgba(255,255,255,0.85)':'',color:theme == 'dark' ? 'black':''}}
    >
        {cat}
    </span>
    )
})

    return(
        <React.Fragment>
        <div className='category' style={{backgroundColor:theme == 'dark' ? 'rgba(50,50,52,1)':''}} >
            {displayCategory}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        </React.Fragment>
    )
}

export const FixFoot =()=>{
    let theme = useContext(ThemeContext).theme
    return(
        <React.Fragment>
            <div className='fixfoot' style={{backgroundColor:theme == 'dark' ? 'rgba(50,50,52,1)':''}}>
                <span className='fas fa-user-friends' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}></span>
                <span className='fas fa-search' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}></span>
                <span className='fas fa-gift' style={{color:theme == 'dark' ? 'rgba(255,255,255,0.8)':''}}></span>

            </div>
        </React.Fragment>

    )
}
