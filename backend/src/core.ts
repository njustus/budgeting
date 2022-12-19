const express = require('express')
const app = express()

app.get('/', function (req: any, res: { send: (arg0: string) => void }) {
  console.log("received request")
  res.send('Hello World')
})

app.listen(3000)
