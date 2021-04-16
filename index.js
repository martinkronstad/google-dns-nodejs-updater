require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const change = require('./change');

app.get('/', change.changeIp);

app.listen(port, () => {
  console.log(`Dev app listening at http://localhost:${port}`)
})