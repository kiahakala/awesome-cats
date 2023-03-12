import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

function RootLayout() {
	

	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout

// useNavigation can be used to display the data fetching status
// const navigation = useNavigation()
// {navigation.state === 'loading' && <p>Loading...</>}