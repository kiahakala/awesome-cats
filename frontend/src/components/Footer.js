import NewsletterSignup from "./NewsletterSignup";
import classes from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={classes.footer}>
			<NewsletterSignup />
			<p>&#169; Kia Hakala 2024</p>
		</footer>
	);
}