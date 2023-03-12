import { useEffect, useState } from 'react'
import { Link, useSubmit, useMatch } from 'react-router-dom'
import { Icon, IconButton } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import classes from './CatItem.module.css'

function CatItem({ cat }) {
	const submit = useSubmit()
	const [likes, setLikes] = useState(null)

	const match = useMatch('/cats/:catId')
	let catId = match.params.catId

	useEffect(() => {
		async function getLikes() {
			let response = await fetch(`http://localhost:8080/cats/${catId}`)
			let data = await response.json()
			setLikes(data.cat.likes)
			console.log(data.cat)
		}
		getLikes()
	}, [catId, likes])

	async function updateLikes() {
		await fetch(`http://localhost:8080/cats/${catId}`, {
			method: "PUT",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...cat, likes: cat.likes }),
		})
	}
	
	function pawHandler() {
		setLikes(cat.likes = likes + 1)
		updateLikes()
	}

	function startDeleteHandler() {
		const proceed = window.confirm('Are you sure?')
	
		if (proceed) {
		  submit(null, { method: 'delete' })
		}
	}

	return (
		<article className={classes.cat}>
			<img src={cat.image} alt={cat.title} />
			<h1>{cat.title}</h1>
			<time>{cat.date}</time>
			<p>{cat.description}</p>
			<p>{cat.likes}</p>
			<IconButton>
				<PetsIcon />
			</IconButton>
			<menu className={classes.actions}>
				<Link to="edit">Edit</Link>
				<button onClick={startDeleteHandler}>Delete</button>
				<button onClick={pawHandler}>{cat.likes}</button>
			</menu>
		</article>
	)
}

export default CatItem

{/* <button name='likes' aria-label='Give paws up' onClick={pawHandler}>
					<PetsIcon />
					{likes}
				</button> */}