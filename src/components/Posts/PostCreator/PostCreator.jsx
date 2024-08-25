import { useRef, useState } from 'react'

import { FaCloudArrowDown } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addPost } from '../../../redux/slices/postsSlice.js'
import { uploadImage } from '../../../utils/uploadImage.js'
import Button from '../../Button/Button.jsx'
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
	const [removingImageIndex, setRemovingImageIndex] = useState(null)
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
							<InputLabel
								title={'Tags'}
								id={'tags'}
								// onChange={e => {
								// 	setTags(tags.push(e.target.value))
								// }}
								// value={tags[0]}
							/>
						</div>
						<div className={Styles['post-creator__card-input']}>
							<label className={Styles['post-creator__label']} htmlFor='image'>
								{' '}
								{<FaCloudArrowDown />} Click to Upload
							</label>
							<input
								type='file'
								id={'image'}
								onChange={() => {
									uploadImage(imageRef, image, setImage, ...[,], true)
								}}
								multiple
								ref={imageRef}
								className={Styles['post-creator__input']}
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
										onClick={() => handleImageDelete(id)}
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
