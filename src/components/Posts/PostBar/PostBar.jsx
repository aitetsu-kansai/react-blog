import { useState } from 'react'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { GrPowerReset } from 'react-icons/gr'
import Modal from '../../Modal/Modal'
import PostCreator from '../PostCreator/PostCreator'
import Styles from './PostBar.module.css'

function PostBar() {
	const [showAll, setShowAll] = useState(true)
	const [showOnlyFavourite, setShowOnlyFavourite] = useState(false)

	const [creatorActive, setCreatorActive] = useState(false)

	const handleClickAll = () => {
		setShowAll(true)
		setShowOnlyFavourite(false)
	}

	const handleClickFavourite = () => {
		setShowAll(false)
		setShowOnlyFavourite(true)
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
				<FaCircleArrowUp
					className={Styles['postbar-ico']}
					title='Add new post'
					onClick={() => setCreatorActive(true)}
				/>

				<Modal active={creatorActive} setActive={setCreatorActive}>
					<PostCreator />
				</Modal>
			</div>
		</div>
	)
}

export default PostBar