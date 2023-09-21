import React,{useState} from 'react'
import {Link, Route,Routes} from 'react-router-dom'

import '../../../assets/styleSheets/chatStyles/chatStyles.css'

const contacts = [
    {
        userName:'Samuel_Escobar',
        lastMessage:'Where is my money...?',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'The_Rock',
        lastMessage:'Why are you not at the trainings ?',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },  
    {
        userName:'Simon',
        lastMessage:'Are you serious !!!',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Pablo',
        lastMessage:'Are you going to work today?',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Lebron_James',
        lastMessage:'I am comming',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },  
    {
        userName:'C. Ronaldo',
        lastMessage:'How are you ?',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Arthur',
        lastMessage:'Am hungry !',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Naomie',
        lastMessage:'Send me those pictures, very fast .',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Jack Sparrow',
        lastMessage:'I found the tresor ?',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Shinra Kusakabe',
        lastMessage:'Am on fire !',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    {
        userName:'Asta',
        lastMessage:'I am the next wizard king.',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')}/>,
        dateOfLastMessage:'2/2/2023',
    },
    
]

const Chat =()=>{

const [activeChat ,setActiveChat] = useState(false)
const [activeContact ,setActiveContact] = useState({})
const [filter ,setFilter] = useState('')

function openChat(contact){
    setActiveChat(true)
    setActiveContact(contact)
}

function closeChat(){
    setActiveChat(false)
    setActiveContact({})
}

function handleFilterChange(e){
    setFilter(e.target.value)
}

let displayContacts = contacts.map(contact =>{
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
                        <div className='contact' onClick={()=>openChat(contact)} key={contact.userName}>
                            <div>
                                {contact.profilePicture}
                                <span>
                                    <span className=''>{mark}</span><br/>
                                    <span className='light'>{contact.lastMessage}</span>
                                </span>
                            </div>
                            <div className='light'>
                                <span className='light'>{contact.dateOfLastMessage}</span>
                                <span className='numberOfMsg'>3</span>
                            </div>
                        </div> 
                    // </Link>
                )
            }
        }else{

            return(
                // <Link to='/home/private-chat'>
                    <div className='contact' onClick={()=>openChat(contact)} key={contact.userName}>
                        <div>
                            {contact.profilePicture}
                            <span>
                                <span className=''>{contact.userName}</span><br/>
                                <span className='light'>{contact.lastMessage}</span>
                            </span>
                        </div>
                        <div className='light'>
                            <span>{contact.dateOfLastMessage}</span>
                            <span className='numberOfMsg'>3</span>
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

    return(
        <React.Fragment>
            <div className='chat-container'>

                {
                    activeChat ?
                        <PrivateChat activeContact={activeContact} setActiveChat={setActiveChat}/>
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

export const PrivateChat=({activeContact ,setActiveChat})=>{

    const [message ,setMessage] = useState('')
    const [isTyping ,setIsTyping] = useState(false)

function sendMessage(){
    console.log(message)
}

function handlChange(e){
    let text = e.target.value
    if(text == ''){
        setIsTyping(false)
    }else{
        setIsTyping(true)
    }
    setMessage(text)
}

function changeIcon(){
   
}
function sendMessage(e){
    e.preventDefault()
}
    return(
        <React.Fragment>
            <div className='chat'>

                <div className='chat-head'>
                    <div>
                    <span className='fas fa-arrow-left' onClick={()=>setActiveChat(false)}></span>
                        {activeContact.profilePicture}
                        {activeContact.userName}
                    </div> 
                    <span className='fas fa-gear'></span>  
                </div>

                <div className='chat-body'>
                    
                </div>

                <div className='chat-foot'>
                    <span className='far fa-smile'></span>
                    <form onSubmit={(e)=>sendMessage(e)}>
                        <input 
                            type='text' 
                            placeholder='Message'
                            value={message}
                            onChange={(e)=>handlChange(e)}
                            onFocus={changeIcon}
                        />
                    </form>
                    {
                        isTyping ?
                        <>
                         <span className='fas fa-paper-plane send' ></span>
                        </>
                        :
                    <>
                        <span className='fas fa-paperclip'></span>
                        <span className='fas fa-microphone'></span>
                    </>
                    }
                </div>

            </div>

        </React.Fragment>
    )
}