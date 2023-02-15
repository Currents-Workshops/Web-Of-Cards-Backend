import Broadcast from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users} from "../models/Models.js"

const LeaveGame = (ws)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    if(cur_game){
        cur_game.UserLeft(cur_user)

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
}



export default LeaveGame











    