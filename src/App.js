import React from 'react'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import Auths from './components/layouts/Auths'

const App = () =>{
  return(
    <React.Fragment>
      <Router>
      {/* <h1>Welcome to Hobbie frontend</h1> */}
        <Routes>
          {/* <Route path='/' Component={} /> */}
          <Route path="/auths/*" element={<Auths/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App