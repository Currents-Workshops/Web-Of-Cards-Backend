import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users,Game } from "../models/Models.js"

const CreateGame = (ws, req)=>{
    //FINDING THE USER AND SETTING THE PLAYERS NAME
    const cur_user = FindById(Users, ws.id)
    cur_user.SetName(req.data.name)
    //CREATING THE GAME
    let new_game = new Game(cur_user);
    cur_user.InGame =  new_game.id
    Games.push(new_game);
    ws.send(JSON.stringify({
        type: "new_game",
        data: {
            game:new_game
        }
    }))
}

export default CreateGame