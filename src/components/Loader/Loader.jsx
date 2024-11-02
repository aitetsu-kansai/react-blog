import { LuLoader2 } from 'react-icons/lu'
import Styles from './Loader.module.css'

function Loader({ text }) {
	return (
		<>
			{text && <span>{text}</span>}
			<LuLoader2 className={Styles.spinner} />
		</>
	)
}

export default Loader
