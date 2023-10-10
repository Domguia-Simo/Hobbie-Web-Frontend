import React,{useState,useContext ,createContext,useEffect} from 'react'
import request from '../request/Request'
import { ipAdress } from '../../generals'

export const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [theme ,setTheme] = useState('light')
    return <ThemeContext.Provider value={{theme ,setTheme}}>  {children} </ThemeContext.Provider>

}
