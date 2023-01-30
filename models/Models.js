import { Add, FindById, Remove } from "../helpers/DataPrecessor.js"
import GenerateRandomCodes from "../helpers/GenerateRandomCode.js"

class User{
    constructor(){
        this.id = GenerateRandomCodes(10)
        this.InGame = null
        this.cards = []
    }
    CreateNewGame = ()=>{
        const new_game = new Game(this)
        this.InGame = new_game.id
        Add(Games, new_game)
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
            console.log(card)
            this.cards.push(card)
        });
    }
    DropCard = (card_index)=>{
        if(this.InGame && this.cards.length > card_index){
            console.log(this.cards)
            return this.cards.splice(card_index, 1)[0]
        }
    }
}
class Card{
    constructor(number, type){
        this.id = GenerateRandomCodes(10)
        this.number = number
        this.type = type
    }
    Equals = (card)=>{
        if(this.number == card.number && this.type == card.type)
            return true
        return false
    }
}
class Game{
    constructor(host){
        this.id = GenerateRandomCodes(10)
        this.host = host
        this.code = GenerateRandomCodes(6)
        this.started = false
        this.users = [host]
        this.cur_turn = null
        this.center_deck = []
    }
    StartGame = ()=>{
        //SHUFFLE CARDS AND DISTRIBUTE IT
        //EACH PLAYER GETS 8 CARDS
    }
    UserJoined = (user)=>{
        this.users.push(user)
        if(this.users.length == 2)
            this.StartGame()
    }
    UserLeft = (user)=>{
        delete this.users[this.users.indexOf(user)]
    }
    UserDroppedCard = (user, card_index)=>{
        if(this.users[this.cur_turn] != user)
            return false
        const cur_user = this.users[this.users.indexOf(user)]
        const card_dropped = cur_user.DropCard(card_index)
        const center_card = this.center_deck[this.center_deck.length - 1]
        console.log(card_dropped)
        if(center_card && center_card.Equals(card_dropped)){
            this.center_deck.push(card_dropped)
            while(this.center_deck.length > 0){
                let card_index = Math.floor(Math.random() * this.center_deck.length)
                let card = this.center_deck[card_index]
                this.center_deck.splice(card_index, 1)
                cur_user.cards.push(card)
            }
            return true
        }
        this.center_deck.push(card_dropped)
        return true
    }
    UserTookCards = (user, cards)=>{
        const cur_user = this.users[this.users.indexOf(user)]
        cur_user.AddCards(cards)
    }
}

var Users = []
var Games = []
var Connections = {}

export {User, Game, Card, Users, Games, Connections}