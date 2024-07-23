import Styles from './InputLabel.module.css'

function InputLabel({
	title,
	id,
	type,
	onChange,
	value,
	maxLength,
	required = false,
}) {
	return (
		<div className={Styles['input-container']}>
			<label htmlFor={id}>
				{' '}
				{title}:{` `}
			</label>
			<input
				className={Styles.input}
				type={type}
				id={id}
				value={value}
				required={required}
				onChange={onChange}
				maxLength={maxLength && null}
			/>
		</div>
	)
}
export default InputLabel
