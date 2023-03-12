import { useRouteError } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import PageContent from "../components/PageContent"

function ErrorPage() {
	const error = useRouteError()

	let title = 'Meowwps'
	let message = 'Wanted cats, got an error :('

	if (error.status === 500) {
		// when using json(), parsing is not needed
		// message = JSON.parse(error.data).message
		message = error.data.message
	}

	if (error.status === 404) {
		title = 'Darn!'
		message = 'No cats to be found!'
	}

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>
				<h3>{message}</h3>
			</PageContent>
		</>	
	)
}

export default ErrorPage