import { FindById, Remove } from "../helpers/DataPrecessor.js"
import GenerateRandomCodes from "../helpers/GenerateRandomCode.js"

class User{
    constructor(){
        this.id = GenerateRandomCodes(10)
        this.InGame = null
        this.cards = []
    }
    JoinGame = (game)=>{
        if(this.InGame) return 0
        const cur_game = FindById(Games, game.id)
        cur_game.UserJoined(this)
        this.InGame = game.id
    }
    LeaveGame = ()=>{
        const cur_game = FindById(Games, this.InGame)
        cur_game.UserLeft(this)
        this.InGame = null
    }
    AddCards = (cards)=>{
        // if(this.InGame)
            cards.forEach(card => {
                this.cards.push(card)
            });
            console.log(this.cards)
    }
    DropCard = (card_index)=>{
        if(this.InGame && this.cards.length > card_index){
            const card = this.cards[card_index]
            delete this.cards[card_index]
            return card
        }
            delete cards[card_index]
    }
}
class Card{
    constructor(number, type){
        this.id = GenerateRandomCodes(10)
        this.number = number
        this.type = type
    }
}
class Game{
    constructor(host){
        this.id = GenerateRandomCodes(10)
        this.host = host
        this.code = GenerateRandomCodes(6)
        this.users = []
        this.center_deck = []
    }
    UserJoined = (user)=>{
        this.users.push(user)
    }
    UserLeft = (user)=>{
        delete this.users[this.users.indexOf(user)]
    }
    UserDroppedCard = (user, card_index)=>{
        const cur_user = this.users[this.users.indexOf(user)]
        const card_dropped = cur_user.DropCard(card_index)
        this.center_deck.push(card_dropped)
        if(this.center_deck[this.center_deck.length - 1] == card_dropped){
            while(this.center_deck.length > 0){
                let card_index = Math.floor(Math.random() * this.center_deck.length)
                let card = this.center_deck[card_index]
                delete this.center_deck[card_index]
                cur_user.cards.push(card)
            }
        }
    }
    UserTookCards = (user, cards)=>{
        const cur_user = this.users[this.users.indexOf(user)]
        cur_user.AddCards(cards)

    }
}

var Users = []
var Games = []

export {User, Game, Card, Users, Games}