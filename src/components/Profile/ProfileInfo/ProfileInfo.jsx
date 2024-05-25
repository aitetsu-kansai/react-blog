import { LuInfo } from 'react-icons/lu'
import { PiTextAlignLeftFill } from 'react-icons/pi'

import { useSelector } from 'react-redux'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Button from '../../Button/Button'
import Styles from './ProfileInfo.module.css'

function ProfileInfo() {
	const profile = useSelector(selectProfile)
	console.log('rerender')
	return (
		<div className={Styles['main-wrapper']}>
			<div className={Styles['header-wrapper']}>
				<div className={Styles.background}>
					<img src='../../../../public/background.jpg' alt='background' />
				</div>
				<div className={Styles.avatar}>
					<img src='../../../../public/avatar.png' alt='logo' />
				</div>
			</div>
			<div className={Styles['data-wrapper']}>
				<h1>{profile.nickname}</h1>
				{profile.description ? (
					<p className={Styles['profile-description']}>
						{' '}
						<PiTextAlignLeftFill /> {profile.description}
					</p>
				) : null}
				<div className={Styles['more-info-container']}>
					<a className={Styles['more-info']}>
						<LuInfo />
						More info
					</a>
					<Button text='Profile editor' />
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
