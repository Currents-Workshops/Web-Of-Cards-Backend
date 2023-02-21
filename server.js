import {Users, User, Games, Connections, Game} from "./models/Models.js"
import {WebSocketServer} from "ws"
import * as dotenv from "dotenv"
import { Add, Remove, FindById } from "./helpers/DataPrecessor.js"
import CreateGame from "./api/CreateGame.js"
import DropCard from "./api/DropCard.js"
import JoinGame from "./api/JoinGame.js"
import StartGame from "./api/StartGame.js"
import Restart from "./api/Restart.js"
import LeaveGame from "./api/Leavegame.js"
import Broadcast from "./helpers/Broadcast.js"

//HELPS US USE THE .env FILE IN OUR CODE
dotenv.config()

//HANDLES EVERY REQUEST 
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

    //TELLING THE CLIENT THE CONNECTION IS SUCCESSFUL
    ws.send(JSON.stringify({
        type: "feedback",
        data: {
            result: "success",
            user_id: cur_user.id
        }
    }))

    //HANDLING MESSAGES
    ws.on("message", async (message)=>{
        const req = await JSON.parse(message)
        HandleMessage(ws, req)
    })

    //HANDLING CLIENT DISCONNECTION
    ws.on('close', ()=>{
        
        //REMOVES THE USER FROM CONNECTIONS DICTIONARY
        delete Connections[ws.id]

        const cur_user = FindById(Users, ws.id)
        const cur_game = FindById(Games, cur_user.InGame)
        Remove(Users, cur_user)
        if(cur_game != null)
        {
            cur_game.UserLeft(cur_user)

            //IF ONLY ONE USER IS LEFT IN THE GAME WE END THE GAME
            if(cur_game.IsGameCompleted())
            {
                cur_game.started = false
                var res1 = {
                    "type": "leaderboard" , 
                    "data": {
                        game: cur_game
                    }
                }
                Broadcast(cur_game,res1);
                cur_game.started = false;
            }

            const res = {
                type: "left_game",
            }
            const data = {
                type: "game_data",
                data: {
                    game: cur_game
                }
            }
            ws.send(JSON.stringify(res))
            Broadcast(cur_game, data)
        }  
    })
})
