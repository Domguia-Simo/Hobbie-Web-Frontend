import DefaultView from './components/views/main/Default'
import Chat from './components/views/main/Chat'
import Notification from './components/views/main/Notification'
import Profile from './components/views/main/Profile'
import Setting from './components/views/main/Setting'
import CreatePostForm from './components/views/forms/CreatePostForm'

//trying to make this component a seperate route without conditional rendering ,
// so as to prodeuce a smooth navigation on mobile
import { PrivateChat } from './components/views/main/Chat'

const mainRoutes = [
    {
        path:'/posts',
        component:<DefaultView/>,
        layout:'/home'
    },
    {
        path:'/chat',
        component:<Chat/>,
        layout:'/home'
    },
    {
        path:'/private-chat',
        component:<PrivateChat/>,
        layout:'/home'
    },
    {
        path:'/profile/*',
        component:<Profile/>,
        layout:'/home'
    },
    {
        path:'/notification',
        component:<Notification/>,
        layout:'/home'
    },
    {
        path:'/setting',
        component:<Setting/>,
        layout:'/home'
    },
//Sub routes of Profile Component
    {
        path:'/profile/createPost',
        component:<CreatePostForm/>,
        layout:'/home'
    }
]

export default mainRoutes