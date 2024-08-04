import { LuInfo } from 'react-icons/lu'
import { PiTextAlignLeftFill } from 'react-icons/pi'

import { useRef, useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md'
import { TbPhoto } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice'
import {
	selectProfile,
	setProfileAvatar,
	setProfileBanner,
} from '../../../redux/slices/profileSlice'
import { uploadImage } from '../../../utils/uploadImage'
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
	const bannerRef = useRef(null)
	const avatarRef = useRef(null)

	return (
		<div className={Styles['main-wrapper']}>
			<div className={Styles['header-wrapper']}>
				<div className={Styles['background-wrapper']}>
					<div className={Styles.background}>
						<img src={profile.bannerUrl} alt='background' id='profile-pic' />

						<div className={Styles['change-background-overlay']}>
							<label htmlFor='input-background'>
								<TbPhoto
									className={Styles['change-background-ico']}
									title='Change background'
								/>
							</label>
							<input
								type='file'
								accept='image/jpeg, image/png, image/jpg'
								id='input-background'
								onChange={() => {
									uploadImage(bannerRef, ...[,], setProfileBanner, dispatch)
								}}
								ref={bannerRef}
							/>
						</div>
					</div>
				</div>
				<div className={Styles['avatar-wrapper']}>
					<div className={Styles.avatar}>
						<img src={profile.avatarUrl} alt='logo' />
						<div className={Styles['change-avatar-overlay']}>
							<label htmlFor='input-avatar'>
								<MdPhotoCamera
									className={Styles['change-avatar-ico']}
									title='Change avatar'
								/>
							</label>
							<input
								type='file'
								accept='image/jpeg, image/png, image/jpg'
								id='input-avatar'
								onChange={() => {
									uploadImage(avatarRef, ...[,], setProfileAvatar, dispatch)
								}}
								ref={avatarRef}
							/>
						</div>
					</div>
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
							if (profile.name && profile.nickname) {
								setUserInfoActive(true)
							} else {
								dispatch(
									setInfo({
										infoCategory: 'warning',
										infoMessage: 'You must fill the full information about you',
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
