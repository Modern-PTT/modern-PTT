import bcrypt from "bcryptjs"


let testdate = 1637848118000

const secondToDate = (seconds)=>{
    const date = seconds.getDate() //15
    const day = seconds.getDay()  //5
    const month = seconds.getMonth()  //6
    const year = seconds.getFullYear()  //2016
}

var password = "password"


var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);
console.log("salt"+salt)

const getSalt = ()=>{
    
}


// export default {getSalt};