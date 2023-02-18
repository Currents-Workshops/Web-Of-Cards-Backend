import Broadcast from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { LoseHandler } from "../helpers/LoseHandler.js"
import { Connections, Games, Users } from "../models/Models.js"

const DropCard = (ws, req)=>{
    //GETTING THE GAME DATA OF THE GAME THE USER IS IN...
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    
    //DROPPING THE CARD
    //DropCard returns TRUE if it's your turn and returns FALSE if it's not your turn
    //Game.UserDroppedCard() drops the card if it's your turm
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