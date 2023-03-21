require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const { createServer } = require('http')
const { Server } = require('socket.io')

const registerUserHandler = require('./socketHandlers/user-handler')
const registerApiaryHandler = require('./socketHandlers/apiary-handler')
const registerHiveHandler = require('./socketHandlers/hive-handler')
const authMiddleware = require('./middlewares/auth-middleware')

const app = express();
const port = normalizePort(process.env.PORT || '5000');

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})

const onConnection = (socket) =>
{
    registerUserHandler(io, socket)
    console.log("connected")
}

const onPrivateConnection = (socket) =>{
    console.log("private connected")
    registerApiaryHandler(io, socket)
    registerHiveHandler(io, socket)
}

io.of("/private/").use(authMiddleware)
io.on("connection", onConnection)
io.of("/private/").on("connection", onPrivateConnection)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        httpServer.listen(port, onListening)
    }catch (e){
        console.log(e)
    }
}

start()

function onListening() {
    console.log('Listening on ' + port);
}

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}