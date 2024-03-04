import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthPage() {
	return (
		<AuthForm />
	);
}

export default AuthPage;

// Action for auth form submission
export async function action({ request }) {
	const searchParams = new URL(request.url).searchParams
	const mode = searchParams.get('mode') || 'login';
	
	if (mode !== 'login' && mode !== 'signup') {
		throw json({ message: 'Unsupported mode.' }, { status: 422 });
	}

	const data = await request.formData();
	console.log(data)
	const authData = {
		email: data.get('email'),
		password: data.get('password'),
	};

	const response = await fetch('http://localhost:8080/' + mode, {
		method: 'POST',
		body: JSON.stringify(authData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 422 || response.status === 401) {
		return response
	}

	if (!response.ok) {
		throw json({ message: 'Authentication failed.' }, { status: 500 });
	}

	// Token management
	const resData = await response.json();
	const token = resData.token;

	// Save token in local storage
	localStorage.setItem('token', token);


	return redirect('/')
}
