import {
	createdNewPost,
	getAllPosts,
	getSinglePost,
	removePost,
	updatePost,
} from './controllers/postControllers.js'
import { getMe, login, register } from './controllers/userControllers.js'
import checkAuth from './utils/checkAuth.js'
import { loginValidation } from './validation/loginValidation.js'
import { postValidation } from './validation/postCreatedValidation.js'
import { registerValidation } from './validation/registerValidation.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

mongoose
	.connect(
		'mongodb+srv://70llxse:180305Ar@cluster0.cb2dvny.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('MONGO DB connected'))
	.catch(() => console.log('MONGO DB not connected'))

const app = express()
app.use('/uploads', express.static('uploads'))
app.use(express.json())

// uploads img

const storage = multer.diskStorage({
	destination(_, __, cb) {
		cb(null, 'uploads')
	},
	filename(_, file, cb) {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

app.get('/', (req, res) => {
	res.json({ works: 'hello world' })
})

//register
app.post('/auth/register', registerValidation, register)

// login
app.post('/auth/login', loginValidation, login)

// personality(profile)
app.get('/auth/profile', checkAuth, getMe)

// create post
app.post('/post', checkAuth, postValidation, createdNewPost)

//get all posts
app.get('/post', checkAuth, getAllPosts)

//get single by id
app.get('/post/:id', getSinglePost)

// delete Post (single)
app.delete('/post/:id', checkAuth, removePost)

// update Post
app.patch('/post/:id', checkAuth, postValidation, updatePost)

app.listen(4000, (err) => {
	if (err) {
		console.log(`error from server: ${err}`)
	}
	console.log(`server in running`)
})
