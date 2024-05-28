import Styles from './InputLabel.module.css'

function InputLabel({ title, id, type, onChange, value, maxLength }) {
	return (
		<>
			<label htmlFor={id}>
				{' '}
				{title}:{` `}
			</label>
			<input
				className={Styles.input}
				type={type}
				id={id}
				value={value}
				required={true}
				onChange={onChange}
				maxLength={maxLength && null}
			/>
		</>
	)
}
export default InputLabel
