import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectIsShowFavPosts,
	selectPosts,
} from '../../../redux/slices/postsSlice'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Post from '../Post/Post'
import Styles from './PostList.module.css'

function PostsList() {
	const posts = useSelector(selectPosts)
	const showFavouritePosts = useSelector(selectIsShowFavPosts)
	const favouritePosts = useSelector(selectProfile).favouritePosts
	const [loadedPosts, setLoadedPosts] = useState([])
	const dispatch = useDispatch()

	const renderPosts = posts => {
		return posts.length > 0
			? posts.map(el => (
					<Post
						img={el.images}
						title={el.title}
						description={el.description}
						date={el.date}
						tags={el.tags}
						id={el.id}
						key={el.id}
					/>
			  ))
			: null
	}

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
				{showFavouritePosts ? (
					favouritePosts.length > 0 ? (
						renderPosts(favouritePosts)
					) : (
						<h2>No favourite posts</h2>
					)
				) : posts.length > 0 ? (
					renderPosts(posts)
				) : (
					<h2>No posts</h2>
				)}
			</div>
		</div>
	)
}

export default PostsList
