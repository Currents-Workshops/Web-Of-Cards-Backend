import Broadcast from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { Users, Games } from "../models/Models.js"

const Restart = (ws, req)=>{
    //FINDS THE USER AND THE GAME
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    //MAKES SURE ONLY THE HOST CAN RESTART THE GAME AND THE GAME IS NOT ALREADY STARTED
    if(cur_user == cur_game.host && !cur_game.started){
        //RESTARTS THE GAME AND TELLS EVERYONE IN THE GAME THAT THE GAME WAS RESTARTED
        cur_game.Restart()
        const res = {
            type: "start_game",
            data: {
                game: cur_game
            }
        }        
        Broadcast(cur_game, res)
    }
}

export default Restart