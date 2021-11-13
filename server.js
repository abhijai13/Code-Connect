const express = require("express")
const connectDB = require("./config/db")
// const formidable = require('express-formidable');

const app = express()

//Connect to database
connectDB()

const port = process.env.PORT || 8080

//Init Middleware
app.use(express.json({extended: false}))
// app.use(formidable());

app.get("/",(req,res)=>{
    res.send("API running")
})

app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/profile', require('./routes/api/profile.js'))
app.use('/api/posts', require('./routes/api/posts.js'))


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})