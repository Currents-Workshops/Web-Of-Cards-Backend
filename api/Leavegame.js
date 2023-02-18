import Broadcast from "../helpers/Broadcast.js"
import { FindById } from "../helpers/DataPrecessor.js"
import { Games, Users} from "../models/Models.js"

const LeaveGame = (ws)=>{
    //FINDS THE USER AND THE GAME
    const cur_user = FindById(Users, ws.id)
    const cur_game = FindById(Games, cur_user.InGame)
    if(cur_game){
        //REMOVES THE USER FROM THE GAME
        if(cur_game.UserLeft(cur_user)){
            //TELLS EVERYONE IN THE GGAME THAT THE USER HAS LEFT THE GAME
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
        else{
            cur_game.AddLeaderBoardPlayer(cur_user);
            console.log(cur_game.IsGameCompleted())
            if(cur_game.IsGameCompleted())
            {
                cur_game.started = false
                const res = {
                    type: "left_game",
                }
                var data = {
                    "type": "leaderboard" , 
                    "data": {
                        game: cur_game
                    }
                }
                ws.send(JSON.stringify(res))
                Broadcast(cur_game,data);
            }
        }        
    }
}



export default LeaveGame











    