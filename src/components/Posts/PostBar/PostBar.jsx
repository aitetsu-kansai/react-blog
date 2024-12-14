import { useState } from 'react'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { GrPowerReset } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { showAllPosts, showFavPosts } from '../../../redux/slices/postsSlice'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Button from '../../Button/Button'
import Dropdown from '../../Drowdown/Dropdown'
import Modal from '../../Modal/Modal'
import PostCreator from '../PostCreator/PostCreator'
import Styles from './PostBar.module.css'

function PostBar() {
	const profile = useSelector(selectProfile)
	const dispatch = useDispatch()

	const [showAll, setShowAll] = useState(true)

	const [showOnlyFavourite, setShowOnlyFavourite] = useState(false)

	const [creatorActive, setCreatorActive] = useState(false)

	const handleClickAll = e => {
		e.preventDefault()
		setShowAll(true)
		setShowOnlyFavourite(false)
		dispatch(showAllPosts())
	}

	const handleClickFavourite = e => {
		e.preventDefault()

		setShowAll(false)
		setShowOnlyFavourite(true)
		dispatch(showFavPosts())
	}

	return (
		<div className={Styles['postbar-container']}>
			<div className={Styles['postbar-title__container']}>
				<h3
					className={`${Styles['postbar-title']} ${
						showAll ? Styles['active'] : ''
					}`}
					onClick={handleClickAll}
				>
					All posts
				</h3>
				<h3
					className={`${Styles['postbar-title']} ${
						showOnlyFavourite ? Styles['active'] : ''
					}`}
					onClick={handleClickFavourite}
				>
					Favourite posts
				</h3>
			</div>
			<div className={Styles['postbar-icons__container']}>
				<GrPowerReset
					className={Styles['postbar-ico']}
					title='Clear all posts'
				/>
				<div className=''>
					<span>Are you sure that you want to clear all posts?</span>
					<Dropdown type='onClick'>
						<form>
							<label htmlFor=''>
								<Button>No</Button>
								<Button>Yes</Button>
							</label>
						</form>
					</Dropdown>
				</div>
				<FaCircleArrowUp
					className={Styles['postbar-ico']}
					title='Add new post'
					onClick={() => {
						setCreatorActive(true)
						//!!! important
						// profile.name && profile.email
						// 	? setCreatorActive(true)
						// 	: dispatch(
						// 			setInfo({
						// 				infoCategory: 'warning',
						// 				infoMessage: 'You must fill the full information about you',
						// 			})
						// 	  )
					}}
				/>

				<Modal active={creatorActive} setActive={setCreatorActive}>
					<PostCreator setActive={setCreatorActive} />
				</Modal>
			</div>
		</div>
	)
}

export default PostBar
