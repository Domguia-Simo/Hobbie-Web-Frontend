import React from 'react'
import Status from './Status'
import Posts from './Posts'
import { Category ,FixFoot} from '../../header/Header'

export const DefaultView =()=>{
    return(
        <React.Fragment>

            <Category/>
                {/* <Status/> */}
                <Posts/>
                <br/>
       
            {/* <FixFoot/>   */}
              
        </React.Fragment>
    )
}

export const LoginView =()=>{
    return(
        <React.Fragment>

            <Category/>
                <Status/>
                <Posts/>
                <br/>
                <br/>
                <br/>
            <FixFoot/>  
              
        </React.Fragment>
    )
}

