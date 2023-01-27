const FindById = (data, id)=>{
    data.forEach(element => {
        if(element.id == id)
            return data.indexOf(element)
    });
    return -1
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