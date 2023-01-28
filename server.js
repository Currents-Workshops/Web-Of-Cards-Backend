import {Users, User, Game, Games, Card} from "./models/Models.js"
import {WebSocketServer} from "ws"
import * as dotenv from "dotenv"
import { Add, Remove } from "./helpers/DataPrecessor.js"

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

//startgame - Startgame.js
const HandleMessage = (ws, req)=>{
    const func = req.type.charAt(0).toUpperCase() + req.type.slice(1)
    eval(func)(ws, req)
}

var connections = {}


const wss = new WebSocketServer({
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)

const a = new User()
const b = new User()
Add(Users, a)
Add(Users, b)
const g = new Game()
Add(Games, g)
a.JoinGame(g)
b.JoinGame(g)

g.UserTookCards(a, [new Card(7, "Spades")])

console.log(g)


wss.on('connection', (ws)=>{
    let cur_user = new User()
    ws.id = cur_user.id
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
        HandleMessage(ws, req)
    })
    ws.on('close', ()=>{
        
        Remove(Users, FindById(Users, ws.id))

        delete connections[ws.id]
    })
})

export{connections}