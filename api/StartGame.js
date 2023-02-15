import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users } from "../models/Models.js"
import Broadcast from "../helpers/Broadcast.js"

const StartGame = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    if(cur_user == cur_game.host)    
    {
        if(cur_game.StartGame())
        {
            const res = {
                type: "start_game",
                data: {
                    game: cur_game
                }
            }
            Broadcast(cur_game, res)
        }
        else{
            const res = {
                type: "message",
                data: {
                    text: "TOO Few people"
                }
            }
            ws.send(JSON.stringify(res))
        }
        
    }
}

export default StartGame