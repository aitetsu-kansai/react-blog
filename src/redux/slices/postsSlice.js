import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = []

export const fetchPosts = createAsyncThunk(
	'posts/fetchPost',
	async (url, thunkAPI) => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})

			if (response.ok) {
				const data = await response.json()
				return data
			} else {
				thunkAPI.dispatch(
					setInfo({
						infoCategory: 'error',
						infoMessage: 'Failed to fetch profile posts',
					})
				)
			}
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

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, action) => {
			state.push(action.payload)
		},
		deletePost: (state, action) => {
			return state.filter(post => post !== action.payload)
		},
		clearAllPosts: () => {
			return initialState
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			console.log(action.payload)
			return [...action.payload]
		})
	
	},
})

export const { addPost, deletePost, clearAllPosts } = postsSlice.actions

export const selectPosts = state => state.posts

export default postsSlice.reducer
