import { Suspense } from 'react'
import { useLoaderData, json, defer, Await } from 'react-router-dom'
import CatsList from '../components/CatsList'

// With react router data can be fetched beforehand
// No need to render the component first and then fetch data <- suboptimal!
// Browser supported response creation can be used to reduce code

function CatsPage() {
	const { cats } = useLoaderData() // part of the response
	// const cats = data.cats // extracted from the data object

	return (
		<Suspense fallback={<p style={{ textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={cats}>
				{(loadedCats) => <CatsList cats={loadedCats} />} 
			</Await>
		</Suspense>
	)
}

export default CatsPage

async function loadCats() {
	const response = await fetch('http://localhost:8080/cats')

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch cats :(' }, { status: 500 }
			)
	} else {
		const resData = await response.json()
		return resData.cats
	}
}

export function loader() {
	return defer({
		cats: loadCats()
	})
}

// import { useState, useEffect } from 'react'

// const [isLoading, setIsLoading] = useState(false)
	// const [fetchedCats, setFetchedCats] = useState()
	// const [error, setError] = useState()

	// useEffect(() => {
	// 	async function fetchCats() {
	// 		setIsLoading(true)
	// 		const response = await fetch('http://localhost:8080/cats')

	// 		if (!response.ok) {
	// 			setError('Fetching cats failed')
	// 		} else {
	// 			const resData = await response.json()
	// 			setFetchedCats(resData.cats)
	// 		}
	// 		setIsLoading(false)
	// 	}
	// 	fetchCats()
	// }, [])

// return (
// 	<>
// 		<div style={{ textAlign: 'center '}}>
// 			{isLoading && <p>Loading...</p>}
// 			{error && <p>{error}</p>}
// 		</div>
// 		{!isLoading && fetchedCats && <CatsList cats={fetchedCats} />}
// 	</>
	
// )