import React from 'react'
import {Header,Category,FixFoot} from '../header/Header'
import Status from '../views/main/Status'
import Posts from '../views/main/Posts'

import '../../assets/styleSheets/mainStyles/mainStyles.css'

const Main =()=>{

    return(
        <React.Fragment>
            <div id="main-body">
                <Header/>
                <Category/>

                <div className='main-content'>
                    <Status/>
                    <Posts/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                    <FixFoot/>


            </div>
        </React.Fragment>
    )
}

export default Main