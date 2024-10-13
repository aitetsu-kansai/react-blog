import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice'
import { selectPosts } from '../../../redux/slices/postsSlice'
import Post from '../Post/Post'
import Styles from './PostList.module.css'

function PostsList() {
	const posts = useSelector(selectPosts)
	const [loadedPosts, setLoadedPosts] = useState([])
	const dispatch = useDispatch()

	// const getPosts = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/api/post', {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		})

	// 		if (response.ok) {
	// 			const data = await response.json()
	// 			setLoadedPosts(data)
	// 		} else {
	// 			dispatch(
	// 				setInfo({
	// 					infoCategory: 'error',
	// 					infoMessage: 'Failed to fetch profile posts',
	// 				})
	// 			)
	// 		}
	// 	} catch (error) {
	// 		dispatch(
	// 			setInfo({
	// 				infoCategory: 'error',
	// 				infoMessage: error,
	// 			})
	// 		)
	// 	}
	// }

	// useEffect(() => {
	// 	fetch('http://localhost:3000/api/post', {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then(response => response.json())
	// 		.then(data => setLoadedPosts(data))
	// 		.catch(error =>
	// 			dispatch(
	// 				setInfo({
	// 					infoCategory: 'error',
	// 					infoMessage: error,
	// 				})
	// 			)
	// 		)
	// }, [])

	return (
		<div className={Styles['posts-list__wrapper']}>
			<div className={Styles['posts-list__container']}>
				{posts.length === 0 && <h2>No posts</h2>}

				{posts.map(el => {
					return (
						<Post
							img={el.image}
							title={el.title}
							description={el.description}
							date={el.date}
							tags={el.tags}
							id={el.id}
							key={el.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default PostsList
