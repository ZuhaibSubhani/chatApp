import { useEffect, useRef, useState } from "react"
import Message from "./component/Message"

function App() {
  const[messages,setMessages]=useState(["hi there","hey"])
  const InputRef=useRef();
  const roomRef=useRef();
  const wsRef=useRef();
  function send(){
    const input=InputRef.current.value;
    wsRef.current.send(JSON.stringify({type:"chat",
      payload:{
        message:input
      }
    }))
     
  }
  function room(){
    const input=roomRef.current.value;
    wsRef.current.send(JSON.stringify({type:"join",
      payload:{
        roomId:input
      }
    }))
  }
  function close(){
    wsRef.current.close();
  }
  
  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8080");
    ws.onmessage=(event)=>{
      setMessages(m=>[...m,event.data])
    }
    wsRef.current=ws;
    
    // ws.onopen=()=>{
    //   ws.send(JSON.stringify({
    //     type:"join",
    //     payload:{
    //       roomId:"red"
    //     }
    //   }))
    // }
    
    
  },[])

  return (


    
    <div className="bg-slate-800 h-screen w-screen">
      <div> {messages.map(m=><div><Message message={m}/> </div>)}</div>
    

      <div className="m-2 fixed bottom-10 left-1/2" >
      <input type="text" placeholder="room" ref={roomRef}/>
      <button className="bg-blue-400 rounded-sm mx-2 px-2" onClick={room}>send</button>
      <button className="bg-blue-400 rounded-sm mx-2 px-2" onClick={close}>close</button>
    </div>

     <div className="m-2 fixed bottom-2 left-1/2" >
      <input type="text" placeholder="" ref={InputRef}/>
      <button className="bg-blue-400 rounded-sm mx-2 px-2" onClick={send}>send</button>
    </div>
    </div>
  )
}

export default App
