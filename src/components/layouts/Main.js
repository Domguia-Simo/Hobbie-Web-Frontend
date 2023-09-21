import React from 'react'
import {Header} from '../header/Header'
import {Route ,Routes} from 'react-router-dom'
import mainRoutes from '../../mainRoutes'

import {DefaultView ,LoginView} from '../views/main/Default'

import '../../assets/styleSheets/mainStyles/mainStyles.css'

const Main =()=>{
    let mainRoute = mainRoutes.map(route => {
        return <Route path={`${route.path}`} element={route.component} key={route.path} />
    })
    
    return(
        <React.Fragment>
            <div id="main-body">
                <Header/>

                <div className='main-content'>
                    {
                    <Routes>
                        {mainRoute}
                        <Route path='*' element={<DefaultView/>}/>
                    </Routes>
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

export default Main