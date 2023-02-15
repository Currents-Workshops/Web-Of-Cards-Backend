import { FindById } from "../helpers/DataPrecessor.js"
import { Users } from "../models/Models.js"
import { SearchGame }  from "../helpers/DataPrecessor.js"
import Broadcast from "../helpers/Broadcast.js"

const JoinGame = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    cur_user.SetName(req.data.name)
    const game = SearchGame(req.data.game_code)
    if(game == null)
    {
        ws.send(JSON.stringify({
            type: "not_found",
            data: {
                "message":"Game Not Found"
            }
        }))   
    }
    else
    {
        const joined = game.UserJoined(cur_user)
        console.log(joined)
        if(joined){
            const data = {
                type: "joined_game",
                data: {
                    game:game
                }
            }
            Broadcast(game, data)
        }
        else{
            const data = {
                type: "message",
                data: {
                    text: "Game full"
                }
            }
            ws.send(JSON.stringify(data))
        }
    }
}

export default JoinGame