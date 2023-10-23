import React,{useState ,useMemo ,useEffect} from 'react'
import Status from './Status'
import Posts from './Posts'
import { Category ,FixFoot} from '../../header/Header'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'


 const DefaultView =({posts ,setPosts})=>{

const [user ,setUser] = useState(false)

const [loadingPosts ,setLoadingPosts] = useState(false)


useMemo(()=>{
    if(localStorage.getItem('userId')){
        setUser(true)
    }
},[0])

    return(
        <React.Fragment>

            <Category setPosts={setPosts}/>
                {/* {user ? <Status/> : ''} */}
                {loadingPosts ?
                    <div style={{
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50% ,-50%)'
                    }}>
                        <img src={require('../../../assets/images/loading.gif')} width='25px' height='25px'/>
                    </div>:
                    <Posts InCommingposts={posts}/>
                
                }
                <br/><br/>
                <span className='end'></span>

       
            {user ? <FixFoot/> : ''}
              
        </React.Fragment>
    )
}

export default DefaultView

