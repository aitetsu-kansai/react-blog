import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './slices/infoSlice'
import profileReducer from './slices/profileSlice'
import postsReducer from "./slices/postsSlice"

const store = configureStore({
	reducer: {
		profile: profileReducer,
		info: infoReducer,
		posts: postsReducer
	},
})

export default store
