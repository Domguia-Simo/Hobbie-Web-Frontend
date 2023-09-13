import React from 'react'
import Status from './Status'
import Posts from './Posts'
import { Category ,FixFoot} from '../../header/Header'

const Default =()=>{
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

export default Default