import { Add, FindById, Remove } from "../helpers/DataPrecessor.js"
import GenerateRandomCodes from "../helpers/GenerateRandomCode.js"

const CARDS_PER_HAND = 7
const MAX_PLAYER_COUNT = 4

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
            this.cards.push(card)
        });
    }
    DropCard = (card_index)=>{
        if(this.InGame && this.cards.length > card_index){
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
        if(this.number == card.number)
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
        this.leaderboard = []
    }
    StartGame = ()=>{
        this.started = true
        var allCards = []
        const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']
        const types = ['spade', 'club', 'heart', 'diamond']
        types.forEach(type => {
            numbers.forEach(number=>{
                allCards.push(new Card(number, type))
            })
        })
        this.users.forEach(user => {
            let random_index = Math.floor(Math.random()*allCards.length)
            let hand = []
            for(let i=0; i<CARDS_PER_HAND; i++){
                hand.push(allCards[random_index])
                allCards.splice(random_index, 1)
            }
            this.UserTookCards(user, hand)            
        })
        this.cur_turn = Math.floor(Math.random()*this.users.length)
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
        this.cur_turn++
        if(this.cur_turn == this.users.length)
            this.cur_turn = 0
        const cur_user = this.users[this.users.indexOf(user)]
        const card_dropped = cur_user.DropCard(card_index)
        const center_card = this.center_deck[this.center_deck.length - 1]
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
    IsGameCompleted = () =>{
        if(this.users.length - this.leaderboard.length == 1)
        {
            this.users.forEach((user)=>{
                if(!this.leaderboard.includes(user))
                {
                    this.AddLeaderBoardPlayer(user);
                }
            })
        }
        return this.users.length - this.leaderboard.length <= 1; 
    }
    GetLeaderBoard = ()=>{
        return this.leaderboard;
    }
    AddLeaderBoardPlayer = (user)=>{
        this.leaderboard = [user,...this.leaderboard]
    }
}

var Users = []
var Games = []
var Connections = {}

export {User, Game, Card, Users, Games, Connections}