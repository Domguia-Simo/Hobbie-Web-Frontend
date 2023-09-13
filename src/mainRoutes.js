import Default from './components/views/main/Default'
import Chat from './components/views/main/Chat'
import { PrivateChat } from './components/views/main/Chat'

const mainRoutes = [
    {
        path:'/posts',
        component:<Default/>,
        layout:'/main'
    },
    {
        path:'/chat',
        component:<Chat/>,
        layout:'/main'
    },
    {
        path:'/private-chat',
        component:<PrivateChat/>,
        layout:'/main'
    }
    // {
    //     path:'/notification',
    //     component:'',
    //     layout:'/main'
    // },
    // {
    //     path:'/profile',
    //     component:'',
    //     layout:'/main'
    // },
]

export default mainRoutes