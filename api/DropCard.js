import { Broadcast } from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { LoseHandler } from "../helpers/LoseHandler.js"
import { Connections, Games, Users } from "../models/Models.js"

const DropCard = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)

    if(cur_game.UserDroppedCard(cur_user, req.data.card_index)){
        Broadcast(cur_game,{
            type: "game_data",
            data: {
                game: cur_game
            }
        })
        LoseHandler(cur_user,cur_game)
    }
    else
        ws.send(JSON.stringify({
            type: "feedback",
            data: {
                result: "failed",
                message: "not your turn"
            }
        }))
}

export default DropCard