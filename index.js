const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")

const app = express()
dotenv.config()


const PORT = process.env.PORT || 5000

app.use(express.json({extended: true,}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))


async function start () {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
		})

		app.listen(PORT, ()=>{
			console.log(`server on port ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}

}
start()