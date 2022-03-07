let express = require('express')
let app = express()

app.get('/', (request, response) => {
  response.send('Bonjour')
})
app.get('/demo', (request, response) => {
  response.send('Bonjour je suis la démo')
})

app.get('/knx', (request, response) => {
    response.redirect('http://localhost:3000/')
  })
app.post('/', (request, response) => {
    // Traitement des données
})

app.listen(8080)
