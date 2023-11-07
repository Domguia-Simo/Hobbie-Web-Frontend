import React,{useState ,useMemo, useEffect ,useContext} from 'react'
import {Link, Route,Routes, useLocation, useNavigate} from 'react-router-dom'

import { ipAdress, stringDate } from '../../../generals'

import '../../../assets/styleSheets/chatStyles/chatStyles.css'
import request from '../../request/Request'

import { SocketContext } from '../../contextProvider/Provider'

// const socketClient = require('socket.io-client')

// const io = socketClient.io

//socket connection with the server
// let socket = new io(`http://${ipAdress}:5000`)


// const contacts = [
//     {
//         userName:'Samuel_Escobar',
//         lastMessage:'Where is my money...?',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'The_Rock',
//         lastMessage:'Why are you not at the trainings ?',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },  
//     {
//         userName:'Simon',
//         lastMessage:'Are you serious !!!',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Pablo',
//         lastMessage:'Are you going to work today?',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Lebron_James',
//         lastMessage:'I am comming',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },  
//     {
//         userName:'C. Ronaldo',
//         lastMessage:'How are you ?',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Arthur',
//         lastMessage:'Am hungry !',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Naomie',
//         lastMessage:'Send me those pictures, very fast .',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Jack Sparrow',
//         lastMessage:'I found the tresor ?',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Shinra Kusakabe',
//         lastMessage:'Am on fire !',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
//     {
//         userName:'Asta',
//         lastMessage:'I am the next wizard king.',
//         profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
//         dateOfLastMessage:'2/2/2023',
//     },
    
// ]


const Chat =()=>{

let navigate = useNavigate()

const [contacts ,setContacts] = useState([])
const [activeChat ,setActiveChat] = useState(false)
const [activeContact ,setActiveContact] = useState({})
const [filter ,setFilter] = useState('')


useEffect(()=>{

    const fetchData = async()=>{

        let temp = await request({method:'get' ,url:`http://${ipAdress}:5000/api/userResource/getAllContact/${localStorage.getItem('userId')}` })
            // console.log(temp)   
            if(temp.contacts.length == 0){
                setContacts('No conversation')
            }else{
                setContacts(temp.contacts)
            }

    }
    fetchData()

},[0])

function openChat(contact){
    setActiveChat(true)
    setActiveContact(contact)
}


function handleFilterChange(e){
    setFilter(e.target.value)
}

let displayContacts = ''

if(typeof(contacts) != 'string'){
    displayContacts = contacts.map(contact =>{
           if(filter != ''){
               if(contact.userName.toLocaleLowerCase().includes(filter.toLocaleLowerCase())){
                       let mark= [];
                       for(let i=0;i<contact.userName.length;i++){
                           if(filter.toLocaleLowerCase().includes(contact.userName[i].toLocaleLowerCase())){
                               mark.push(<mark>{contact.userName[i]}</mark>)
                           }else{
                               mark.push(contact.userName[i])
                           }
                       }
                   return(
                       // <Link to='/home/private-chat'>
                           <div className='contact' onClick={()=>openChat(contact)} key={contact.userId}>
                               <div>
                               {
                                   contact.profilePicture != 'no' ?
                                   <img src={`http://${ipAdress}:5000/userPictures/${contact.userId}/${contact.profilePicture}`} />
                                   :
                                   <img src={require('../../../assets/images/tempPp.jpg')}/>
                               }
                                   <span>
                                       <span className=''>{mark}</span><br/>
                                       <span className='light'>{contact.lastMessage}</span>
                                   </span>
                               </div>
                               <div className='light'>
                                   <span className='light'>{contact.date.split(' ')[1]}</span>
                                   {/* <span className='numberOfMsg'>3</span> */}
                               </div>
                           </div> 
                       // </Link>
                   )
               }
           }else{
   
               return(
                   // <Link to='/home/private-chat'>
                       <div className='contact' onClick={()=>openChat(contact)} key={contact.userId}>
                           <div>
                               {
                                   contact.profilePicture != 'no' ?
                                   <img src={`http://${ipAdress}:5000/userPictures/${contact.userId}/${contact.profilePicture}`} />
                                   :
                                   <img src={require('../../../assets/images/tempPp.jpg')}/>
                               }
                               <span>
                                   <span className=''>{contact.userName}</span><br/>
                                   <span className='light'>{contact.lastMessage}</span>
                               </span>
                           </div>
                           <div className='light'>
                               <span>{(contact.date.split(' ')[1])}</span>
                               {/* <span className='numberOfMsg'></span> */}
                           </div>
               
                       </div>
                   // </Link>
               )
           }
   })
   
   let count = 0
   for(let i=0;i<displayContacts.length;i++){
       if(displayContacts[i] == undefined){
           count++
       }
   }
   if(count == displayContacts.length)
       displayContacts =  <div className='contact'><h2>Not Found</h2></div> 

}else{
    displayContacts = <div className='contact'><h2>No Conversation</h2></div> 
}


    return(
        <React.Fragment>
            <div className='chat-container'>

                {
                    activeChat ?
                        // <PrivateChat activeContact={activeContact} setActiveChat={setActiveChat}/>
                        navigate('/home/privateChat',{state:JSON.stringify(activeContact)})
                    : 
                    <>
                    <center>
                        <div className='chat-filter'>
                            <span className='fas fa-search'></span>
                            <input 
                                type='text'
                                value={filter}
                                onChange={(e)=>handleFilterChange(e)}
                                placeholder='Search for a contact...'
                            />

                        </div>
                    </center>
                    {displayContacts}
                    </>
                }
                
            </div>
   
        </React.Fragment>
    )
}

export default Chat

export const PrivateChat=()=>{

    let navigate = useNavigate()
    let location = useLocation()

    const socket = useContext(SocketContext)


    const [oldMessages ,setOldMessages] = useState([])
    const [message ,setMessage] = useState('')
    const [isTyping ,setIsTyping] = useState(false)

    const [userName ,setUserName] = useState('')
    const [profilePicture ,setProfilePicture] = useState()

    const [room ,setRoom] = useState('')

    //To get all the previous messages of the current conversation
    useEffect(()=>{
        const fetchData=async()=>{
            let temp = await request({url:`http://${ipAdress}:5000/api/conversation/getAllMessage/${JSON.parse(location.state).userId}/${localStorage.getItem('userId')}` ,method:'get'})
                if(temp.room){
                    // setRoom(temp.room)
                    setOldMessages(temp.messages)
                }else{
                    setOldMessages(temp.messages)
                }
        }
        fetchData()
    },[0])


    //To first initialise the main variables
    useMemo(()=>{
        try{
            setUserName(JSON.parse(location.state).userName)
            if(typeof(JSON.parse(location.state).profilePicture) == 'string'){
                let id = JSON.parse(location.state).userId
                let pp = JSON.parse(location.state).profilePicture
                let img = <img src={`http://${ipAdress}:5000/userPictures/${id}/${pp}`}/>
                setProfilePicture(img)
            }else{
                setProfilePicture(<img src={require('../../../assets/images/tempPp.jpg')}/>)
            }
        }
        catch{
            navigate('/home/posts')
        }

    },[0])



//For a user a enter a room he is not part
socket.on('enterRoom',async(body)=>{
    // console.log('entering a new room')
    // console.log(body)
    if(body.id1 == localStorage.getItem('userId') || body.id2 == localStorage.getItem('userId')){
        socket.emit('joinRoom',{room:body.room})
        console.log('setting the room in the enterRoom')
        setRoom(body.room)
    }
})

useMemo(()=>{
    console.log(room)
},[room])

function handlChange(e){
    let text = e.target.value
    if(text == ''){
        setIsTyping(false)
    }else{
        setIsTyping(true)
    }
    setMessage(text)
}


//Functoin to send a message to another user
function sendMessage(e){
    e.preventDefault()

    let date = new Date
    date = date.getDate() +'/'+ (date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

    let body = {
        senderId:localStorage.getItem('userId'),
        senderName:localStorage.getItem('userName'),
        receiverId:JSON.parse(location.state).userId,
        receiverName:JSON.parse(location.state).userName,
        message:message,
        date:date,
        room:room,
        state:'pending'
    }
    console.log(body)
    // return
//Very first message
if(typeof(oldMessages) == 'string'){
    setOldMessages([body])  
}
//Appending the new messages to the existinh ones
else{
    let newOldMessage = oldMessages
    newOldMessage.push(body)
     setOldMessages(newOldMessage)
    //  console.log(oldMessages)
}
    if(message.length > 0){
        socket.emit('sendMessage',body)
    }
    setMessage('')
}

//The confirmation that the message has been store correctly
socket.on('messageStored',(newMessage)=>{
    console.log('the message i send has been store')
    setOldMessages(newMessage)
})

//To show that the message was correctly recieved by the receiving user
socket.on('messageReceived',(newMessage)=>{
    console.log('i received a message')
    setOldMessages(newMessage)
})

//To receive a sent message
socket.on('receivedMessage',(body)=>{
    console.log(body)
    // return
    let newOldMessage = oldMessages
    newOldMessage.push(body.newMessage)
    setOldMessages(newOldMessage)
    console.log(oldMessages)

    socket.emit('confirmReceivedMessage',{room:room ,message:body.newMessage})
})


let displayOldMessages = ''
if(typeof(oldMessages) != 'string'){
     displayOldMessages = oldMessages.map(oldmsg => {
        let icon = ''
        switch(oldmsg.state){
            case 'pending':
                icon = 'far fa-clock'
                break
            case 'stored':
                icon = 'fas fa-check'
                break
            case 'received':
                icon = 'fas fa-check-double'
                break
}
        return(
            <div key={oldmsg.date+Date.now()+oldmsg.message} className={oldmsg.senderId == localStorage.getItem('userId') ? 'senderMsg' : 'receiverMsg'}>
                {oldmsg.message}
                <span className='date'>{oldmsg.date.split(' ')[1]} &nbsp; <i className={icon}></i></span>
            </div>
        )
    })

}

    return(
        <React.Fragment>
            <div className='chat-container'>

            <div className='chat'>

                <div className='chat-head'>
                    <div>
                    <span className='fas fa-arrow-left' onClick={()=> JSON.parse(location.state).view ? navigate(-1) :navigate(-2)}></span>
                        {profilePicture}
                        {userName}
                    </div> 
                    <span className='fas fa-gear'></span>  
                </div>

                <div className='chat-body'>
                    {displayOldMessages}
                </div>

                <div className='chat-foot'>
                    <span className='far fa-smile'></span>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Message'
                            value={message}
                            onChange={(e)=>handlChange(e)}
                        />
                    </div>
                    {
                        isTyping ?
                        <>
                         <span className='fas fa-paper-plane send' onClick={(e)=>sendMessage(e)}></span>
                        </>
                        :
                    <>
                        <span className='fas fa-paperclip'></span>
                        <span className='fas fa-microphone'></span>
                    </>
                    }
                </div>

            </div>
            </div>

        </React.Fragment>
    )
}