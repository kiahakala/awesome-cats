import { json, redirect, useRouteLoaderData } from "react-router-dom"
import CatItem from '../components/CatItem'

function CatDetailPage() {

	

	// Get identifier from the path 
	//const params = useParams()
	//const data = useLoaderData()

	// useRouteLoaderData takes route id as an arg
	const data = useRouteLoaderData('cat-detail')
	const cat = data.cat

	return (
		<CatItem cat={cat} />
	)
}

export default CatDetailPage

export async function loader({ params }) {
	const id = params.catId
	
	const response = await fetch('http://localhost:8080/cats/' + id)

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch details for the selected cat'},
			{ status: 500 }
			)
	} else {
		return response
	}
}

export async function action({ params }) {
	const catId = params.catId
	const response = await fetch('http://localhost:8080/cats/' + catId, {
		method: 'DELETE'
	})

	if (!response.ok) {
		throw json(
			{ message: 'Could not delete cat'},
			{ status: 500 }
			)
	} 
	return redirect('/cats')
}