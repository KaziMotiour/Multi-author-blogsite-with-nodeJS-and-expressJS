const express = require("express")
const app = express()
const port = process.env.port || 5000




app.get('/', (req, res)=>{
    res.send("hello")
})


app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})