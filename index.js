const express = require('express')
const router = require('./routes')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(router)


app.listen(3000, () => {
    console.log('server started on localhost:3000')
})


