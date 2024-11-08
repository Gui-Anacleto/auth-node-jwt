require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./models/User')

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
	res.status(200).json({msg: "Hello world!!! API"})
})

app.post('/auth/register', async(req, res) => {
	const {
		name, 
		email, 
		password, 
		confirmpassword
	} = req.body

	if (!name) {
		return res.status(422).json({ msg: 'O nome e obrigatorio'})
	}

	if (!email) {
		return res.status(422).json({ msg: 'O email e obrigatorio'})
	}
	console.log(req.body.password.length)
	if (!password || password.length < 8) {
		return res.status(422).json({ msg: 'Senha deve ter minimo de 8 caracteres'})
	}

	return res.status(200).json({ msg: 'Usuario criado'})
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j4lr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
	)
	.then(() => {
		app.listen(3000)
		console.log('Conectou ao banco')
	})
	.catch((err) => console.log(err))
