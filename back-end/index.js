// reference for packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// using
const app = express();	
app.use(express.json());
app.use(cors());

//Connect MangoDb
const url =""; // your db url here

mongoose.connect(url, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB"))
.catch(console.error);
app.listen(5000); // port num is your wish 


// Models
const User = require('./Models/User');


// route for register a new user
app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const Password = await bcrypt.hash(req.body.password, 10)
		console.log(Password)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: Password,
		   })
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})


// route for Previous user login
app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secretcode' // put your secret code
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})
