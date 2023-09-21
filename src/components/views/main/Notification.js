import React,{useState} from 'react'

import '../../../assets/styleSheets/notificationStyles/notificationStyles.css'

const raw_notifications = [
    {
        id:0,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'Pablo Escobar',
        profile_picture:''
    },
    {
        id:1,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'Simo Ulrich',
        profile_picture:''
    },
    {
        id:2,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'Samuel',
        profile_picture:''
    },
    {
        id:3,
        description:'New Game Event ',
        date:'05/25/2023',
        sender:'HOBBIE',
        profile_picture:''
    },
    {
        id:4,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'James',
        profile_picture:''
    },
    {
        id:5,
        description:'Accepted demand',
        date:'05/25/2023',
        sender:'Cristiano Ronaldo',
        profile_picture:''
    },
    {
        id:6,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'Jackee Chain',
        profile_picture:''
    },
    {
        id:7,
        description:'Accepted demand',
        date:'05/25/2023',
        sender:'Gims',
        profile_picture:''
    },
    {
        id:8,
        description:'Accepted demand',
        date:'05/25/2023',
        sender:'Domguia Senior',
        profile_picture:''
    },
    {
        id:9,
        description:'The birthday of Pablo Escobar',
        date:'05/25/2023',
        sender:'Sangoku',
        profile_picture:''
    },
]
const Notification =()=>{

const [notifications ,setNotifications] = useState(raw_notifications)

function closeNotification(id){
    console.log(id)
    let newNotification = notifications.filter(notif => {
        if(notif.id !== id){
            return notif
        }
    })
    setNotifications(newNotification)
}


let displayNotification = notifications.map(notif => {
    return(
        <div className='notification-body'>
            <div>
                <div className='notification-profile-picture'></div>
                <div className='content'>
                    <span className='bold'>{notif.sender}</span>
                    <span>{notif.description}</span>
                    <span className='light'>{notif.date}</span>
                </div>
            </div>
            <div className='notification-close' onClick={()=>closeNotification(notif.id)}>
                <span className='fas fa-close'></span>
            </div>
        </div>
    )
})



    return(
        <React.Fragment>
            <div className="notification">
                {/* <br/> */}
                    <h2>Notifications {notifications.length} </h2>
                {/* <br/>  */}
                {
                    displayNotification
                }
            </div>
        </React.Fragment>
    )
}

export default Notification