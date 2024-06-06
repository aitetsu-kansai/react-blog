import { LuInfo } from 'react-icons/lu'
import { PiTextAlignLeftFill } from 'react-icons/pi'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice'
import { selectProfile } from '../../../redux/slices/profileSlice'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'
import ProfileAdditionalInfo from '../ProfileAdditionalInfo/ProfileAdditionalInfo'
import ProfileSettings from '../ProfileSettings/ProfileSettings'
import Styles from './ProfileInfo.module.css'

function ProfileInfo() {
	const [settingsActive, setSettingsActive] = useState(false)
	const [userInfoActive, setUserInfoActive] = useState(false)
	const dispatch = useDispatch()
	const profile = useSelector(selectProfile)

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
					<a
						className={Styles['more-info']}
						onClick={() => {
							if (profile.name && profile.nickname && profile.birth) {
								setUserInfoActive(true)
							} else {
								dispatch(
									setInfo({
										infoCategory: 'warning',
										infoMessage: 'You must fill the information about you',
									})
								)
							}
						}}
					>
						<LuInfo />
						More info
					</a>
					<Modal active={userInfoActive} setActive={setUserInfoActive}>
						<ProfileAdditionalInfo />
					</Modal>
					<Button
						text='Profile editor'
						onClick={() => {
							setSettingsActive(!settingsActive)
						}}
					/>
				</div>
			</div>
			<Modal active={settingsActive} setActive={setSettingsActive}>
				<ProfileSettings />
			</Modal>
		</div>
	)
}

export default ProfileInfo
