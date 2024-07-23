import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	birth: '',
	nickname: `User ${Math.floor(Math.random() * 5000)}`,
	email: '',
	description: '',
	bannerUrl: '../../../public/default-profile-banner.png',
	avatarUrl: '../../../public/default-profile-avatar.png',
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		changeProfileInfo: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
		setProfileAvatar: (state, action) => {
			return { ...state, avatarUrl: action.payload }
		},
		setProfileBanner: (state, action) => {
			return { ...state, bannerUrl: action.payload }
		},
	},
})

export const { changeProfileInfo, setProfileAvatar, setProfileBanner } =
	profileSlice.actions

export const selectProfile = state => state.profile

export default profileSlice.reducer
