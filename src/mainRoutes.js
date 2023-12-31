import DefaultView from './components/views/main/Default'
import Chat from './components/views/main/Chat'
import Notification from './components/views/main/Notification'
import Profile from './components/views/main/Profile'
import Setting from './components/views/main/Setting'
import Comment from './components/views/main/Comment'
import ViewProfile from './components/views/main/ViewProfile'

import CreatePostForm from './components/views/forms/CreatePostForm'
import EditProfile from './components/views/forms/EditProfileForm'


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
        path:'/posts/comments',
        component:<Comment/>,
        layout:'/home'
    },
    {
        path:'/chat',
        component:<Chat/>,
        layout:'/home'
    },
    {
        path:'/privateChat',
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
    {
        path:'/viewProfile',
        component:<ViewProfile/>,
        layout:'/home'
    },
//Sub routes of Profile Component
    {
        path:'/profile/createPost',
        component:<CreatePostForm/>,
        layout:'/home'
    },
    {
        path:'/profile/editProfile',
        component:<EditProfile/>,
        layout:'/home'
    }
]

export default mainRoutes