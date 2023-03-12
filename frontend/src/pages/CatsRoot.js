import { Outlet } from 'react-router-dom'
import CatsNavigation from '../components/CatsNavigation'

function CatsRootLayout() {
	return (
		<>
			<CatsNavigation />
			<Outlet />
		</>
	)
}

export default CatsRootLayout