import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	deleteFavouritePost,
	selectProfile,
	setFavouritePost,
} from '../../../redux/slices/profileSlice'

import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md'
import { selectPosts } from '../../../redux/slices/postsSlice'
import Dropdown from '../../Drowdown/Dropdown'
import './PostCard.css'

const PostCard = React.memo(function PostCard({ children, postDate, postId }) {
	const posts = useSelector(selectPosts)

	const dispatch = useDispatch()
	const profile = useSelector(selectProfile)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const [dropDownChanging, setDropdownChanging] = useState(false)
	const postIsFavourite = profile?.favouritePosts.some(
		favPost => favPost?.id === postId
	)
	const [postIsFav, setPostIsFav] = useState(postIsFavourite)

	const handleAddFavPost = async e => {
		e.preventDefault()
		try {
			const response = await fetch(
				'http://localhost:3000/api/favourite-posts',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: postId,
						type: postIsFav ? 'remove' : 'add',
					}),
				}
			)

			const favPost = await response.json()
			setPostIsFav(postIsFav ? false : true)
			console.log(postIsFav)
			postIsFav
				? dispatch(deleteFavouritePost(postId))
				: dispatch(setFavouritePost(favPost))
		} catch (error) {
			console.log(error)
		}
	}

	const handleMouseOver = () => {
		setDropdownIsOpen(true)
		setTimeout(() => {
			setDropdownChanging(true)
		}, 200)
	}

	const handleMouseLeave = () => {
		setDropdownChanging(false)
		setTimeout(() => {
			setDropdownIsOpen(false)
		}, 110)
	}

	return (
		<div className='post-wrapper'>
			<div className='post-container'>
				<div className='post-author__info'>
					<div className='post-author-date__container'>
						<img src={profile.avatarUrl} alt='profile avatar' />
						<div>
							<p>
								{profile.name && profile.surname
									? `${profile.name} ${profile.surname}`
									: profile.nickname}
							</p>
							<p className='post-date'>Created: {postDate}</p>
						</div>
					</div>

					<Dropdown>
						<li
							className='post-editing-list__list-item'
							onClick={handleAddFavPost}
						>
							{postIsFav ? (
								<div className='post-editing-list__favourite-item'>
									<MdBookmarkAdded className='favourite-item__added' />
									Remove from favourite
								</div>
							) : (
								<div className='post-editing-list__favourite-item'>
									<MdBookmarkAdd className='favourite-item__add' />
									Add to favourite
								</div>
							)}
						</li>
					</Dropdown>
				</div>
				<div className='post-data'>{children}</div>
			</div>
		</div>
	)
})

export default PostCard
