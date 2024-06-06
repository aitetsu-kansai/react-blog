import { useSelector } from 'react-redux'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Styles from './ProfileAdditionalInfo.module.css'
import { calculateAge } from '../../../utils/calculateAge'

function ProfileAdditionalInfo() {
	const profile = useSelector(selectProfile)
	return (
		<div className={Styles['profile-additional-info']}>
			<p>Name: {profile.name}</p>
			<p>Nickname: {profile.nickname}</p>
			<p>Age: {calculateAge(profile.birth)}</p>
			<p>Birth: {profile.birth}</p>
			<p>Email: {profile.email}</p>
			<p>Posts quantity: {}</p>
		</div>
	)
}

export default ProfileAdditionalInfo
