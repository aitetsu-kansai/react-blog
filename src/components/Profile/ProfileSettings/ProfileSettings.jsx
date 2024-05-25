import React from 'react'
import Styles from './ProfileSettings.module.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	changeProfileInfo,
	selectProfile,
} from '../../../redux/slices/profileSlice'

function ProfileSettings() {
	const dispatch = useDispatch()
	const user = useSelector(selectProfile)

	const textAreaMaxLength = 150

	const [areaCounter, setAreaCounter] = useState(0)

	const [userData, setUserData] = useState({
		name: user.name,
		birth: user.birth,
		nickname: user.nickname,
		email: user.email,
		description: user.description,
		bannerUrl: user.bannerUrl,
		avatarUrl: user.avatarUrl,
	})

	// const handleImageUpload = async (e, action) => {
	// 	const file = e.target.files[0]
	// 	if (file && file.type.startsWith('image/')) {
	// 		const formData = new FormData()
	// 		formData.append('file', file)

	// 		try {
	// 			const response = await fetch('/api/upload', {
	// 				method: 'POST',
	// 				body: formData,
	// 			})
	// 			if (response.ok) {
	// 				const data = await response.json()
	// 				dispatch(action(data.fileUrl))
	// 			} else {
	// 				alert('Something Went Wrong')
	// 			}
	// 		} catch (err) {
	// 			console.error('Error: ' + err)
	// 		}
	// 	} else {
	// 		alert('Please, choose the image')
	// 	}
	// }

	const handleSubmitForm = e => {
		e.preventDefault()
		dispatch(changeProfileInfo(userData))
	}

	return (
		<div className={Styles['settings-wrapper']}>
			<h2>ProfileSettings</h2>
			<form
				onSubmit={handleSubmitForm}
				method='post'
				encType='multipart/form-data'
				className={Styles.form}
			>
				<div className={Styles.settings}>
					<div className={Styles['form-label']}>
						<label htmlFor='name'> Name:{` `}</label>

						<input
							className={Styles.input}
							type='text'
							id='name'
							value={userData.name}
							required={true}
							onChange={e => {
								setUserData({ ...userData, name: e.target.value })
							}}
						/>
					</div>

					<div className={Styles['form-label']}>
						<label htmlFor='nickname'> Nickname: </label>
						<input
							className={Styles.input}
							type='text'
							id='nickname'
							required={true}
							value={userData.nickname}
							onChange={e => {
								setUserData({ ...userData, nickname: e.target.value })
							}}
						/>
					</div>

					<div className={Styles['form-label']}>
						<label htmlFor='birth'>Birth: </label>
						<input
							className={Styles.input}
							type='date'
							id='birth'
							value={userData.birth}
							required={true}
							max={150}
							onChange={e => {
								setUserData({ ...userData, birth: e.target.value })
							}}
						/>
					</div>

					<div className={Styles['form-label']}>
						<label htmlFor='email'> Email:{` `}</label>

						<input
							className={Styles.input}
							type='email'
							id='email'
							value={userData.email}
							required={true}
							onChange={e => {
								setUserData({ ...userData, email: e.target.value })
							}}
						/>
					</div>

					<div className={Styles['form-label']}>
						<label
							htmlFor='avatar'
							className={`${Styles['label-img']} ${
								userData.avatarUrl ? Styles['image-load'] : null
							}`}
						>
							Avatar:{' '}
						</label>
						<input
							type='file'
							id='avatar'
							className={Styles.input}
							size={5120}
							// onChange={e => handleImageUpload(e, setAvatarUrl, setProfileAvatar)}
						/>
					</div>
					<div className={Styles['form-label']}>
						<label
							htmlFor='banner'
							className={`${Styles['label-img']} ${Styles['image-load']}`}
						>
							Banner:{' '}
						</label>
						<input
							type='file'
							id='banner'
							title='none'
							className={Styles.input}
							size={5120}
							// onChange={loadBackgroundImage}
						/>
					</div>
					<div className={`${Styles['form-label']} ${Styles.description}`}>
						<label htmlFor='description'>Description: </label>
						<span>
							{areaCounter}/{textAreaMaxLength}
						</span>
						<textarea
							className={Styles.textarea}
							value={userData.description}
							id='description'
							maxLength={textAreaMaxLength}
							onChange={e => {
								setAreaCounter(e.target.value.length)
								setUserData({ ...userData, description: e.target.value })
							}}
						/>
					</div>
				</div>
				<button type='submit' className={Styles['button-submit']}>
					CLICK
				</button>
			</form>
			{/* {avatarUrl && <img src={avatarUrl} />} */}
		</div>
	)
}

export default ProfileSettings
