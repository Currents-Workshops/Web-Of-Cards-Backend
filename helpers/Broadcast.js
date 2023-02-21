import { Connections } from "./../models/Models.js";
const Broadcast = (game,data) =>{
    //SEND THE data TO EVERY USER IN THE game
    game.users.forEach(user => {
        Connections[user.id].send(JSON.stringify(data))
    });
}
export default Broadcast