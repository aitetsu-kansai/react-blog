import { useEffect, useRef, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import './Post.css'

function Post({ img, title, description }) {
	const imageRefs = useRef(null)
	const [isPortrait, setIsPortrait] = useState(null)

	useEffect(() => {
		const images = imageRefs.current
		if (images) {
			images.onload = () => {
				if (images.naturalHeight > images.naturalWidth) {
					setIsPortrait(true)
				}
			}
		}
	}, [])

	return (
		<PostCard>
			<h6>TAGS</h6>
			<div className='post-image__wrapper'>
				{img.map((el, id) => (
					<div
						className={`post-image__container ${
							el.orientation === 'book' ? 'portrait' : ''
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
							<img src={el.img} ref={imageRefs} />
						</div>
					</div>
				))}
			</div>

			<h4>{title}</h4>
			<p>{description}</p>
		</PostCard>
	)
}

export default Post
