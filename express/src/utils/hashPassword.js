const bcryptjs = require("bcryptjs");

const encrypt = async(password) =>{
    
    try {

    const hash = await bcryptjs.hash(password,10)
    return hash

    } catch (err) {
        res.send("Error")
    }
    
}

const compare = async(password, hashpassword)=>{
try {
    return await bcryptjs.compare(password,hashpassword)
} catch (err) {
    res.send("Error")
}
    
}

module.exports = {encrypt,compare}