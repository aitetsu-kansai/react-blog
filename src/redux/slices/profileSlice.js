import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	birth: '',
	nickname: `User ${Math.floor(Math.random() * 5000)}`,
	email: '',
	description: '',
	bannerUrl: null,
	avatarUrl: null,
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
			return { ...state, avatar: action.payload }
		},
		setProfileBanner: (state, action) => {
			return { ...state, banner: action.payload }
		},
	},
})

export const { changeProfileInfo, setProfileAvatar, setProfileBanner } =
	profileSlice.actions

export const selectProfile = state => state.profile

export default profileSlice.reducer
