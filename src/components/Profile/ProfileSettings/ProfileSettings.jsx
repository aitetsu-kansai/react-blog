import Styles from './ProfileSettings.module.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	changeProfileInfo,
	selectProfile,
} from '../../../redux/slices/profileSlice'
import InputLabel from '../../Label/InputLabel'
import TextareaLabel from '../../Label/TextareaLabel'

function ProfileSettings() {
	const dispatch = useDispatch()
	const user = useSelector(selectProfile)

	const [userData, setUserData] = useState({
		name: user.name,
		birth: user.birth,
		nickname: user.nickname,
		email: user.email,
		description: user.description,
		bannerUrl: user.bannerUrl,
		avatarUrl: user.avatarUrl,
	})

	const handleSubmitForm = e => {
		e.preventDefault()
		dispatch(changeProfileInfo(userData))
	}

	return (
		<>
			<h2>ProfileSettings</h2>
			<form
				onSubmit={handleSubmitForm}
				method='post'
				encType='multipart/form-data'
				className={Styles.form}
			>
				<div className={Styles.settings}>
					<div className={Styles['form-label']}>
						<InputLabel
							title='Name'
							id='name'
							type='text'
							value={userData.name}
							onChange={e => {
								setUserData({ ...userData, name: e.target.value })
							}}
							maxLength={20}
						/>
					</div>

					<div className={Styles['form-label']}>
						<InputLabel
							title='Nickname'
							id='nickname'
							type='text'
							value={userData.nickname}
							onChange={e => {
								setUserData({ ...userData, nickname: e.target.value })
							}}
							maxLength={20}
						/>
					</div>

					<div className={Styles['form-label']}>
						<InputLabel
							title='Birth'
							id='birth'
							type='date'
							value={userData.birth}
							onChange={e => {
								setUserData({ ...userData, birth: e.target.value })
							}}
						/>
					</div>

					<div className={Styles['form-label']}>
						<InputLabel
							title='Email'
							id='email'
							type='email'
							value={userData.email}
							onChange={e => {
								setUserData({ ...userData, email: e.target.value })
							}}
						/>
					</div>

					<div className={`${Styles['form-label']} ${Styles.description}`}>
						<TextareaLabel
							title='Description'
							id='description'
							setUserData={newDescription => {
								setUserData({ ...userData, description: newDescription })
							}}
						/>
					</div>
				</div>
				<button type='submit' className={Styles['button-submit']}>
					Save
				</button>
			</form>
		</>
	)
}

export default ProfileSettings
