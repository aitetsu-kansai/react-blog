import { useState } from 'react'
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../../redux/slices/profileSlice'
import './PostCard.css'

function PostCard({ children, postDate }) {
	const profile = useSelector(selectProfile)
	const [isFavourite, setIsFavourite] = useState(false)

	const handleFavourite = () => {
		setIsFavourite(!isFavourite)
	}

	return (
		<div className='post-wrapper'>
			<div className='post-container'>
				<div className='post-author__info'>
					<img src={profile.avatarUrl} alt='profile avatar' />
					<div className='post-author-date__container'>
						<p>
							{profile.name && profile.surname
								? `${profile.name} ${profile.surname}`
								: profile.nickname}
						</p>
						<p>Created: {postDate}</p>
					</div>
					<span onClick={handleFavourite} style={{ marginLeft: 'auto' }}>
						{isFavourite ? (
							<CiBookmarkCheck className={`${'favourite-ico'} ${'active'}`} />
						) : (
							<CiBookmark className={'favourite-ico'} />
						)}
					</span>
				</div>
				<div className='post-data'>{children}</div>
			</div>
		</div>
	)
}

export default PostCard
