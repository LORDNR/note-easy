import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Input from '@mui/material/Input'
import CardActionArea from '@mui/material/CardActionArea'
import { useMediaQuery } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ariaLabel = { 'aria-label': 'description' }

interface Note {
	id: string
	title: string
	note: string
	categoryNote: {
		name: string
	}
	createdAt: string
	updatedAt: string
}

interface Category {
	id: string
	name: string
}

export default function Notes() {
	const token = localStorage.getItem('token')

	const [fetchData, setFetchData] = useState<Note[]>([])
	const [noteId, setNoteId] = useState('')
	const [title, setTitle] = useState('')
	const [note, setNote] = useState('')
	const [category, setCategory] = useState('')
	const [showNoteForm, setShowNoteForm] = useState(true)
	const [fetchCategory, setFetchCategory] = useState<Category[]>([])
	const [checkEditOrAdd, setCheckEditOrAdd] = useState(true)

	const isSmallScreen = useMediaQuery('(max-width:800px)')

	let customerEmail = ''
	let customerId = ''
	try {
		if (token === null) {
			throw 'Please login'
		}

		const decoded: any = decodeToken(token)

		customerId = decoded.id
		customerEmail = decoded.email

		const NotesData = async () => {
			const nodeData = await axios.get(`/note/customer/${customerId}`)
			setFetchData(nodeData.data.data)
		}
		console.log(fetchData)

		const CategoryData = async () => {
			const categoryData = await axios.get(`/category`)
			setFetchCategory(categoryData.data.data)
		}

		useEffect(() => {
			NotesData()
			CategoryData()
			setShowNoteForm(!isSmallScreen)
		}, [isSmallScreen])
	} catch (error) {
		alert(error)
		window.location.href = '/'
	}

	async function handleClickNote(noteData: any) {
		setNoteId(noteData.id)
		setTitle(noteData.title)
		setNote(noteData.note)
		setCategory(noteData.categoryNote.name)

		setCheckEditOrAdd(false)
	}

	async function handleEdit() {
		const categoryId = await axios.get(`/category/name?name=${category}`)

		try {
			await axios.put(`/note/${noteId}`, {
				title,
				noteMessage: note,
				categoryId: categoryId.data.data[0].id,
			})

			window.location.href = '/notes'
		} catch (error) {
			console.log(error)
		}
	}

	async function handleRemove(nodeId: any) {
		try {
			await axios.delete(`/note/${nodeId}`)
			window.location.href = '/notes'
		} catch (error) {
			console.log(error)
		}
	}

	console.log('category:', category)

	async function handleAdd() {
		setTitle('')
		setCategory('')
		setNote('')
		setCheckEditOrAdd(true)
	}

	console.log('note:', note)

	async function handleAddNote() {
		try {
			const categoryId = await axios.get(`/category/name?name=${category}`)
			await axios.post('/note', {
				title,
				noteMessage: note,
				customerId,
				categoryId: categoryId.data.data[0].id,
			})
			alert('add success')
			window.location.href = '/notes'
		} catch (error) {
			console.log(error)
		}
	}

	function handleEditOrAdd() {
		if (checkEditOrAdd) {
			handleAddNote()
		} else {
			handleEdit()
		}
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}))

	return (
		<div style={{ margin: '2%' }}>
			<Button onClick={handleAdd} variant="contained" color="success">
				Add
			</Button>

			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={4}>
					<Grid>
						{fetchData.map((noteData: Note) => (
							<div key={noteData.id}>
								<Item sx={{ display: 'flex' }}>
									<CardActionArea component="a" href="#">
										<div>
											<CardContent onClick={() => handleClickNote(noteData)}>
												<Typography variant="h5" component="div">
													{noteData.title}
												</Typography>
												<Typography variant="body1" component="div">
													{noteData.note}
												</Typography>
												<Typography variant="caption" color="text.secondary">
													{noteData.categoryNote.name}
												</Typography>
												<Typography variant="body2">
													Note เมื่อ{' '}
													{new Date(noteData.updatedAt)
														.toLocaleString()
														.replace(/:\d{2}\s/, ' ')}
												</Typography>
											</CardContent>
										</div>
									</CardActionArea>
									<div>
										<Tooltip title="Delete" style={{ alignItems: 'self-end' }}>
											<IconButton>
												<DeleteIcon onClick={() => handleRemove(noteData.id)} />
											</IconButton>
										</Tooltip>
									</div>
								</Item>

								<br />
							</div>
						))}
					</Grid>
					{showNoteForm && (
						<div>
							<Grid xs={12}>
								<div>
									<Card sx={{ minWidth: 275, width: '100vh', height: '100vh' }}>
										<CardContent>
											<Input
												placeholder="Title"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												inputProps={ariaLabel}
												sx={{ marginBottom: 5, marginLeft: 2, fontSize: 36 }}
											/>

											<br />

											<div>
												<FormControl fullWidth required>
													<InputLabel required id="demo-simple-select-label">
														Category
													</InputLabel>

													<Select
														required
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={category}
														onChange={(e) => setCategory(e.target.value)}
													>
														{fetchCategory.map((category: Category) => (
															<MenuItem
																aria-required
																key={category.id}
																value={category.name}
															>
																{category.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>

											<Input
												placeholder="Note Message"
												value={note}
												onChange={(e) => setNote(e.target.value)}
												inputProps={ariaLabel}
												sx={{ minWidth: 500, marginLeft: 2 }}
											/>
										</CardContent>
										<div>
											<Button
												onClick={handleEditOrAdd}
												variant="contained"
												color="success"
											>
												Submit
											</Button>
											<Button
												onClick={handleAdd}
												variant="contained"
												color="error"
											>
												Cancel
											</Button>
										</div>
									</Card>
								</div>
							</Grid>
						</div>
					)}
				</Grid>
			</Box>
		</div>
	)
}
