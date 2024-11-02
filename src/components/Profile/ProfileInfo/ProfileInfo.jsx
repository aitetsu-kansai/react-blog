import { LuInfo, LuTrash } from 'react-icons/lu'
import { PiTextAlignLeftFill } from 'react-icons/pi'
import '../../Drowdown/Dropdown.css'
import '../../Posts/PostCard/PostCard.css'

import React, { useRef, useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md'
import { TbPhoto } from 'react-icons/tb'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice'
import {
	selectProfile,
	setProfileAvatar,
	setProfileBanner,
} from '../../../redux/slices/profileSlice'
import Button from '../../Button/Button'
import Dropdown from '../../Drowdown/Dropdown'
import Modal from '../../Modal/Modal'
import ProfileAdditionalInfo from '../ProfileAdditionalInfo/ProfileAdditionalInfo'
import ProfileSettings from '../ProfileSettings/ProfileSettings'
import Styles from './ProfileInfo.module.css'

const ProfileInfo = () => {
	const [settingsActive, setSettingsActive] = useState(false)
	const [userInfoActive, setUserInfoActive] = useState(false)
	const [avatarIsDefault, setAvatarIsDefault] = useState(true)
	const [bannerIsDefault, setBannerIsDefault] = useState(true)

	const [uploadedImage, setUploadedImage] = useState(null)
	const dispatch = useDispatch()
	const profile = useSelector(selectProfile, shallowEqual)
	const bannerRef = useRef(null)
	const avatarRef = useRef(null)

	const resetProfileImage = async type => {
		try {
			const response = await fetch(
				'http://localhost:3000/api/profileImageReset',
				{
					method: 'POST',
					body: JSON.stringify(type),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				const result = await response.json()
				console.log(result)

				type.imagePurpose === 'avatar'
					? dispatch(setProfileAvatar(result.imageUrl)) &&
					  setAvatarIsDefault(true)
					: dispatch(setProfileBanner(result.imageUrl)) &&
					  setBannerIsDefault(true)
			} else {
				setInfo({ infoCategory: 'error', infoMessage: 'ERROR' })
			}
		} catch (error) {}
	}

	const uploadFile = async (e, imagePurpose) => {
		// e.preventDefault()
		const data = new FormData()
		data.append('profileImage', e.target.files[0])
		data.append('imagePurpose', imagePurpose)
		try {
			const response = await fetch(
				'http://localhost:3000/api/profileImageUpload',
				{
					method: 'POST',
					body: data,
				}
			)
			const result = await response.json()
			if (response.ok) {
				imagePurpose === 'banner'
					? dispatch(setProfileBanner(result.filePath)) &&
					  setBannerIsDefault(false)
					: dispatch(setProfileAvatar(result.filePath)) &&
					  setAvatarIsDefault(false)
				setUploadedImage(result.filePath)
			} else {
				dispatch(
					setInfo({ infoCategory: 'error', infoMessage: result.message })
				)
			}
		} catch (error) {
			console.log('ERROR catch')
			dispatch(setInfo({ infoCategory: 'error', infoMessage: error.message }))
		}
	}

	return (
		<div className={Styles['main-wrapper']}>
			<div className={Styles['header-wrapper']}>
				<div className={Styles['background-wrapper']}>
					<div className={Styles.background}>
						<img src={profile.bannerUrl} alt='background' id='profile-pic' />

						<div className={Styles['change-background-overlay']}>
							<Dropdown>
								<li
									className={`${Styles['banner-menu-item']} post-editing-list__list-item`}
								>
									<label htmlFor='input-background'>
										<TbPhoto
											className={Styles['change-background-ico']}
											title='Change background'
										/>
										Change the banner
									</label>
								</li>

								{!bannerIsDefault && (
									<li
										className={`${Styles['banner-menu-item']} post-editing-list__list-item`}
										onClick={() =>
											resetProfileImage({ imagePurpose: 'banner' })
										}
									>
										<LuTrash
											className={Styles['change-background-ico']}
											title='Change background'
										/>
										Remove the banner
									</li>
								)}
							</Dropdown>

							<form
								action='/api/banner'
								method='POST'
								encType='multipart/form-data'
							>
								<input
									type='file'
									accept='image/jpeg, image/png, image/jpg'
									id='input-background'
									// onChange={handleBannerChange}
									onChange={e => uploadFile(e, 'banner')}
									name='banner'
									ref={bannerRef}
								/>
							</form>
						</div>
					</div>
				</div>
				<div className={Styles['avatar-wrapper']}>
					<div className={Styles.avatar}>
						<img src={profile.avatarUrl} alt='logo' />

						<div
							className={`${Styles['change-avatar-overlay']} ${
								!avatarIsDefault && Styles['grid']
							}`}
						>
							<label htmlFor='input-avatar'>
								<MdPhotoCamera
									className={Styles['change-avatar-ico']}
									title='Change avatar'
								/>
								<form
									action='/api/banner'
									method='POST'
									encType='multipart/form-data'
								>
									<input
										type='file'
										accept='image/jpeg, image/png, image/jpg'
										id='input-avatar'
										// onChange={handleBannerChange}
										onChange={e => uploadFile(e, 'avatar')}
										name='banner'
										ref={avatarRef}
									/>
								</form>
							</label>
							<label>
								{!avatarIsDefault && (
									<LuTrash
										// className={Styles['change-background-ico']}
										className={Styles['change-avatar-ico']}
										title='Remove the avatar'
										onClick={() =>
											resetProfileImage({ imagePurpose: 'avatar' })
										}
									/>
								)}
							</label>
							{/* <input
								type='file'
								accept='image/jpeg, image/png, image/jpg'
								id='input-avatar'
								onChange={handleAvatarChange}
								ref={avatarRef}
							/> */}
						</div>
					</div>
				</div>
			</div>
			<div className={Styles['data-wrapper']}>
				<div className={Styles['profile-name']}>
					<h1>
						{profile.name} {profile.surname}
					</h1>
					<h4>
						aka <span>{profile.nickname}</span>
					</h4>
				</div>
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
