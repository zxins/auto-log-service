const Config = require('./config/config')

async function startServer(){
    const express = require('express')
    const app = express()

    await require('./loaders/index')(app)

    app.listen(Config.port, ()=>{
        console.log(`app listening at http://localhost:${Config.port}`)
    })
}


startServer()