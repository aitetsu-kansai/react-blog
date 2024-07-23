import { useSelector } from 'react-redux'
import { selectPosts } from '../../../redux/slices/postsSlice'
import Post from '../Post/Post'
import Styles from './PostList.module.css'

function PostsList() {
	const posts = useSelector(selectPosts)

	return (
		<div className={Styles['posts-list__wrapper']}>
			<div className={Styles['posts-list__container']}>
				{posts.length === 0 && <h2>No posts</h2>}
				{posts.map((el, id) => {
					return (
						<Post
							img={el.image}
							title={el.title}
							description={el.description}
							key={id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default PostsList
