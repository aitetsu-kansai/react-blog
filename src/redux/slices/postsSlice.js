import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	posts: [],
	isShowFavouritePosts: false,
}

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
			state.posts.push(action.payload)
		},
		deletePost: (state, action) => {
			return state.posts.filter(post => post !== action.payload)
		},
		clearAllPosts: () => {
			return initialState.posts
		},
		showFavPosts: state => {
			return { ...state, isShowFavouritePosts: true }
		},
		showAllPosts: state => {
			return { ...state, isShowFavouritePosts: false }
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			console.log(action.payload)
			return { ...initialState, posts: [...action.payload] }
		})
	},
})

export const {
	addPost,
	deletePost,
	clearAllPosts,
	showFavPosts,
	showAllPosts,
} = postsSlice.actions

export const selectPosts = state => state.posts.posts
export const selectIsShowFavPosts = state => state.posts.isShowFavouritePosts

export default postsSlice.reducer
