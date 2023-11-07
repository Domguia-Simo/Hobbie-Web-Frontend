import React,{useState,useContext ,createContext,useEffect} from 'react'
import request from '../request/Request'
import { ipAdress } from '../../generals'
const socketClient = require('socket.io-client')


//Context fortheme
export const ThemeContext = createContext()
//Theme Provider
export function ThemeProvider({children}){
    const [theme ,setTheme] = useState('light')
    return <ThemeContext.Provider value={{theme ,setTheme}}>  {children} </ThemeContext.Provider>

}

//Context for socket
export const SocketContext = createContext()
//Socket Provider
export const SocketProvider =({children})=>{
    const io = socketClient.io

    //socket connection with the server
    let socket = ''
    try{
        socket = new io(`http://${ipAdress}:5000`)
    }
    catch{
        socket = 'failed to connect'
    }
    return <SocketContext.Provider value={socket}> {children} </SocketContext.Provider>
    
}