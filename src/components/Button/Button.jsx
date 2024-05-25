import React from 'react'
import Styles from './Button.module.css'

function Button({text}) {
	return (
		<div>
			<button className={Styles.button}>{text}</button>
		</div>
	)
}

export default Button
