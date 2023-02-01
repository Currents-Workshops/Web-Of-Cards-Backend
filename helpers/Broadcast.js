import { Connections } from "./../models/Models.js";
const Broadcast = (game,data) =>{
    game.users.forEach(user => {
        Connections[user.id].send(JSON.stringify(data))
    });
}
export default Broadcast