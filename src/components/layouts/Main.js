import React,{ 
    useState,useMemo ,createContext , useEffect,
    useContext } from 'react'
import {Header} from '../header/Header'
import {Route ,Routes} from 'react-router-dom'
import mainRoutes from '../../mainRoutes'
import { ipAdress } from '../../generals'
import request from '../request/Request'

import DefaultView from '../views/main/Default'

//Context Provider
import { ThemeProvider ,PostProvider} from '../contextProvider/Provider'


//Styling sheet
import '../../assets/styleSheets/mainStyles/mainStyles.css'

const Main =()=>{

    const [posts ,setPosts] = useState([])

useEffect(()=>{
    const fetchData =async()=>{
        let temp = await request({method:'GET' ,body:'',url:`http://${ipAdress}:5000/api/post/getAllPost`})
        if(temp.posts){
            setPosts(temp.posts.reverse())
        }
    }
    fetchData()
},[0])

    let mainRoute = mainRoutes.map(route => {
        if(route.path === '/posts'){
            return <Route path={`${route.path}`} element={<DefaultView posts={posts}/>} key={route.path} />
        }
        else{
            return <Route path={`${route.path}`} element={route.component} key={route.path} />
        }
    })

    return(
        <React.Fragment>
            <ThemeProvider>
                <div id="main-body">
                    <Header/>
                    <div className='main-content'>
                        {
                        <Routes>
                            {mainRoute}
                            <Route path='*' element={<DefaultView posts={posts}/> }/>
                        </Routes>
                        }
                    </div>

                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Main
