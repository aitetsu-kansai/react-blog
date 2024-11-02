import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import './Dropdown.css'

function Dropdown({ children }) {
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const [dropDownChanging, setDropdownChanging] = useState(false)
	const handleMouseOver = () => {
		setDropdownIsOpen(true)
		setTimeout(() => {
			setDropdownChanging(true)
		}, 200)
	}

	const handleMouseLeave = () => {
		setDropdownChanging(false)
		setTimeout(() => {
			setDropdownIsOpen(false)
		}, 200)
	}

	return (
		<div className='dropdown-container' onMouseLeave={handleMouseLeave}>
			<span onMouseOver={handleMouseOver} style={{ marginLeft: 'auto' }}>
				<HiOutlineDotsVertical className='more-info__ico' />
			</span>
			{dropdownIsOpen && (
				<ul
					className={`post-editing-list ${
						dropDownChanging && 'post-editing-list--change'
					}`}
				>
					{children}
				</ul>
			)}
		</div>
	)
}

export default Dropdown
