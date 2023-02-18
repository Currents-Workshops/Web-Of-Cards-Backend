//GENERATES A RANDOM CODE
const GenerateRandomCodes = (size)=>{
    const ALLOWED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    var temp = ""
    for(let i=0; i<size; i++)
        temp = temp+ALLOWED[Math.floor(Math.random()*ALLOWED.length)]
    return temp
}

export default GenerateRandomCodes