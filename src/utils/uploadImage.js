export const uploadImage = (ref, image, setImage) => {
	const files = ref?.current?.files

	if (!files) return

	if (files.length) {
		const imageUrls = Array.from(files).map(el => {
			const imageUrl = URL.createObjectURL(el)
			return imageUrl
		})
		setImage(prevImages => [...prevImages, ...imageUrls])
	} else {
		const imageUrl = URL.createObjectURL(files)
		setImage(imageUrl)
	}

	ref.current.value = ''
}
