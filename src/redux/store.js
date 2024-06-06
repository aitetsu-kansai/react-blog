import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './slices/infoSlice'
import profileReducer from './slices/profileSlice'

const store = configureStore({
	reducer: {
		profile: profileReducer,
		info: infoReducer,
	},
})

export default store
