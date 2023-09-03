import React,{useState , useEffect} from 'react'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import Auths from './components/layouts/Auths'
import Main from './components/layouts/Main'

import './assets/fontAwesome/css/all.css'

const App = () =>{

  return(
    <React.Fragment>
      <Router>
      {/* <h1>Welcome to Hobbie frontend</h1> */}
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path="/auths/*" element={<Auths/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App