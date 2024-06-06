import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearInfo, selectInfo } from '../../redux/slices/infoSlice'

function Info() {
	const dispatch = useDispatch()
	const info = useSelector(selectInfo)

	useEffect(() => {
		if (info.infoMessage) {
			toast[info.infoCategory](info.infoMessage)
			dispatch(clearInfo())
		}
	}, [info, dispatch])

	return <ToastContainer position='top-right' autoClose={2000} theme='dark' />
}

export default Info
