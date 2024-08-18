import { useRef, useState } from 'react'
import Modal from '../../Modal/Modal'
import PostCard from '../PostCard/PostCard'
import './Post.css'

function Post({ img, title, description }) {
	const imageRefs = useRef(null)
	const [fullImgActive, setFullImgActive] = useState(false)
	const [activeImg, setActiveImg] = useState({ imageUrl: '', orientation: '' })

	return (
		<PostCard>
			<h6>TAGS</h6>
			<div className='post-image__wrapper'>
				{img.map((el, id) => (
					<div
						className={`post-image__container ${
							el.orientation === 'book' ? 'book' : 'portrait'
						}`}
						key={id}
					>
						{el.orientation === 'book' && (
							<div
								className='post-image__background'
								style={{ backgroundImage: `url(${el.img})` }}
								key={id}
							></div>
						)}
						<div className='post-image__main-image'>
							<img
								src={el.img}
								ref={imageRefs}
								onClick={() => {
									setFullImgActive(true)
									setActiveImg({
										imageUrl: el.img,
										orientation: el.orientation,
									})
								}}
							/>
						</div>
					</div>
				))}
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
