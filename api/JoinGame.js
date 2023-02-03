import { FindById } from "../helpers/DataPrecessor.js"
import { Users } from "../models/Models.js"
import { SearchGame }  from "../helpers/DataPrecessor.js"
import Broadcast from "../helpers/Broadcast.js"

const JoinGame = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
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
        game.UserJoined(cur_user)
        const data = {
            type: "joined_game",
            data: {
                game:game
            }
        }
        Broadcast(game, data)
    }
}

export default JoinGame