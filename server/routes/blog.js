const express = require('express')
const router = express.Router()
const {create} = require("../controllers/blogController")

router.post("/create",create)

router.get("/test",(req,res)=>{
    res.json({
        hello: "world"
    })
})
module.exports = router