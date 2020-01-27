const express = require('express')
require('./db/mongoose')
const cors = require('cors')

const userRouter = require('./routers/user')
const contact = require('./routers/contact')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(contact)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
 
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('red12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()