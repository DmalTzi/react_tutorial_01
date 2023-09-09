const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRoute = require("./routes/blog")
const authRoute = require("./routes/auth")

require("dotenv").config()

const app = express()

//connect db
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:false,
})
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err))

//middle ware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT || 8080

app.listen(port,()=>console.log(`listening server in ${port}`))