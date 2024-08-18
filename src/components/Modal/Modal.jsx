import './Modal.css'

function Modal({ active, setActive, children, isImage = false }) {
	return (
		<div
			className={`modal ${active ? 'active' : ''}`}
			onClick={() => {
				setActive(false)
			}}
		>
			<div
				className={`modal__content ${active ? 'active' : ''}`}
				onClick={e => {
					e.stopPropagation()
				}}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
