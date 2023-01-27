import {Users, User} from "./models/Models.js"
import {WebSocketServer} from "ws"
import * as dotenv from "dotenv"
import { Add } from "./helpers/DataPrecessor.js"

dotenv.config()

/* 
The request from the client should come in the following format
{
    type: "REQUEST_TYPE"  //(example: connection, make_match, etx)
    data: {
        //HAS ALL THE DATA ABOUT THE REQUEST (ex: client_id, match_id, etc)
    }
}

*/

//ADD ALL THE REQUEST_TYPES HERE AND CREATE A CORRESPONDING FUNCTION IN ./api
const WebSocketMessages = {

}
const HandleMessage = (req)=>{
    const func = req.type.charAt(0).toUpperCase() + req.type.slice(1)
    eval(func)(req)
}

var connections = {}


const wss = new WebSocketServer({
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)


wss.on('connection', (ws)=>{
    let cur_user = new User()
    connections[cur_user.id] = ws
    Add(Users, cur_user)

    //USE A SIMILAR FORMAT TO THIS TO SEND A RESPONSE TO THE CLIENT
    ws.send(JSON.stringify({
        type: "feedback",
        data: {
            result: "success",
            user_id: cur_user.id
        }
    }))
    console.log("USER CONNECTED!", Users)
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(req)
    })
})