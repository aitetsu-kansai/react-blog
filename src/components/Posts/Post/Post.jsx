import { useEffect, useRef, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import './Post.css'

function Post({ img, title, description }) {
	const imageRef = useRef(null)
	const [isPortrait, setIsPortrait] = useState(null)

	useEffect(() => {
		const img = imageRef.current
		if (img) {
			img.onload = () => {
				if (img.naturalHeight > img.naturalWidth) {
					setIsPortrait(true)
				}
			}
		}
	}, [])
	return (
		<PostCard>
			<h6>TAGS</h6>
			<div className={`post-image__container ${isPortrait ? 'portrait' : ''}`}>
				{isPortrait && (
					<div
						className='post-image__background'
						style={{ backgroundImage: `url(${img})` }}
					></div>
				)}
				<img src={img} alt='' ref={imageRef} />
			</div>
			<h4>{title}</h4>
			<p>{description}</p>
		</PostCard>
	)
}

export default Post
