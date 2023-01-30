import { Games } from "../models/Models.js"
const FindById = (data, id)=>{
    let ret = -1
    data.forEach(element => {
        if(element.id == id){
            ret = data[data.indexOf(element)]
        }
    });
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
    Games.forEach(element=>{
        if(element.code == code ) return element
    })
    return null;
}

export {FindById, Add, Remove,SearchGame}