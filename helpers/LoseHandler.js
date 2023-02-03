import Broadcast from "./Broadcast.js"

const LoseHandler = (user,game) => {
    if(user.cards.length == 0)
    {
        var res = {
            "type": "lose_message" , 
            "data": {
                "player-id":user.id
            }
        }
        Broadcast(game,res);
        game.AddLeaderBoardPlayer(user);
        if(game.IsGameCompleted())
        {
            game.started = false
            var res = {
                "type": "leaderboard" , 
                "data": {
                    game: game
                }
            }
            Broadcast(game,res);
            game.started = false;
        }
    }   
}

export{LoseHandler}
