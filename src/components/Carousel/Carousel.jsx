import './Carousel.css'
function Carousel({ children }) {
	return (
		<div className='carousel-container'>
			<div>
				{children}
				<button>Back</button>
				<button>Next</button>
			</div>
		</div>
	)
}

export default Carousel
