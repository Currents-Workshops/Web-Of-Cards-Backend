
import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users} from "../models/Models.js"

const Disconnect = (ws)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    if(cur_game != null)
    {
        cur_game.UserLeft(cur_user)
        const res = {
            type: "user_left",
            data: {
                game_data: cur_game
            }
        }
        Broadcast(cur_game, res)
    }
}

export default Disconnect