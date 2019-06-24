const app = module.exports = require('express')();

app.use('/launches', require('./launch'))
app.use('/user', require('./user'))