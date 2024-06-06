import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	infoCategory: null,
	infoMessage: null,
}

const infoSlice = createSlice({
	name: 'info',
	initialState,
	reducers: {
		setInfo: (state, action) => {
			state.infoCategory = action.payload.infoCategory || 'info'
			state.infoMessage = action.payload.infoMessage
		},
		clearInfo: () => {
			return initialState
		},
	},
})

export const { setInfo, clearInfo } = infoSlice.actions

export const selectInfo = state => state.info

export default infoSlice.reducer
