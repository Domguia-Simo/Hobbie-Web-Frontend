import React from 'react'

import '../../../assets/styleSheets/settingStyles/settingStyles.css'

const Setting =()=>{
    return(
        <React.Fragment>
            <div className='setting'>
                <h2>More</h2>

                <center>
            <div className='setting-body'>
                <button>Theme</button>
                <button>Lanuage</button>
                <button title='logout'>Log-out</button>
            </div>
                </center>

            </div>
        </React.Fragment>
    )
}

export default Setting