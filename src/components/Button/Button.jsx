import React from 'react'
import Styles from './Button.module.css'

function Button({text, onClick}) {
	return (
		<div>
			<button className={Styles.button} onClick={onClick}>{text}</button>
		</div>
	)
}

export default Button
