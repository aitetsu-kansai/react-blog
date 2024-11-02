import React from 'react'
import './App.css'
import Info from './components/Info/Info'
import Posts from './components/Posts/Posts'
import ProfileInfo from './components/Profile/ProfileInfo/ProfileInfo'

function App() {
	return (
		// <React.StrictMode>
		<div className='main'>
			<ProfileInfo />
			<Info />
			<Posts />
		</div>
		// </React.StrictMode>
	)
}

export default App
