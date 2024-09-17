import { useSelector } from 'react-redux'
import { selectPosts } from '../../../redux/slices/postsSlice'
import { selectProfile } from '../../../redux/slices/profileSlice'
import { calculateAge } from '../../../utils/calculateAge'
import Styles from './ProfileAdditionalInfo.module.css'

function ProfileAdditionalInfo() {
	const profile = useSelector(selectProfile)
	const posts = useSelector(selectPosts)
	return (
		<>
			<h2
				className={Styles['additional-info__header']}
			>{`${profile.name}'s info`}</h2>
			<div className={Styles['profile-info-wrapper']}>
				<div className={Styles['profile-avatar-wrapper']}>
					<div className={Styles['profile-avatar']}>
						<img src={profile.avatarUrl} alt='background' />
					</div>
					<h3>
						{profile.name} {profile.surname}
					</h3>
				</div>
				<div className={Styles['profile-additional-info']}>
					<p>
						<span className={Styles['profile-data-name']}>Nickname: </span>
						{profile.nickname}
					</p>
					{profile.birth && (
						<p>
							<span className={Styles['profile-data-name']}>Age: </span>
							{calculateAge(profile.birth)}
						</p>
					)}
					{profile.birth && (
						<p>
							<span className={Styles['profile-data-name']}>Birth: </span>
							{profile.birth}
						</p>
					)}
					{profile.gender && (
						<p>
							<span className={Styles['profile-data-name']}>Gender: </span>
							{profile.gender}
						</p>
					)}
					{profile.email && (
						<p>
							<span className={Styles['profile-data-name']}>Email: </span>
							{profile.email}
						</p>
					)}
					<p>
						<span className={Styles['profile-data-name']}>
							Posts quantity:{' '}
						</span>
						{posts.length}
					</p>
				</div>
			</div>
		</>
	)
}

export default ProfileAdditionalInfo
