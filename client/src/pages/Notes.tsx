import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { isExpired, decodeToken } from 'react-jwt'
import axios from 'axios'

interface Note {
	id: number
	note: string
	categoryNote: {
		name: string
	}
	createdAt: string
}

const bull = (
	<Box
		component="span"
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
		•
	</Box>
)

export default function Notes() {
	const token = localStorage.getItem('token')
	const [fetchData, setFetchData] = useState<Note[]>([])
	const [customer, setCustomer] = useState('')

	let customerEmail = ''
	try {
		if (token === null) {
			throw 'Please login'
		}

		const decoded: any = decodeToken(token)

		const customerId: String = decoded.id
		customerEmail = decoded.email
		console.log(customer)

		const NotesData = async () => {
			const nodeData = await axios.get(`/note/customer/${customerId}`)
			setFetchData(nodeData.data.data)
		}
		console.log(fetchData)

		useEffect(() => {
			NotesData()
		}, [])
	} catch (error) {
		alert(error)
		window.location.href = '/'
	}

	return (
		<div>
			{customerEmail}

			{fetchData.map((note: Note) => (
				<Card key={note.id} sx={{ minWidth: 275 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{note.note}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{note.categoryNote.name}
						</Typography>
						<Typography variant="body2">
							Note เมื่อ{' '}
							{new Date(note.createdAt)
								.toLocaleString()
								.replace(/:\d{2}\s/, ' ')}
						</Typography>
					</CardContent>

					<CardActions>
						<Button size="small">Learn More</Button>
					</CardActions>
				</Card>
			))}
		</div>
	)
}
