import CatImage from '../assets/diana-parkhouse.jpg'

function HomePage() {
	return (
		<>
		<img src={CatImage} className='main-image' alt='Main img of a cat' />
		<h1>Home</h1>
		<p>moi</p>
		</>
		
	)
}

export default HomePage