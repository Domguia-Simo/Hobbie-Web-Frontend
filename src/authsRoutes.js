import Login from "./components/views/auths/Login";
import Register from "./components/views/auths/Register";
import Validate from "./components/views/auths/Validate";
import ForgotPassword from "./components/views/auths/ForgotPassword";


const authsRoutes = [
    {
        path:'/login',
        component:<Login/>,
        layout:'/auths',
    },
    {
        path:'/register',
        component:<Register/>,
        layout:'/auths',
    },
    {
        path:'/validate',
        component:<Validate/>,
        layout:'/auths',
    },
    {
        path:'/forgot_password',
        component:<ForgotPassword/>,
        layout:'/auths',  
    }
]

export default authsRoutes