import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users,Game } from "../models/Models.js"
import { SearchGame }  from "../helpers/DataPrecessor.js"

const JoinGame = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    let game = SearchGame(req.game_code)
    if(game == null)
    {
        ws.send(JSON.stringify({
            type: "not_found",
            data: {
                "message":"Game Not Found"
            }
        }))   
    }
    game.UserJoined(cur_user)
    ws.send(JSON.stringify({
        type: "joined_game",
        data: {
            game:game
        }
    }))
}

export default JoinGame