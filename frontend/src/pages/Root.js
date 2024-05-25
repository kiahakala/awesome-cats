import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { getTokenDuration } from '../util/auth'

function RootLayout() {
	
	const token = useLoaderData()
	const submit = useSubmit()

	// Automatically log out after 1 hour
	useEffect(() => {
		if (!token) {
			return
		}

		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'POST'})
			return
		}

		const tokenDuration = getTokenDuration()

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'POST'})
		}, tokenDuration)
	}, [token, submit]);

	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default RootLayout

// useNavigation can be used to display the data fetching status
// const navigation = useNavigation()
// {navigation.state === 'loading' && <p>Loading...</>}