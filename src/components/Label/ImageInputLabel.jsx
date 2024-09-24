import { FaCloudArrowDown } from 'react-icons/fa6'

import { forwardRef } from 'react'
import Styles from './ImageInputLabel.module.css'

const ImageInputLabel = forwardRef(({ id, onChange, multiple = true }, ref) => {
	return (
		<>
			{' '}
			<label className={Styles['post-creator__label']} htmlFor={id}>
				{' '}
				{<FaCloudArrowDown />} Click to Upload
			</label>
			<input
				type='file'
				id={id}
				onChange={onChange}
				multiple={multiple}
				ref={ref}
				className={Styles['post-creator__input']}
			/>
		</>
	)
})

export default ImageInputLabel
