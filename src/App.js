import React from 'react'
import {BrowserRouter as Router, Route, Switch,Link,Routes} from "react-router-dom"
import Body from './body.jsx';
import Foot from './footer.jsx';
import {createStoreHook as createStore} from 'react-redux';

//Some important note under Redux

//Store: A globalise state that hold information for our application

//Action: Describe what you want to do Ex: do you want to increment or decrement a value ?
const increment = () =>{
  return{
    type:"INCREMENT"
  }
}
const decrement = () =>{
  return{
    type:"DECREMENT"
  }
}
//Reducer: It describe how your action perform will transform the informatino
const counter = (state = 0,action) =>{
  switch(action.type){
    case "INCREMENT":
        return state +1;
    case "DECREMENT":
    return state -1;
  }
}

let store = createStore(counter);

// store.suscribe(()=>console.log(store.getState()));

//Dispatch: To send the action to the reducer
store.dispatch(increment());

function App() {
  console.log(Route)
  return (
      <Router>
  {/* Domguia<br/>
<Link to="/foot">Foot</Link><br/>
<Link to="/body">Body</Link><br/>

<Routes>
      
 <Route exact path="/" component={App}/>
<Route  path="/body" component={Body}/>
<Route path="/foot" component={Foot}/>
</Routes> */}

</Router>
   
  );
}

export default App;
