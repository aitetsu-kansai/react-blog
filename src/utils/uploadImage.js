export const uploadImage = (
	ref,
	image,
	setImage,
	dispatch,
	multiple = false
) => {
	const files = multiple ? ref?.current?.files : ref?.current?.files[0]

	if (files && multiple && files.length) {
		console.log(files)
		const imageUrls = Array.from(files).map(el => {
			const imageUrl = URL.createObjectURL(el)
			let orientation = ''
			const img = new Image()
			img.src = imageUrl
			img.onload = () => {
				orientation = img.naturalHeight > img.naturalWidth ? 'book' : 'portrait'
				setImage(prevImages => [...prevImages, { img: imageUrl, orientation }])
				dispatch &&
					dispatch(setImage([...image, { img: imageUrl, orientation }]))
			}
			return { img: imageUrl, orientation: '' }
		})
	} else {
		const imageUrl = URL.createObjectURL(files)
		dispatch && dispatch(setImage(imageUrl))
		setImage(imageUrl)
	}

	ref.current.value = ''
}
