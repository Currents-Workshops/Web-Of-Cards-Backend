import GenerateRandomCodes from "../helpers/GenerateRandomCode.js"

class User{
    constructor(){
        this.id = GenerateRandomCodes(10)
        this.player = null
    }
    
}
class Card{
    constructor(number, type){
        this.number = number
        this.type = type
    }
}
class Player{
    constructor(user){
        this.cards = []
        this.id = GenerateRandomCodes(10)
        this.user_id = user.id
        user.player = this
    }
    AddCards = (cards)=>{
        cards.concat(cards)
    }
    DropCard = (card_index)=>{
        delete cards[card_index]
    }
}
class Game{
    constructor(host){
        this.id = GenerateRandomCodes(10)
        this.host = host
        this.code = GenerateRandomCodes(6)
    }
}

var Users = []
var Players = []
var Games = []

export {User, Game, Player, Card, Users, Players, Games}