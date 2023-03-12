import NewsletterSignup from "../components/NewsletterSignup"
import PageContent from "../components/PageContent"

function NewsletterPage() {
	return (
		<PageContent>
			<NewsletterSignup />
		</PageContent>
	)
}

export default NewsletterPage

export async function action({ request }) {
	const data = await request.formData()
	const email = data.get('email')

	console.log(email)
	return { message: 'Signup successful!' }
}