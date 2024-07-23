import { useEffect, useRef } from 'react'
import PostCard from '../PostCard/PostCard'
import Styles from "./Post.module.css"

function Post({ img, title, description }) {
	const imageRef = useRef(null)

	useEffect(() => {
		const img = imageRef.current
		if (img) {
			img.onload = () => {
				if (img.naturalHeight > img.naturalWidth) {
					console.log(img)
					// Проверка портретной ориентации
					img.classList.add(Styles['portrait']) // Добавление класса
				}
			}
		}
	}, [])
	return (
		<PostCard>
			<h6>TAGS</h6>
			<img src={img} alt='' ref={imageRef} />
			<h4>{title}</h4>
			<p>{description}</p>
		</PostCard>
	)
}

export default Post
