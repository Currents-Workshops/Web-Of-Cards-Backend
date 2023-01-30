import { connections } from "./../server";

const WinHandler = (user,game) => {
    // update leaderboard part is pending

    var res = {
        "type": "win_message" , 
        "data": {
            "player-id":user.id
        }
    }
    game.users.forEach(user => {
        connections[user.id].send(JSON.stringify(res))
    });
}

export{WinHandler}

// Import this function in game logic handler and call if player has more cards than limit