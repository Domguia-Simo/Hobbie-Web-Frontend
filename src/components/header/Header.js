import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import '../../assets/styleSheets/headerStyles/headerStyles.css'

export const Header =()=>{
    const [active ,setActive] = useState('home')

    return(
        <React.Fragment>
        <div className='header'>
                    <h2>
                        Hobbie
                    </h2>

                    <div className='options'>
                       <Link to='/home/posts'> <span className='fas fa-home' title='home' onClick={()=>setActive('home')} id={active == 'home' ? 'active':''} ></span> </Link>
                        <span className='far fa-user' title='account' onClick={()=>setActive('user')} id={active == 'user' ? 'active':''} ></span>
                       <Link to='/home/chat'> <span className='far fa-message' title='messages' onClick={()=>setActive('message')} id={active == 'message' ? 'active':''} ></span> </Link>
                        <span className='far fa-bell' title='notification' onClick={()=>setActive('notification')} id={active == 'notification' ? 'active':''} ></span>
                        <span className='fas fa-bars' title='option' onClick={()=>setActive('option')} id={active == 'option' ? 'active':''} ></span>

                    </div>
        </div>
        </React.Fragment>
    )
}

let category = [
    'General','Anime/Mangas' , 'Sport','News','Electronics','Programming' ,'Music','Fashion','Games'
]

export const Category =()=>{
    const [activeCat ,setActiveCat] = useState('General')

let displayCategory = category.map(cat => {
    return (

    <span 
        className='category' 
        title={cat} 
        key={cat} 
        onClick={()=>setActiveCat(`${cat}`)} 
        id={activeCat == cat ? 'activeCat':''}
    >
        {cat}
    </span>
    )
})

    return(
        <React.Fragment>
        <div className='category'>
            {displayCategory}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        </React.Fragment>
    )
}

export const FixFoot =()=>{
    return(
        <React.Fragment>
            <div className='fixfoot'>
                <span className='fas fa-search'></span>
            </div>
        </React.Fragment>

    )
}
