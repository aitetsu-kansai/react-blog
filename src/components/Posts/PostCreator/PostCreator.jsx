import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addPost } from '../../../redux/slices/postsSlice.js'
import { uploadImage } from '../../../utils/uploadImage.js'
import InputLabel from '../../Label/InputLabel.jsx'
import TextareaLabel from '../../Label/TextareaLabel.jsx'
import PostCard from '../PostCard/PostCard.jsx'
import Styles from './PostCreator.module.css'

function PostCreator({ setActive }) {
	const imageRef = useRef(null)

	const [title, setTitle] = useState('')
	const [tags, setTags] = useState([])
	const [description, setDescription] = useState('')
	const [image, setImage] = useState([])
	const dispatch = useDispatch()

	const handleFormSubmit = e => {
		e.preventDefault()
		dispatch(addPost({ title, tags, description, image }))
		dispatch(
			setInfo({
				infoCategory: 'success',
				infoMessage: 'The post was successfully created',
			})
		)
		setActive(false)
		setTitle('')
		setTags([])
		setDescription('')
		setImage([])
	}

	const handleImageDelete = id => {
		setImage(images => images.filter((_, i) => i !== id))
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
						<div className={Styles['card-tag']}>
							<InputLabel
								title={'Tags'}
								id={'tags'}
								// onChange={e => {
								// 	setTags(tags.push(e.target.value))
								// }}
								// value={tags[0]}
							/>
						</div>
						<div className={Styles['card-img__input']}>
							<input
								type='file'
								id={'image'}
								onChange={() => {
									uploadImage(imageRef, image, setImage, ...[,], true)
									// if (imageRef.current) {
									// 	imageRef.current.value = ''
									// }
								}}
								multiple
								ref={imageRef}
								className={Styles['img__input']}
							/>
						</div>
						{Array.from(image).map((el, id) => (
							<img
								src={el.img}
								className={Styles['post__image']}
								key={id}
								onDoubleClick={() => handleImageDelete(id)}
							/>
						))}
						<div className={Styles['card-title']}>
							<InputLabel
								title={'Post Title'}
								id={'title'}
								value={title}
								onChange={e => {
									setTitle(e.target.value)
								}}
							/>
						</div>
						<div className={Styles['card-description']}>
							<TextareaLabel
								title={'Post Description'}
								id={'description'}
								maxLength={2000}
								value={description}
								setData={setDescription}
								// onChange={e => setDescription(e.target.value)}
							/>
						</div>
					</div>
				</PostCard>
				<button type='submit'>CLICK</button>
			</form>
		</div>
	)
}

export default PostCreator
