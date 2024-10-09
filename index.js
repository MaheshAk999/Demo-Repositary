import express from "express"
import cors from 'cors' // accepts api requests from the different networks allows requests from any origin
import mysql from 'mysql'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
const app = express()
let trans = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'akaramsettymahesh@gmail.com',
		pass: 'slbgqvpakjfjfujw'
	}
})
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'budgetplan'
})
con.connect(function (err) {
	if (err)
		throw err
	console.log("Successfully connected to database")
})
const EmailSending = (username, otp) => {
	let mailoptions = {
		from: 'akaramsettymahesh@gmail.com',
		to: `${username}`,
		subject: 'One Time Password',
		text: `Your OTP is ${otp}`
	}
	trans.sendMail(mailoptions, (err) => {
		if (err)
			return "error in sending"
		else {
			return "Sent Email Successfully"
		}
	})
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.post("/signup", (req, res) => {
	const username = req.body.username
	con.query(`select * from login where email='${username}'`, (err,data) => {
		if (err)
			throw err 
		console.log(data)
		if (data.length > 0) {
			res.json({ otp: 404,msg:'Email Already Exist' })
			console.log("Exist")
		}
		else {
			const random = Math.floor(100000 + Math.random() * 900000)
			if (EmailSending(username, random) == "error in sending")
				res.json({ otp: 404, msg: 'Error Didnot send' })
			else 
				res.json({ otp: `${random}`, msg: 'OTP sent successfully' })

		}
	})
})
app.post('/sign', (req, res) => {
	const { username, password } = req.body
	con.query(`insert into login values('${username}','${password}')`, (err) => {
		if (err)
			throw err 

		res.send({otp:'',msg:'Successfully registered'})
		console.log("data inserted successfully into login")
	})
})
app.post('/login', (req, res) => {
	const { username, password } = req.body
	con.query(`select * from login where email='${username}' and password='${password}'`, (err, data) => {
		if (err)
			throw err 
		if (data.length == 1) {
			res.json({ status: 'Successfully Logged in' })
		}
		else {
			con.query(`select * from login where email='${username}' and password!='${password}'`, (err, data) => {
				if (err)
					throw err 
				if (data.length == 1) {
					res.json({ status: 'Password Wrong' })
				}
				else {
					res.json({status:'No Acccount with this email'})
				}
			})
		}
	})
})
app.post('/forgotpass', (req, res) => {
	const { username } = req.body
	console.log("Pass")
	console.log(username)
	con.query(`select * from login where email='${username}'`, (err, data) => {
		if (data.length == 1) {
			const random = Math.floor(100000 + Math.random() * 900000)
			if (EmailSending(username, random) == "error in sending")
				res.json({ otp: 404, msg: 'Error Didnot send' })
			else {
				console.log("SEnt successfully")
				res.json({ otp: `${random}`, msg: 'OTP sent successfully' })

			}
		}
		else {
			res.json({otp:404,msg:'No Email with this Account'})
		}
	})
})
app.post('/forgotpassword', (req, res) => {
	const { username, password } = req.body
	console.log('forgotpassword')
	con.query(`select * from login where email='${username}'`, (err,data) => {
		if (err)
		throw err 
		if (data.length == 1) {
			con.query(`update login set password='${password}' where email='${username}'`, (err) => {
				if (err)
					throw err 
					console.log("Updated")
				res.json({otp:'',msg:'Updated Successfully'})
			})

		}
	})
})
app.post('/senddatatocart', (req, res) => {
	const { name, category, quantity, prize, type, weight,src,index,actualprize } = req.body
	var quer = `insert into cart values('${name}','${category}',${quantity},${prize},'${type}',${weight},'${src}',${index},${actualprize})`
	con.query(quer, (err, data) => {
		if (err)
			throw err
		else {
			console.log("Data inserted successfully into the cart")
		}
	})
	con.query(`update cartbool set bool='1' where ind=${index}`, (err, data) => {
		if (err)
			throw err
		else {
			con.query('select * from cartbool', (err, data) => {
				if (err)
					throw err
				else
					return res.json(data)
			})
		}
	})
})
app.get('/cartbool', (req, res) => {
	con.query('select * from cartbool', (err, data) => {
		if (err)
			throw err 
		else 
		return res.json(data)
	})
})
app.get('/cartdataa', (req, res) => {
	con.query('select * from cart', (err, data) => {
		if (err)
			throw err 
		return res.json(data)
	})
})
app.post('/removecartdata', (req, res) => {
	const { index } = req.body 
	con.query(`delete from cart where ind=${index}`, (err,data) => {
		if (err)
			throw err 
		con.query(`update cartbool set bool=0 where ind=${index}`, (err) => {
			if (err)
				throw err
			return res.json({})
		})
	})
})
app.get('/prizeDetails', (req, res) => {
	con.query(` select sum(prize) as output from cart union select sum(original) from cart`, (err, data) => {
		if (err)
			throw err 
		return res.json(data)
	})
})
app.listen(5000, () => console.log('App is running'))
