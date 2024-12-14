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
