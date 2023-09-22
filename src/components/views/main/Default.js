import React,{useState ,useMemo} from 'react'
import Status from './Status'
import Posts from './Posts'
import { Category ,FixFoot} from '../../header/Header'

 const DefaultView =()=>{

const [user ,setUser] = useState(false)

useMemo(()=>{
    if(localStorage.getItem('userId')){
        setUser(true)
    }
},[0])

    return(
        <React.Fragment>

            <Category/>
                {user ? <Status/> : ''}
                <Posts/>
                <br/>
       
            {user ? <FixFoot/> : ''}
              
        </React.Fragment>
    )
}

export default DefaultView
