import Styles from './InputLabel.module.css'

function InputLabel({
	title,
	id,
	type,
	onChange,
	onKeyDown,
	value,
	maxLength,
	required = false,
	placeholder,
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
				onKeyDown={onKeyDown}
				maxLength={maxLength && null}
				placeholder={placeholder}
			/>
		</div>
	)
}
export default InputLabel
