import Broadcast from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { Users, Games } from "../models/Models.js"

const Restart = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    if(cur_user == cur_game.host && !cur_game.started){
        cur_game.Restart()
        const res = {
            type: "game_data",
            data: {
                game: cur_game
            }
        }        
        Broadcast(cur_game, res)
    }
}

export default Restart