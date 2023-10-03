import React,{useState,useContext ,createContext,useEffect} from 'react'
import request from '../request/Request'
import { ipAdress } from '../../generals'

export const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [theme ,setTheme] = useState('light')
    return <ThemeContext.Provider value={{theme ,setTheme}}>  {children} </ThemeContext.Provider>

   
}

export const PostContext = createContext()

export  function PostProvider({children}){
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
        return (
            <PostContext.Provider value={posts}>
                {children}
            </PostContext.Provider>
        )
}
