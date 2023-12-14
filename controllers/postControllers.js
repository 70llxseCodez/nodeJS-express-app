import postModels from '../models/postModels.js'

// creater Post
export const createdNewPost = async (req, res) => {
	try {
		const doc = new postModels({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			user: req.userId,
			imageUrl: req.body.imageUrl,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(`error : ${err}`)
		res.status(500).json({
			message: `you cant create`,
		})
	}
}

//get all Post

export const getAllPosts = async (req, res) => {
	try {
		const posts = await postModels.find().populate('user').exec()
		res.json(posts)
	} catch (error) {
		console.log(`error : ${error}`)
		res.status(500).json({
			message: `you cant create`,
		})
	}
}

//get one post

export const getSinglePost = async (req, res) => {
	try {
		const postId = await req.params.id

		postModels.findByIdAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					res.status(500).json({
						message: `you can't`,
					})
				}
				if (!doc) {
					res.status(404).json({
						message: 'not found the post',
					})
				}
				res.json(doc)
			}
		)
	} catch (error) {
		console.log(`error : ${err}`)
		res.status(500).json({
			message: `you cant create`,
		})
	}
}

// Remove Post

export const removePost = async (req, res) => {
	try {
		const postId = await req.params.id
		postModels.findByIdAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'it cant',
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'not found maybe it was delete',
					})
				}
				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(`error : ${err}`)
		res.status(500).json({
			message: `you cant delete`,
		})
	}
}

// Update Post

export const updatePost = async (req, res) => {
	try {
		const postId = await req.params.id
		await postModels.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imgUrl: req.body.imgUrl,
				tags: req.body.tags,
				user: req.userId,
			}
		)
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(`error : ${err}`)
		return res.status(500).json({
			message: `cant update post`,
		})
	}
}
