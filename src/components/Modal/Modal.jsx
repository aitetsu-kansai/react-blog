import Styles from './Modal.module.css'

function Modal({ active, setActive, children }) {
	return (
		<div
			className={`${Styles['modal']} ${active ? Styles['active'] : ''}`}
			onClick={() => {
				setActive(false)
			}}
		>
			<div
				className={`${Styles['modal__content']} ${
					active ? Styles['active'] : ''
				}`}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
