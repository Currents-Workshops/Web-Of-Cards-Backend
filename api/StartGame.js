import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users,Game } from "../models/Models.js"
import { SearchGame }  from "../helpers/DataPrecessor.js"

const StartGame = (ws, req)=>{
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)

    if(cur_user != cur_game.host)    
    {
        cur_game.StartGame()
    }
}

export default StartGame