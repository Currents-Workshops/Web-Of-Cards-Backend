import Broadcast from "./Broadcast.js"

const LoseHandler = (user,game) => {
    //THE USER HAS LOST IF HE HAS NO CARDS
    if(user.cards.length == 0)
    {
        user.isLost = true
        //SENDS A MESSAGE TO EVERYONE THAT THE USER HASE LOST
        var res = {
            "type": "lose_message" , 
            "data": {
                game: game
            }
        }
        Broadcast(game,res);

        //ADDS THE LOST PLAYER TO THE LEADERBOARD
        game.AddLeaderBoardPlayer(user);

        //IF GAMES IS COMPLETED THEN THE LEADERBOARD IS RETURNED TO THE PEOPLE IN THE GAME
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
        }
    }   
}

export{LoseHandler}
