import { useRef, useState } from 'react'

import Carousel from '../../Carousel/Carousel.jsx'

import Modal from '../../Modal/Modal'
import PostCard from '../PostCard/PostCard'
import './Post.css'

function Post({ img, title, description, date, tags, id }) {
	const imageRefs = useRef(null)
	const [fullImgActive, setFullImgActive] = useState(false)
	const [activeImg, setActiveImg] = useState({ imageUrl: '', orientation: '' })
	const postImages = img.map((el, id) => (
		<div
			className={`post-image__container ${
				el.orientation === 'book' ? 'book' : 'portrait'
			} `}
			key={id}
			onClick={() => {
				setFullImgActive(true)
				setActiveImg({
					imageUrl: el.img,
					orientation: el.orientation,
				})
			}}
		>
			<div
				className='post-image__background'
				style={{ backgroundImage: `url(${el.img})` }}
				key={id}
			></div>
			<div className='post-image__main-image'>
				<img src={el.img} ref={imageRefs} />
			</div>
		</div>
	))

	return (
		<PostCard postDate={date} postId={id}>
			<h6>
				<div className='tags-input-container'>
					{tags.map((el, id) => (
						<div className='tag-item' key={id}>
							<span className='text'>{el}</span>
						</div>
					))}
				</div>
			</h6>
			<div className='post-image__wrapper'>
				{postImages.length > 1 ? (
					<Carousel images={postImages} />
				) : (
					postImages[0]
				)}
			</div>
			<Modal active={fullImgActive} setActive={setFullImgActive} isImage={true}>
				<div
					className='modal__image-container'
					/* the class is relative to the orientation of the>>> className={`modal__image-container ${
						activeImg.orientation === 'book' ? 'book' : 'portrait'
					}`} */
				>
					<img src={activeImg.imageUrl} />
				</div>
			</Modal>
			<h4>{title}</h4>
			<p>{description}</p>
		</PostCard>
	)
}

export default Post
