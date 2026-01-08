import { useState } from 'react'

function App() {
    const [message,setMessage]=useState("");
    const [reply,setReply]=useState("");

    const sendMessage=async()=>{
      const response=await fetch("http://localhost:5000/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({message}),

      });
      const data=await response.json();
      setReply(data.reply);
    }
  return (
    <>
    <div style={{padding:"20px"}}>
      <h2>AI chat</h2>
      
      <input 
      type="text"
      placeholder="type your message"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}/>


      <button onClick={sendMessage}>Send</button>
      <p><strong>AI Reply:</strong></p>
      <p>{reply}</p>
    </div>
     
    </>
  )
}

export default App
