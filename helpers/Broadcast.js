import { Connections } from "./../models/Models";
const Broadcast = (game,data) =>{
    game.users.forEach(user => {
        Connections[user.id].send(JSON.stringify(data))
    });
}
export{Broadcast}