const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const { error } = require('console')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
let profileSettings = {
	avatarUrl:
		'http://localhost:3000/uploads/defaults/default-profile-avatar.png',
	bannerUrl:
		'http://localhost:3000/uploads/defaults/default-profile-banner.png',
}
const profilePosts = []
let profileFavouritePosts = []

app.post('/api/profile', (req, res) => {
	const profileData = req.body
	if (!profileData) {
		return res.status(400).send('Invalid post data')
	}

	profileSettings = profileData
	// console.log(profileSettings)

	res.status(200).json(profileData)
})

app.get('/api/profile', (req, res) => {
	// console.log(profileSettings)
	return res.status(200).json(profileSettings)
})

app.post('/api/favourite-posts', (req, res) => {
	const newFavouritePostId = req.body.id
	const actionType = req.body.type
	if (!newFavouritePostId || !actionType) {
		return res.status(400).send('Invalid post data')
	}
	if (actionType === 'add') {
		const favPostToAdd = profilePosts.find(
			post => post.id === newFavouritePostId
		)
		if (!favPostToAdd) {
			return res.status(404).send('Post not found')
		}
		profileFavouritePosts.push(favPostToAdd)

		profileSettings = {
			...profileSettings,
			favouritePosts: profileFavouritePosts,
		}
		// console.log('PROF SETTINGS')
		// console.log(profileSettings)
		// console.log('FAV POSTS')
		// console.log(profileFavouritePosts)

		return res.status(200).json(favPostToAdd)
	} else {
		const updatedFavouritePosts = profileFavouritePosts.filter(
			post => post.id !== newFavouritePostId
		)
		profileFavouritePosts = updatedFavouritePosts
		profileSettings = {
			...profileSettings,
			favouritePosts: profileFavouritePosts,
		}
		// console.log('PROF SETTINGS' + profileSettings)
		// console.log('FAV POSTS' + profileFavouritePosts)

		return res.status(200).json({ message: 'Post removed from favourites' })
	}
})

app.get('/api/favourite-posts', (req, res) => {
	// console.log(profileFavouritePosts)
	return res.status.json(profileFavouritePosts)
})

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, 'uploads')
	},
	filename: (req, file, callBack) => {
		callBack(null, `${file.originalname}`)
	},
})
const upload = multer({
	storage,
	limits: { fileSize: 15 * (1024 * 1024) },
}).fields([
	{ name: 'profileImage', maxCount: 1 },
	{ name: 'postImages', maxCount: 10 },
])

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/api/profileImageReset', (req, res) => {
	const imagePurpose = req.body.imagePurpose
	console.log(imagePurpose)
	if (imagePurpose === 'avatar') {
		profileSettings.avatarUrl =
			'http://localhost:3000/uploads/defaults/default-profile-avatar.png'

		console.log(profileSettings)
	} else if (imagePurpose === 'banner') {
		profileSettings.bannerUrl =
			'http://localhost:3000/uploads/defaults/default-profile-banner.png'
	} else {
		return res.status(400).send({ message: 'Invalid type provided' })
	}

	return res.status(200).json({
		message: `${imagePurpose} reset to default`,
		imageUrl:
			imagePurpose === 'avatar'
				? 'http://localhost:3000/uploads/defaults/default-profile-avatar.png'
				: 'http://localhost:3000/uploads/defaults/default-profile-banner.png',
	})
})

app.post('/api/profileImageUpload', (req, res) => {
	upload(req, res, function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res
					.status(400)
					.json({ message: 'Image is too large. Maximum size is 15MB.' })
			}
			return res.status(400).send({ message: error.message })
		} else if (error) {
			return res
				.status(500)
				.send({ message: 'Server error during file upload.' })
		}

		const file = req.files['profileImage'][0]
		console.log(file)
		if (!file) {
			return res.status(400).send('Please, upload a file')
		}
		const imagePurpose = req.body.imagePurpose
		console.log(imagePurpose)
		imagePurpose === 'banner'
			? (profileSettings = {
					...profileSettings,
					bannerUrl: `http://localhost:3000/uploads/${file.filename}`,
			  })
			: (profileSettings = {
					...profileSettings,
					avatarUrl: `http://localhost:3000/uploads/${file.filename}`,
			  })
		res.status(200).send({
			message: 'File uploaded successfully',
			filePath: `http://localhost:3000/uploads/${file.filename}`,
		})
	})
})

// app.post('/api/postImageUpload', (req, res) => {
// 	upload(req, res, async function (error) {
// 		if (error instanceof multer.MulterError) {
// 			if (error.code === 'LIMIT_FILE_SIZE') {
// 				return res
// 					.status(400)
// 					.json({ message: 'Image is too large. Maximum size is 15MB.' })
// 			}
// 			return res.status(400).send({ message: error.message })
// 		} else if (error) {
// 			return res
// 				.status(500)
// 				.send({ message: 'Server error during file upload.' })
// 		}

// 		const files = req.files['postImages'] || []

// 		const imageUrls = await Promise.all(
// 			files.map(async file => {
// 				const image = sharp(file.path)
// 				const { width, height } = await image.metadata()
// 				const imageOrientation = width > height ? 'album' : 'portrait'
// 				return {
// 					img: `http://localhost:3000/uploads/${file.filename}`,
// 					imageOrientation,
// 				}
// 			})
// 		)
// 		return res
// 			.status(200)
// 			.send({ message: 'Post images uploaded successfully', images: imageUrls })
// 	})
// })

app.post('/api/post', (req, res) => {
	upload(req, res, async function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res
					.status(400)
					.json({ message: 'Image is too large. Maximum size is 15MB.' })
			}
			return res.status(400).send({ message: error.message })
		} else if (error) {
			return res
				.status(500)
				.send({ message: 'Server error during file upload.' })
		}

		const files = req.files['postImages'] || []

		const imageUrls = await Promise.all(
			files.map(async file => {
				const image = sharp(file.path)
				const { width, height } = await image.metadata()
				const imageOrientation = width > height ? 'album' : 'portrait'
				return {
					img: `http://localhost:3000/uploads/${file.filename}`,
					imageOrientation,
				}
			})
		)

		const { title, description, date, id } = req.body

		let tags = req.body['tags']

		if (!tags) {
			tags = []
		}

		if (!Array.isArray(tags)) {
			tags = [tags]
		}
		if (!req.body) {
			return res.status(400).send('Invalid post data')
		}

		const newPost = {
			title,
			tags,
			description,
			date,
			id,
			images: imageUrls,
		}

		profilePosts.push(newPost)
		return res.status(200).send(newPost)
	})
})
app.get('/api/post', (req, res) => {
	// console.log(profilePosts)
	return res.status(200).json(profilePosts)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
