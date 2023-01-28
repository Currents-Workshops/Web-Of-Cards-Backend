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

export {FindById, Add, Remove}