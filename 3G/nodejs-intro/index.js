const express = require('express')
const app = express()

expressPort = 3000

app.listen(expressPort, function(){
    console.log('Listening on port ' + expressPort)
})

app.get('/guests', (req, res) => {
    console.log('New visitor on /guests')
})