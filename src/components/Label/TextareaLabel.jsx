import { useState } from 'react'
import Styles from "./TextareaLabel.module.css"

function TextareaLabel({ title, id, setUserData, value }) {
	const textAreaMaxLength = 150

	const [areaCounter, setAreaCounter] = useState(0)

	return (
		<>
			<label htmlFor={id}>{title}: </label>
			<span>
				{areaCounter}/{textAreaMaxLength}
			</span>
			<textarea
				className={Styles.textarea}
				value={value}
				id={id}
				maxLength={textAreaMaxLength}
				onChange={e => {
					setAreaCounter(e.target.value.length)
					setUserData(e.target.value)
				}}
			/>
		</>
	)
}

export default TextareaLabel
