import { connections } from "./../server";

const LoseHandler = (user,game) => {
    // update leaderboard part is pending

    var res = {
        "type": "lose_message" , 
        "data": {
            "player-id":user.id
        }
    }
    game.users.forEach(user => {
        connections[user.id].send(JSON.stringify(res))
    });
}

export{LoseHandler}

// Import this function in game logic handler and call if player is left with no cards