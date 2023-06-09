import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push ,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
  databaseURL:'https://wearechampions-2bfe5-default-rtdb.europe-west1.firebasedatabase.app/'
}



const app=initializeApp(appSettings)
const database=getDatabase(app)
const messageListInDb=ref(database,'messageList')




const messageList=document.getElementById('message-list')
const textMessage=document.getElementById('text-message')
const from=document.getElementById('from')
const to =document.getElementById('to')
const publishBtn=document.getElementById('publish')

function getRandomLike(){
 let randomLike=Math.floor(Math.random()*15)
 return randomLike
}






publishBtn.addEventListener('click',()=>{
  let messageObject={
    messageText: textMessage.value,
    messageFrom:from.value,
    messageTo:to.value,
    likes:getRandomLike(),
  }
  
  clearMessages()
  push(messageListInDb,messageObject)
  
  textMessage.value=''
  to.value=''
  from.value=''
})

onValue(messageListInDb,(snapshot)=>{
  let messageArray=Object.values(snapshot.val())
  
  messageArray.reverse()
  clearMessages()

  for(let i=0;i < messageArray.length;i++){
    let currentMessages=messageArray[i]
appaendMessagesList(currentMessages)
  }
})


 function clearMessages(){
  messageList.innerHTML=''
 }


function appaendMessagesList(messageValue){
    messageList.innerHTML+=`
    <li class="message">
      <div class="message-top">To ${messageValue.messageTo}</div>
      <p class="message-text">${messageValue.messageText}</p>
      <div class="message-bottom">
        <p>From ${messageValue.messageFrom}</p>
        <p>❤️${messageValue.likes}</p>
      </div>
    </li>`
}