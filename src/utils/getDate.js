export const getDate = () => {
	const date = new Date()
	return `${date.getDate().toString().padStart(2, '0')}-${date
		.getMonth()
		.toString()
		.padStart(
			2,
			'0'
		)}-${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
}
