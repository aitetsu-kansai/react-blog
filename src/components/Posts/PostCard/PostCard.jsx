import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Styles from './PostCard.module.css'

function PostCard({ children }) {
	const profile = useSelector(selectProfile)

	const [isFavourite, setIsFavourite] = useState(false)

	const handleFavourite = () => {
		setIsFavourite(!isFavourite)
	}

	return (
		<div className={Styles['post-wrapper']}>
			<div className={Styles['post-container']}>
				<div className={Styles['post-author__info']}>
					<img src={profile.avatarUrl} alt='profile avatar' />
					<div className={Styles['post-author-date__container']}>
						<p>{profile.name ? profile.name : profile.nickname}</p>
						<p>Created: 12-06-2024</p>
					</div>
					<span onClick={handleFavourite} style={{ marginLeft: 'auto' }}>
						{isFavourite ? (
							<CiBookmarkCheck
								className={`${Styles['favourite-ico']} ${Styles['active']}`}
							/>
						) : (
							<CiBookmark className={Styles['favourite-ico']} />
						)}
					</span>
				</div>
				<div className={Styles['post-data']}>{children}</div>
			</div>
		</div>
	)
}

export default PostCard
