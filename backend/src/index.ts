import { WebSocketServer, WebSocket } from "ws";
import { v4 } from "uuid";
const wss =new WebSocketServer({port: 8080});
interface User{
    socket:WebSocket;
    room:string;
}
let allSockets:User[]=[]

wss.on('connection',(socket)=>{
const userId=v4()
socket.send(JSON.stringify({
    type:'id',
    id:userId
}))

    socket.on('message',(message)=>{
        //@ts-ignore
        const parsedMessage=JSON.parse(message);
        if(parsedMessage.type=="join"){
            allSockets.push({
                socket,
                room:parsedMessage.payload.roomId
            })           
        }
        if(parsedMessage.type=="chat"){
            const currentUserRoom=allSockets.find((x)=>x.socket==socket)?.room;
            //@ts-ignore
            const mess={
                type:"chat",
                message:parsedMessage.payload.message,
                id:userId
            }
            allSockets.filter((x)=>x.room == currentUserRoom).map((y)=>y.socket.send(JSON.stringify(mess)));
        }
        if(parsedMessage.type=="leave"){
            allSockets=allSockets.filter((x)=>x.socket!=socket);
        }
    })
})