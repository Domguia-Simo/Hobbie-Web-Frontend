import React from 'react'
import authsRoutes from '../../authsRoutes'
import {Route ,Routes ,useLocation ,useNavigate,Link ,useHistory} from 'react-router-dom'
import Login from '../views/auths/Login'

import '../../assets/styleSheets/authsStyles/authsStyles.css'

const Auths = ()=> {
let routes = authsRoutes.map(route => {
    return <Route path={`${route.path}`} element={route.component} key={route.path} />
})
let navigate = useNavigate()
    return(
        <React.Fragment>

           <div id="auths">
                <span className='fas fa-long-arrow-left back' onClick={()=>navigate(-1)}></span>
            <div id='auths-content'>
                {
                    <Routes>
                        {routes}
                        <Route path='*' element={<Login/>} />
                    </Routes>
                }
            </div>
                
           </div>
        </React.Fragment>
    )
}

export default Auths