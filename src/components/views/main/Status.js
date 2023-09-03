import React from 'react'

import '../../../assets/styleSheets/statusStyles/statusStyles.css'

let userStatus = [
    'Vous','Samuel','Tom','John','Stella'
]

const Status =()=>{

    let displayStatus = userStatus.map(status => {
        return(
            <div>
            <span className=' status'></span>
                <br/>
            {status}
            </div>
        )
    })

    return(
        <React.Fragment>
            <div className='status-container'>
                {displayStatus}
            </div>
        </React.Fragment>
    )
}

export default Status