// import bcrypt from 'bcrypt';

let testdate = 1637848118000

const secondToDate = (seconds)=>{
    const date = seconds.getDate() //15
    const day = seconds.getDay()  //5
    const month = seconds.getMonth()  //6
    const year = seconds.getFullYear()  //2016
}

// //check the user token

const bcrypt = require('bcrypt');
  
// const saltRounds = 10;
// const myPassword = 'password1';
// const testPassword = 'password2';
// const myHash ='$2a$10$fok18OT0R/cWoR0a.VsjjuuYZV.XrfdYd5CpDWrYkhi1F0i8ABp6e'; // myPassword加密後結果(驗證用)

// 加密git 
// const hash = bcrypt.hashSync(myPassword, saltRounds);
// console.log(hash);

// // 驗證密碼
// console.log(bcrypt.compareSync(myPassword, myHash)); // true
// console.log(bcrypt.compareSync(testPassword, myHash)); // false

//  const saltRounds = 10;
// const getSalt = ({saltRounds})=>{
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         return salt
//       });
// }
// console.log(getSalt(saltRounds))


// export default {getSalt};