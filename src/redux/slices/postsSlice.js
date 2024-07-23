import { createSlice } from '@reduxjs/toolkit'

const initialState = []

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
})

export const { addPost, deletePost, clearAllPosts } = postsSlice.actions

export const selectPosts = state => state.posts

export default postsSlice.reducer
