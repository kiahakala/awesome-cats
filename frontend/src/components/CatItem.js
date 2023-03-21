import { useEffect, useState } from 'react'
import { Link, useSubmit, useMatch } from 'react-router-dom'
import { Icon, IconButton } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import classes from './CatItem.module.css'
import { width } from '@mui/system'

function CatItem({ cat }) {
	const submit = useSubmit()
	const [likes, setLikes] = useState(0)

	const match = useMatch('/cats/:catId')
	let catId = match.params.catId

	useEffect(() => {
		async function getLikes() {
			let response = await fetch(`http://localhost:8080/cats/${catId}`, {
				method: "PUT",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...cat, likes: cat.likes }),
			})
			let data = await response.json()
			setLikes(data.cat.likes)
			console.log(data.cat)
		}
		getLikes()
	}, [catId, cat, likes])
	
	function pawHandler() {
		setLikes(cat.likes = likes + 1)
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
			<IconButton onClick={pawHandler} className={classes.iconButton}>
				<PetsIcon className={classes.icon} />
				<span className={classes.likes}>{cat.likes}</span>
			</IconButton>
			<menu className={classes.actions}>
				<Link to="edit">Edit</Link>
				<button onClick={startDeleteHandler}>Delete</button>
			</menu>
		</article>
	)
}

export default CatItem

{/* <button name='likes' aria-label='Give paws up' onClick={pawHandler}>
					<PetsIcon />
					{likes}
				</button> */}