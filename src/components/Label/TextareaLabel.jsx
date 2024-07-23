import { useState } from 'react'
import Styles from './TextareaLabel.module.css'

function TextareaLabel({ title, id, setData, value, maxLength = 150 }) {
	const [areaCounter, setAreaCounter] = useState(0)

	return (
		<div className={Styles['textarea-container']}>
			<label htmlFor={id}>
				{title}:{' '}
				<span>
					{areaCounter}/{maxLength}
				</span>
			</label>

			<textarea
				className={Styles.textarea}
				value={value}
				id={id}
				maxLength={maxLength}
				onChange={e => {
					setAreaCounter(e.target.value.length)
					setData(e.target.value)
				}}
			/>
		</div>
	)
}

export default TextareaLabel
