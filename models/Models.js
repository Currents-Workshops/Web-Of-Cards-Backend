import Broadcast from "../helpers/Broadcast.js"
import { Add, FindById, Remove } from "../helpers/DataPrecessor.js"
import GenerateRandomCodes from "../helpers/GenerateRandomCode.js"

const CARDS_PER_HAND = 10

/* 
    In actual applications we will have databases which store 
    all the necessary data. For simplicity sake we will be storing all the data in classes 
    and we will have an array which will mimic a table
*/

//STORES DATA ABOUT THE USER
class User{
    constructor(){
        this.id = GenerateRandomCodes(10)
        this.InGame = null
        this.cards = []
        this.name = null;
        this.isLost = false
    }
    //SETS THE NAME OF THE user
    SetName = (name) =>{
        this.name = name
    }
    //CREATES A NEW GAME
    CreateNewGame = ()=>{
        const new_game = new Game(this)
        this.InGame = new_game.id
        Add(Games, new_game)
    }
    //MAKES THE USER JOIN A GAME
    JoinGame = (game)=>{
        if(this.InGame) return 0
        const cur_game = FindById(Games, game.id)
        cur_game.UserJoined(this)
        this.InGame = game.id
    }
    //MAKES THE USER LEAVE A GAME
    LeaveGame = ()=>{
        const cur_game = FindById(Games, this.InGame)
        cur_game.UserLeft(this)
        this.InGame = null
    }
    //ADDS A BUNCH OF CARDS TO THE USERS DECK
    AddCards = (cards)=>{
        if(this.InGame)
            cards.forEach(card => {
                this.cards.push(card)
            });
    }
    //DROPS THE CARD THE USER WANTS TO
    DropCard = (card_index)=>{
        if(this.InGame && this.cards.length > card_index){
            return this.cards.splice(card_index, 1)[0]
        }
    }
}

//STORES DATA ABOUT EACH CARD
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
        if(this.users.length <= 1) return false
        this.started = true
        var allCards = []
        const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        const types = ['spades', 'clubs', 'hearts', 'diams']
        types.forEach(type => {
            numbers.forEach(number=>{
                allCards.push(new Card(number, type))
            })
        })
        this.users.forEach(user => {
            let hand = []
            for(let i=0; i<CARDS_PER_HAND; i++){
                let random_index = Math.floor(Math.random()*(allCards.length))
                hand.push(allCards[random_index])
                allCards.splice(random_index, 1)
            }
            this.UserTookCards(user, hand)            
        })
        this.cur_turn = Math.floor(Math.random()*this.users.length)
        return true
    }
    UserJoined = (user)=>{
        if(this.users.length >= 4 || this.started) return false
        user.InGame = this.id
        this.users.push(user)
        return true
    }
    UserLeft = (user)=>{
        user.cards = []
        this.users.splice(this.users.indexOf(user), 1)
        if(this.leaderboard.indexOf(user) != -1){
            this.leaderboard.splice(this.leaderboard.indexOf(user), 1)
        }
        this.host = this.users[0]
        if(this.users.length == 1) return false
        if(this.cur_turn > this.users.length)
            this.cur_turn = 0
        return true
    }
    UserDroppedCard = (user, card_index)=>{
        if(this.users[this.cur_turn] != user)
            return false
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
        }
        else
            this.center_deck.push(card_dropped)
        this.cur_turn++
        if(this.cur_turn == this.users.length)
            this.cur_turn = 0
        while(this.users[this.cur_turn].isLost){
            this.cur_turn++
            if(this.cur_turn == this.users.length)
                this.cur_turn = 0
        }
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
    Restart = ()=>{
        this.started = false
        this.cur_turn = null
        this.center_deck = []
        this.leaderboard = []
        this.users.forEach(user => {
            user.isLost = false
            user.cards = []
        })
        this.StartGame()
    }
}

var Users = []
var Games = []
var Connections = {}

export {User, Game, Card, Users, Games, Connections}