import { useEffect, useRef, useState } from 'react'

import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addPost, fetchPosts } from '../../../redux/slices/postsSlice.js'
import { getDate } from '../../../utils/getDate.js'
import { uploadImage } from '../../../utils/uploadImage'
import Button from '../../Button/Button.jsx'
import ImageInputLabel from '../../Label/ImageInputLabel.jsx'
import InputLabel from '../../Label/InputLabel.jsx'
import TextareaLabel from '../../Label/TextareaLabel.jsx'
import PostCard from '../PostCard/PostCard.jsx'
import Styles from './PostCreator.module.css'

function PostCreator({ setActive }) {
	const imageRef = useRef(null)

	const [title, setTitle] = useState('')
	const [tags, setTags] = useState([])
	const [tag, setTag] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState([])
	const [date, setDate] = useState(null)
	const [id, setId] = useState('')
	const [removingImageIndex, setRemovingImageIndex] = useState(null)
	const [isTagLimitReached, setIsTagLimitReached] = useState(false)
	const dispatch = useDispatch()

	const dispatchInfo = (infoCategory, infoMessage) => {
		dispatch(setInfo({ infoCategory, infoMessage }))
	}

	useEffect(() => {
		dispatch(fetchPosts('http://localhost:3000/api/post'))
	}, [])

	// const handleFormSubmit = e => {
	// 	e.preventDefault()
	// 	const curDate = getDate()
	// 	setDate(curDate)
	// 	if ((title && description) || image) {
	// 		dispatch(addPost({ title, tags, description, image, date: curDate }))
	// 		dispatchInfo('success', 'The post was successfully created')
	// 		setActive(false)
	// 		setTitle('')
	// 		setTags([])
	// 		setDescription('')
	// 		setImage([])
	// 		setDate(null)
	// 		setTag('')
	// 	} else {
	// 		dispatchInfo('error', `Fill the post's info`)
	// 	}
	// }

	const handleFormSubmit = async e => {
		e.preventDefault()
		const curDate = getDate()
		setDate(curDate)
		if ((title && description) || image) {
			const newPost = {
				title,
				tags,
				description,
				image,
				date: curDate,
				id: uuidv4(),
			}

			try {
				const response = await fetch('http://localhost:3000/api/post', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newPost),
				})

				if (response.ok) {
					const savedPost = await response.json()
					dispatch(addPost(savedPost))

					dispatchInfo('success', 'The post was successfully created')
					setActive(false)
					setTitle('')
					setTags([])
					setDescription('')
					setImage([])
					setDate(null)
					setId('')
					setTag('')
					// dispatch(fetchPost('http://localhost:3000/api/post'))
					return savedPost
				} else {
					dispatchInfo('error', `Failed to save post`)
				}
			} catch (error) {
				console.error('Error:', error)
				dispatchInfo('error', error + '')
			}
		} else {
			dispatchInfo('error', `Fill the post's info`)
		}
	}

	const handleImageDelete = id => {
		setRemovingImageIndex(id)
		setTimeout(() => {
			setImage(img => img.filter((_, i) => i !== id))
			setRemovingImageIndex(null)
		}, 300)
	}

	const handleResetAllImages = () => {
		setImage(images =>
			images.map(image => ({
				...image,
				isRemoving: true,
			}))
		)
		setTimeout(() => {
			setImage([])
		}, 300)
	}

	const handleKeyDown = e => {
		const value = e.target.value
		if (value.includes(' ')) {
			const trimmedValue = value.trim()
			if (value.length > MAX_TAG_LENGTH) {
				dispatchInfo(
					'error',
					`No more than ${MAX_TAG_LENGTH} letters in one tag`
				)
			} else if (tags.includes(tag)) {
				dispatchInfo('error', 'There is the same tag')

				e.target.value = ''
				setTag('')
				return
			} else if (trimmedValue && tags.length < 10) {
				setTags(prevTags => [...prevTags, trimmedValue])
			} else if (tags.length >= 10 && !isTagLimitReached) {
				setIsTagLimitReached(true)
				dispatchInfo('error', 'No more than 10 tags are available')
			}
			e.target.value = ''
			setTag('')
		} else {
			setTag(value)
		}
	}

	const handleDeleteTag = id => {
		setIsTagLimitReached(false)
		setTags(tags.filter((_, i) => i !== id))
	}

	const uploadFile = async e => {
		const data = new FormData()
		data.append('postImages', e.target.files[0])

		try {
			const response = await fetch(
				'http://localhost:3000/api/postImageUpload',
				{
					method: 'POST',
					body: data,
				}
			)
			const result = await response.json()
			if (response.ok) {
				console.log(result)
				setImage([...image, result.images[0]])
			} else {
				dispatch(
					setInfo({ infoCategory: 'error', infoMessage: result.message })
				)
			}
		} catch (error) {
			console.log('ERROR catch')
			dispatch(setInfo({ infoCategory: 'error', infoMessage: error.message }))
		}
	}

	const handleOnChange = () => {
		const files = imageRef.current.files
		const overSizedFiles = Array.from(files).filter(
			file => file.size > maxSizeInBytes
		)
		if (files.length > MAX_TAG_LENGTH) {
			dispatchInfo(
				'error',
				'The maximum number of photos that can be uploaded is 15'
			)

			return
		}
		if (overSizedFiles.length > 0) {
			dispatchInfo('error', `Each file must be less than ${MAX_FILE_IN_MB}MB`)

			imageRef.current.value = ''
			return
		}

		uploadImage(imageRef, image, setImage, ...[,], true)
	}

	return (
		<div className={Styles['post-creator__container']}>
			<h3>Create a new post</h3>
			<form
				className={Styles['post-creator__form']}
				onSubmit={handleFormSubmit}
			>
				<PostCard>
					<div className={Styles['post-creator__container']}>
						<div className={Styles['post-creator__card-tag']}>
							<div className={Styles['tags-input-container']}>
								{tags.map((el, id) => (
									<div className={Styles['tag-item']} key={id}>
										<span className={Styles['tag-text']}>{el}</span>
										<span
											className={Styles['close']}
											onClick={() => {
												handleDeleteTag(id)
											}}
										>
											&times;
										</span>
									</div>
								))}
							</div>
							<InputLabel
								title={`Tags ${tags.length} / 10`}
								id={'tags'}
								value={tag}
								onChange={handleKeyDown}
								placeholder={'"Space" to add a tag'}
							/>{' '}
						</div>
						<div className={Styles['post-creator__card-input']}>
							<ImageInputLabel
								id='image'
								onChange={uploadFile}
								multiple={true}
								ref={imageRef}
							/>
							{image.length > 0 ? (
								<Button
									text='Reset all images'
									type='reset'
									onClick={handleResetAllImages}
								/>
							) : (
								''
							)}
						</div>
						<div className={Styles['post-images']}>
							{Array.from(image).map((el, id) => (
								<div
									className={`${Styles['post-images__item']} ${
										id === removingImageIndex || el.isRemoving === true
											? Styles['post-images__item--removing']
											: ''
									}`}
									key={id}
								>
									<IoClose
										className={Styles['post-images__clear-ico']}
										onClick={() => {
											handleImageDelete(id)
										}}
									/>

									<img
										src={el.img}
										className={Styles['post-images__image']}
										key={id}
									/>
								</div>
							))}
						</div>
						<div className={Styles['post-creator__card-title']}>
							<InputLabel
								title={'Post Title'}
								id={'title'}
								value={title}
								onChange={e => {
									setTitle(e.target.value)
								}}
								maxLength={50}
							/>
						</div>
						<div className={Styles['post-creator__card-description']}>
							<TextareaLabel
								title={'Post Description'}
								id={'description'}
								maxLength={2000}
								value={description}
								setData={setDescription}
								onChange={e => setDescription(e.target.value)}
							/>
						</div>
					</div>
				</PostCard>
				<Button text={'Create Post'} type='submit' />
			</form>
		</div>
	)
}

export default PostCreator
