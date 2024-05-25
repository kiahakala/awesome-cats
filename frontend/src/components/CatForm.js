import { 
	Form, 
	json, 
	redirect,
	useActionData, 
	useNavigate, 
	useNavigation 
} from 'react-router-dom'
import classes from './CatForm.module.css'
import { getAuthToken } from '../util/auth'

function CatForm({ method, cat }) {
	const data = useActionData()
	const navigate = useNavigate()
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	function cancelHandler() {
		navigate('..')
	}

	// To display backend errors: 
	// 1. check if data is sent
	// 2. check if data includes errors object
	// 3. loop through keys in errors object and map the data stored in the keys

	// Input names must be set to use Router Form!
	return (
		<Form method={method} className={classes.form}>
			{data && data.errors && <ul>
				{Object.values(data.errors).map((err) => (
					<li key={err}>{err}</li>
				))}
				</ul>}
			<p>
				<label htmlFor='title'>Title</label>
				<input 
					id='title' 
					type='text' 
					name='title' 
					required 
					defaultValue={cat ? cat.title : ''}
					/>
			</p>
			<p>
				<label htmlFor='image'>Image URL</label>
				<input 
					id='image' 
					type='url' 
					name='image' 
					required 
					defaultValue={cat ? cat.image : ''}
				/>
			</p>
			<p>
				<label htmlFor='date'>Date</label>
				<input 
					id='date' 
					type='date' 
					name='date' 
					required 
					defaultValue={cat ? cat.date : ''}
				/>
			</p>
			<p>
				<label htmlFor='description'>Description</label>
				<textarea 
					id='description' 
					name='description' 
					rows='5'
					required 
					defaultValue={cat ? cat.description : ''}
				/>
			</p>
			<div className={classes.actions}>
				<button type="button" onClick={cancelHandler} disabled={isSubmitting}>
				Cancel
				</button>
				<button disabled={isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Save'}
				</button>
			</div>
		</Form>
	)
}

export default CatForm

export async function action({ request, params }) {
	const method = request.method
	const data = await request.formData()
	
	const catData = {
		title: data.get('title'),
		image: data.get('image'),
		date: data.get('date'),
		description: data.get('description'),
	}

	let url = 'http://localhost:8080/cats'

	if (method === 'PATCH') {
		const catId = params.catId
		url = 'http://localhost:8080/cats/' + catId
	}

	// Get token to authenticate user
	const token = getAuthToken()

	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify(catData),
	})

	// Status code from the backend
	if (response.status === 422) {
		return response
	}

	if (!response.ok) {
		throw json({ message: 'Could not save cat' }, { status: 500 })
	}
	return redirect('/cats')
}