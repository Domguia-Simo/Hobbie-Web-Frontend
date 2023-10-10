import React from 'react'
import {useNavigate} from 'react-router-dom'

import '../../../assets/styleSheets/settingStyles/settingStyles.css'

const Setting =()=>{
    let navigate = useNavigate()

    const logout=()=>{
        // localStorage.removeItem('userId')
        localStorage.clear()
        window.location.pathname='/home/posts'
}

    return(
        <React.Fragment>
            <div className='setting'>
                <h2>More</h2>

                <center>
            <div className='setting-body'>
                <button>Theme</button>
                <button>Lanuage</button>
                <button>Feedback</button>

                <button title='logout' onClick={logout}>Log-out</button>
            </div>
                </center>

            </div>
        </React.Fragment>
    )
}

export default Setting