import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	surname: '',
	birth: '',
	gender: '',
	nickname: `User ${Math.floor(Math.random() * 5000)}`,
	email: '',
	description: '',
	bannerUrl: '../../../default-profile-banner.png',
	avatarUrl: '../../../default-profile-avatar.png',
	favouritePosts: [],
}

export const fetchProfileData = createAsyncThunk(
	'profile/fetchProfileData',
	async (url, thunkAPI) => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
			if (response.ok) {
				const data = await response.json()
				return data
			} else
				thunkAPI.dispatch(
					setInfo({
						infoCategory: 'error',
						infoMessage: 'Failed to fetch profile data',
					})
				)
		} catch (error) {
			thunkAPI.dispatch(
				setInfo({
					infoCategory: 'error',
					infoMessage: error,
				})
			)
			return thunkAPI.rejectWithValue({
				error: error.message,
				code: error.code,
			})
		}
	}
)

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
		setFavouritePost: (state, action) => {
			state.favouritePosts.push(action.payload)
		},
		deleteFavouritePost: (state, action) => {
			return {
				...state,
				favouritePosts: state.favouritePosts.filter(
					post => post.id !== action.payload
				),
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProfileData.fulfilled, (state, action) => {
			const updatedState = { ...state, ...action.payload }
			console.log(updatedState.favouritePosts)
			return updatedState
		})
		builder.addCase(fetchProfileData.rejected, (state, action) => {
			console.log(action.payload)
		})
	},
})

export const {
	changeProfileInfo,
	setProfileAvatar,
	setProfileBanner,
	setFavouritePost,
	deleteFavouritePost,
} = profileSlice.actions

export const selectProfile = state => state.profile

export default profileSlice.reducer
