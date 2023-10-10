import React,{useContext ,useState ,useMemo} from 'react'
import {useNavigate} from 'react-router-dom'

import { ThemeContext } from '../../contextProvider/Provider'

import '../../../assets/styleSheets/settingStyles/settingStyles.css'

const Setting =()=>{
    let navigate = useNavigate()

    // const [theme ,setTheme] = useState(useContext(ThemeContext))


let themeContext = useContext(ThemeContext)

const logout=()=>{
    localStorage.clear()
    window.location.pathname='/home/posts'
}

    return(
        <React.Fragment>
            <div className='setting'>
                <h2>More</h2>

                <center>
            <div className='setting-body'>

                <button onClick={()=>navigate('/auths/login')}>Switch Account &nbsp;

                    <span className='far fa-user'></span>&nbsp;
                    <span className='fas fa-recycle'></span>&nbsp;
                    <span className='fas fa-user'></span>&nbsp;

                </button>
                <div className='theme'>
                    <span 
                        className='fas fa-moon' 
                        style={{color:'darkblue',backgroundColor:'skyblue'}} 
                        onClick={()=>themeContext.setTheme('dark')}>
                    </span> 

                    <span 
                        className='fas fa-sun' 
                        style={{color:'goldenrod',backgroundColor:'bisque'}} 
                        onClick={()=>themeContext.setTheme('light')}>
                    </span> 
                </div>
                <button>Lanuage <span className='fas fa-language'></span> : English </button>

                <button>Any Feedback ? <span className='fas fa-comment-alt'></span></button>

                <button>Terms Of Privacy And Confidentiality <span className='fas fa-lock'></span></button>


                <button title='logout' onClick={logout}>Log-out <span className='fas fa-door-open'></span> </button>
            </div>
                </center>

            </div>
        </React.Fragment>
    )
}

export default Setting