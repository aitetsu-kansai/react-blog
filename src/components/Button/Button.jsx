import React from 'react'
import Styles from './Button.module.css'

function Button({ text, type, onClick }) {
	return (
		<div>
			<button className={Styles['button']} type={type} onClick={onClick}>
				{text}
			</button>
		</div>
	)
}

export default Button
