import Styles from './ProfileSettings.module.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../../redux/slices/infoSlice'
import {
	changeProfileInfo,
	fetchProfileData,
	selectProfile,
} from '../../../redux/slices/profileSlice'
import { deepEqual } from '../../../utils/deepEqual'
import Button from '../../Button/Button'
import InputLabel from '../../Label/InputLabel'
import TextareaLabel from '../../Label/TextareaLabel'

function ProfileSettings() {
	const dispatch = useDispatch()
	const user = useSelector(selectProfile)

	const [userData, setUserData] = useState({
		name: user.name,
		surname: user.surname,
		birth: user.birth,
		gender: user.gender,
		nickname: user.nickname,
		email: user.email,
		description: user.description,
		favouritePosts: user.favouritePosts
	})

	useEffect(() => {
		dispatch(fetchProfileData('http://localhost:3000/api/profile'))
	}, [])

	const handleSubmitForm = async e => {
		e.preventDefault()
		if (deepEqual(user, userData)) {
			dispatch(
				setInfo({
					infoCategory: 'info',
					infoMessage: `The user's previous settings are equal to the current ones`,
				})
			)
			return
		}

		try {
			const response = await fetch('http://localhost:3000/api/profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			})

			if (response.ok) {
				const savedProfileData = await response.json()
				dispatch(changeProfileInfo(savedProfileData))
				dispatch(
					setInfo({
						infoCategory: 'success',
						infoMessage: 'Profile info updated',
					})
				)
			}
		} catch (error) {
			dispatch(setInfo({ infoCategory: 'error', infoMesasge: error }))
		}
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
							required={true}
						/>
					</div>
					<div className={Styles['form-label']}>
						<InputLabel
							title='Surname'
							id='surname'
							type='text'
							value={userData.surname}
							onChange={e => {
								setUserData({ ...userData, surname: e.target.value })
							}}
							maxLength={20}
							required={true}
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
							required={true}
						/>
					</div>

					<div className={Styles['form-label']}>
						<InputLabel
							title='Birth'
							id='birth'
							type='date'
							value={userData.birth}
							onChange={e => {
								console.log(e.target.value)
								setUserData({ ...userData, birth: e.target.value })
							}}
						/>
					</div>
					<div className={Styles['form-label']}>
						<div className={Styles['gender-label']}>
							<label htmlFor='gender'>Gender:</label>
							<select
								id='gender'
								value={userData.gender}
								onChange={e => {
									setUserData({ ...userData, gender: e.target.value })
								}}
							>
								<option value=''>Select your gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</select>
						</div>
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
							setData={newDescription => {
								setUserData({ ...userData, description: newDescription })
							}}
						/>
					</div>
				</div>

				<Button type='submit' text='Save' />
			</form>
		</>
	)
}

export default ProfileSettings
