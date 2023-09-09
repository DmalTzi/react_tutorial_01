const jwt = require("jsonwebtoken")
const { expressjwt: JWT } = require("express-jwt");

exports.login=async(req,res)=>{
    const {username,password} = req.body
    console.log(password)
    if(password === process.env.password){
        const token = await jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.json({token,username})
    }else{
        return res.status(400).json({
            err:"รหัสไม่ถูกต้อง!!"
        })
    }
}

const getSecret = async() => {
    const secret = await process.env.JWT_SECRET;
    return secret
  };

// chacking token
exports.requireLogin=JWT({ secret: getSecret, algorithms: ["HS256"], userProperty:"auth"})