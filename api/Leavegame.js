import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users} from "../models/Models.js"

const LeaveGame = (ws)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    cur_game.UserLeft(cur_user)
}



export default LeaveGame











    