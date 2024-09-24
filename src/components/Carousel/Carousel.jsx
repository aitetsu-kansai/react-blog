import { useState } from 'react'
import { GoDot, GoDotFill } from 'react-icons/go'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import './Carousel.css'
function Carousel({ images }) {
	const [visibleImage, setVisibleImage] = useState(0)
	const [imageIsChanging, setImageIsChanging] = useState(false)
	return (
		<>
			<div
				className={`${imageIsChanging ? 'post-image__container--change' : ''}`}
			>
				{images[visibleImage]}
			</div>

			<MdNavigateBefore
				className='post-image__carousel-element'
				onClick={e => {
					e.stopPropagation()
					setImageIsChanging(true)
					setTimeout(() => {
						setVisibleImage(
							visibleImage - 1 < 0 ? images.length - 1 : visibleImage - 1
						)
						setImageIsChanging(false)
					}, 110)
				}}
			/>
			<MdNavigateNext
				className='post-image__carousel-element'
				onClick={e => {
					e.stopPropagation()
					setImageIsChanging(true)
					setTimeout(() => {
						setVisibleImage(
							visibleImage + 1 > images.length - 1 ? 0 : visibleImage + 1
						)
						setImageIsChanging(false)
					}, 110)
				}}
			/>
			<div className='carousel-indicators__wrapper'>
				<div className='carousel-indicators__container'>
					{images.map((el, id) =>
						id === visibleImage ? (
							<GoDotFill
								className={`carousel-indicator carousel-indicator-active ${
									imageIsChanging ? 'carousel-indicator--change' : ''
								}`}
								key={id}
							/>
						) : (
							<GoDot
								className={`carousel-indicator ${
									imageIsChanging ? 'carousel-indicator--change' : ''
								}`}
								key={id}
							/>
						)
					)}
				</div>
			</div>
		</>
	)
}

export default Carousel
