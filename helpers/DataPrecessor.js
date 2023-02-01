import { Games } from "../models/Models.js"
const FindById = (data, id)=>{
    let ret = null
    data.forEach(element => {
        console.log(element, id)
        if(element.id == id){
            ret = data[data.indexOf(element)]
        }
    });
    console.log('/n/n/n/n/n/n')
    return ret
}

const Add = (data, element)=>{
    data.push(element)
}

const Remove = (data, e)=>{
    data.forEach(element => {
        if(element == e){
            delete data[data.indexOf(e)]
            return data.indexOf(e)
        }
    });
    return -1
}

const SearchGame = (code) =>{
    var game = null
    Games.forEach(element=>{
        if(element.code.toString() == code.toString() ) {   
            game = element
            return
        }
    })
    return game;
}

export {FindById, Add, Remove,SearchGame}