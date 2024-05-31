import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { selectProfile } from '../../redux/slices/profileSlice'

function Info() {
	const profile = useSelector(selectProfile)
	useEffect(() => {
		toast.info('Updated!')
	}, [profile])
	return <ToastContainer position='top-right' autoClose={2000} theme='dark' />
}

export default Info
