import { FindById } from "../helpers/DataPrecessor.js"
import { Users } from "../models/Models.js"
import { SearchGame }  from "../helpers/DataPrecessor.js"
import Broadcast from "../helpers/Broadcast.js"

const JoinGame = (ws, req)=>{
    //FINDING THE USER AND SETTING THE PLAYERS NAME
    const cur_user = FindById(Users, ws.id)
    cur_user.SetName(req.data.name)

    //SEARCHING THE GAME USING THE GAME CODE
    const game = SearchGame(req.data.game_code)
    if(game == null)
    {
        //TELLS THE USER THAT THE GAME WAS NOT FOUND
        ws.send(JSON.stringify({
            type: "not_found",
            data: {
                "message":"Game Not Found"
            }
        }))   
    }
    else
    {
        //USERJOINED RETURNS TRUE IF THE GAME IS NOT FULL AND RETURNS FALSE IF THE GAME IS TRUE
        if(game.UserJoined(cur_user)){
            //IF THE GAME EXISTS AND IS NOT FULL THE USER IS ADDED TO THE GAME
            const data = {
                type: "joined_game",
                data: {
                    game:game
                }
            }
            //EVERYONE IN THE GAME IS TOLD THAT THE CURRENT USER HAS JOINED THE GAME
            Broadcast(game, data)
        }
        else{
            //TELLS THE USER THE GAME IS FULL
            const data = {
                type: "message",
                data: {
                    text: "Game full"
                }
            }
            ws.send(JSON.stringify(data))
        }
    }
}

export default JoinGame