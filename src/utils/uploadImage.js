export const uploadImage = (ref, setImage, dispatch) => {
	const file = ref?.current?.files[0]
	if (file) {
		const imageUrl = URL.createObjectURL(file)
		dispatch && dispatch(setImage(imageUrl))
		setImage(imageUrl)
	}
}
