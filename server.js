import {Users, User, Connections} from "./models/Models.js"
import {WebSocketServer} from "ws"
import * as dotenv from "dotenv"
import { Add, Remove, FindById } from "./helpers/DataPrecessor.js"
import CreateGame from "./api/CreateGame.js"
import DropCard from "./api/DropCard.js"
import JoinGame from "./api/JoinGame.js"
import StartGame from "./api/StartGame.js"
import Restart from "./api/Restart.js"


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


const wss = new WebSocketServer({
    host: process.env.HOST,
    port: process.env.PORT
})
console.log("THE SERVER IS UP AND RUNNING ON PORT "+process.env.PORT)


wss.on('connection', (ws)=>{
    let cur_user = new User()
    ws.id = cur_user.id
    Connections[cur_user.id] = ws
    Add(Users, cur_user)

    //USE A SIMILAR FORMAT TO THIS TO SEND A RESPONSE TO THE CLIENT
    ws.send(JSON.stringify({
        type: "feedback",
        data: {
            result: "success",
            user_id: cur_user.id
        }
    }))
    console.log("USER CONNECTED!")
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(ws, req)
    })
    ws.on('close', ()=>{
        
        //disconnect user from socket
        delete Connections[ws.id]


        //disconnect user from game
        const cur_user = FindById(Users, ws.id)
        const cur_game = FindById(Games, cur_user.InGame)
        Remove(Users, cur_user)
        if(cur_game != null)
        {
            cur_game.UserLeft(cur_user)   
        }
        if(cur_user == cur_game.host){
        if(cur_game.users.length > 0)
            {
                cur_game.host = cur_game.users[0]
                // cur_game.users[0].MakeHost()
            
            }
            else
            {
                Remove(Games, cur_game)
            }
          
        }
            
        
        
        // delete Connections[ws.id]





        // Remove(Users, FindById(Users, ws.id))
        // const cur_user = FindById(Users, ws.id)
        // const cur_game = FindById(Games, cur_user.InGame)
        // if(cur_game != null)
        // {
        //     cur_game.UserLeft(cur_user)   
        // }
        // if(cur_user == cur_game.host){
            
        // }

    



            


    })
})
