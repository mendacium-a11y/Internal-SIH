const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())

app.use(cors())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/profiles',require('./routes/profiles'))
app.use('/api/review',require('./routes/review'))



app.get('/', (req, res) => {
  res.send('Hello saksham!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
