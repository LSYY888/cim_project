var express = require('express')
var path = require('path')
var app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.listen(3003, () => {
    console.log('app')
})