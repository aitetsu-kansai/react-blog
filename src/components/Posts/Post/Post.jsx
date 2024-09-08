import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

import { useRef, useState } from 'react'
import { GoDot, GoDotFill } from 'react-icons/go'

import Modal from '../../Modal/Modal'
import PostCard from '../PostCard/PostCard'
import './Post.css'

function Post({ img, title, description, date, tags }) {
	const imageRefs = useRef(null)
	const [fullImgActive, setFullImgActive] = useState(false)
	const [activeImg, setActiveImg] = useState({ imageUrl: '', orientation: '' })
	const [visibleImage, setVisibleImage] = useState(0)
	const [imageIsChanging, setImageIsChanging] = useState(false)
	const postImages = img.map((el, id) => (
		<div
			className={`post-image__container ${
				el.orientation === 'book' ? 'book' : 'portrait'
			} ${imageIsChanging ? 'post-image__container--change' : ''}`}
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
		<PostCard postDate={date}>
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
				{postImages[visibleImage]}
				{postImages.length > 1 && (
					<>
						<MdNavigateBefore
							className='post-image__carousel-element'
							onClick={e => {
								e.stopPropagation()
								setImageIsChanging(true)
								setTimeout(() => {
									setVisibleImage(
										visibleImage - 1 < 0
											? postImages.length - 1
											: visibleImage - 1
									)
									setImageIsChanging(false)
								}, 110)
							}}
						/>
						<MdNavigateNext
							className='post-image__carousel-element'
							onClick={e => {
								e.stopPropagation()
								setImageIsChanging(true)
								setTimeout(() => {
									setVisibleImage(
										visibleImage + 1 > postImages.length - 1
											? 0
											: visibleImage + 1
									)
									setImageIsChanging(false)
								}, 110)
							}}
						/>
						<div className='carousel-indicators__wrapper'>
							<div className='carousel-indicators__container'>
								{postImages.map((el, id) =>
									id === visibleImage ? (
										<GoDotFill
											className={`carousel-indicator carousel-indicator-active ${
												imageIsChanging ? 'carousel-indicator--change' : ''
											}`}
											key={id}
										/>
									) : (
										<GoDot
											className={`carousel-indicator' ${
												imageIsChanging ? 'carousel-indicator--change' : ''
											}`}
											key={id}
										/>
									)
								)}
							</div>
						</div>
					</>
				)}
				{/* {img.map((el, id) => (
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
				))} */}
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
