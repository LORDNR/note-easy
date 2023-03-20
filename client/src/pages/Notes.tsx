import { useState, useEffect, useRef } from 'react'
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
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import AddIcon from '@mui/icons-material/Add'
import AppBarProvider from '../components/AppBarProvider'
import DialogProvider from '../components/DialogProvider'
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '../components/SearchProvider'
import { Tags } from '../components/Tags'

const ariaLabel = { 'aria-label': 'description' }

interface Note {
	id: string
	title: string
	description: string
	tags: string[]
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

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}))

export default function Notes() {
	const token = localStorage.getItem('token')

	const [fetchData, setFetchData] = useState<Note[]>([])
	const [noteId, setNoteId] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')

	const [showNoteForm, setShowNoteForm] = useState(true)
	const [fetchCategory, setFetchCategory] = useState<Category[]>([])
	const [checkEditOrAdd, setCheckEditOrAdd] = useState(true)
	const [showEditForm, setShowEditForm] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [tags, SetTags] = useState<string[]>([])
	const tagRef = useRef<HTMLInputElement>(null)

	let isSmallScreen = useMediaQuery('(max-width:900px)')

	let customerEmail = ''
	let customerId = ''

	if (token === null) {
		window.location.href = '/'
		throw 'Please login'
	}

	// let message: string[] = ['test', 'test2']
	// setTags(message)

	let testTag = ['test', 'test2']

	const decoded: any = decodeToken(token)

	customerId = decoded.id
	customerEmail = decoded.email

	async function NotesData() {
		const nodeData = await axios.get(`/note/customer/${customerId}`)
		setFetchData(nodeData.data.data)
	}



	async function CategoryData() {
		const categoryData = await axios.get(`/category`)
		setFetchCategory(categoryData.data.data)
	}

	async function handleClickNote(noteData: any) {
		if (isSmallScreen) {
			setShowEditForm(true)
			setShowNoteForm(isSmallScreen)
		}


		setNoteId(noteData.id)
		setTitle(noteData.title)
		setDescription(noteData.description)
		SetTags(noteData.tags)
		setCategory(noteData.categoryNote.name)


		setCheckEditOrAdd(false)
	}

	async function setEmpty() {
		setTitle('')
		setCategory('')
		setDescription('')
		SetTags([])
		setCheckEditOrAdd(true)
	}

	async function handleEdit() {
		const categoryId = await axios.get(`/category/name?name=${category}`)
		try {
			await axios.put(`/note/${noteId}`, {
				title,
				description,
				tags,
				categoryId: categoryId.data.data[0].id,
			})
			NotesData()
			setEmpty()
		} catch (error) {
			console.log(error)
		}
	}

	async function handleRemove(nodeId: any) {
		setNoteId(nodeId)
		setOpenDialog(true)
	}

	async function handleAdd() {
		if (isSmallScreen) {
			setShowEditForm(true)
			setShowNoteForm(isSmallScreen)
		}
		setEmpty()
	}
	async function handleCancel() {
		if (isSmallScreen) {
			window.location.href = '/notes'
		} else {
			setEmpty()
		}
	}

	async function handleAddNote() {
		try {
			const categoryId = await axios.get(`/category/name?name=${category}`)
			await axios.post('/note', {
				title,
				description,
				tags,
				customerId,
				categoryId: categoryId.data.data[0].id,
			})
			// alert('add success')
			NotesData()
			setEmpty()
		} catch (error) {
			console.log(error)
		}
	}

	function handleEditOrAdd(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		setShowEditForm(false)
		setShowNoteForm(!isSmallScreen)
		if (checkEditOrAdd) {
			handleAddNote()
		} else {
			handleEdit()
		}
	}
	function truncateTitle(description: any) {
		if (description.length > 20) {
			return description.substring(0, 17) + '...'
		} else {
			return description
		}
	}

	function truncateDescription(description: any) {
		if (description.length > 30) {
			return description.substring(0, 27) + '...'
		} else {
			return description
		}
	}

	//tags


	const handleDelete = (value: string) => {
		const newTags = tags.filter((val) => val !== value)
		SetTags(newTags)
	}
	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (tagRef.current && tagRef.current.value !== '') {
			SetTags([...tags, tagRef.current.value])
			tagRef.current.value = ''
		}
	}

	// end tags

	useEffect(() => {
		NotesData()
		CategoryData()
		setShowNoteForm(!isSmallScreen)
	}, [isSmallScreen])

	return (
		<div>
			<AppBarProvider customer={customerEmail} />
			<DialogProvider
				open={openDialog}
				dialogTitle='Confirm Remove Note'
				noteId={noteId}
			/>
			<div style={{ margin: '2%' }}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={4}>
						<Grid xs={12} sx={{ textAlign: 'left' }}>
							<div hidden={showEditForm} style={{ display: 'flex' }}>
								<Button
									style={{ marginRight: 30 }}
									onClick={handleAdd}
									variant="contained"
									color="success"
								>
									<AddIcon />
									Create
								</Button>

								<div>
									<Search>
										<SearchIconWrapper>
											<SearchIcon />
										</SearchIconWrapper>
										<StyledInputBase
											placeholder="Search…"
											inputProps={{ 'aria-label': 'search' }}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</Search>
								</div>
							</div>
						</Grid>
						<br />
						<div id='note-data' hidden={showEditForm}>
							<Grid>
								{fetchData
									.filter((noteData: Note) => {
										if (searchTerm == '') {
											return noteData
										} else if (
											noteData.title
												.toLowerCase()
												.includes(searchTerm.toLowerCase()) ||
											noteData.categoryNote.name?.includes(searchTerm) ||
											noteData.description
												.toLocaleLowerCase()
												.includes(searchTerm.toLocaleLowerCase()) ||
											noteData.tags[0].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
											noteData.updatedAt.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
										) {
											return noteData
										}
									})
									.map((noteData: Note) => (
										<div key={noteData.id}>
											<Item
												sx={{ display: 'flex', backgroundColor: 'lightyellow' }}
											>
												<CardActionArea component="a" href="#">
													<div>
														<CardContent
															onClick={() => handleClickNote(noteData)}
														>

															<Typography
																variant="h5"
																component="div"
																sx={{ color: 'black' }}
															>
																{truncateTitle(noteData.title)}
															</Typography>
															<Typography
																variant="caption"
																color="text.secondary"
															>
																{noteData.categoryNote.name}
															</Typography>
															<Typography variant="body1" component="div">
																{truncateDescription(noteData.description)}
															</Typography>

															<Typography variant="body2">
																Note เมื่อ{' '}
																{new Date(noteData.updatedAt)
																	.toLocaleString()
																	.replace(/:\d{2}\s/, ' ')}
															</Typography>
															<br />
															{noteData.tags.map((tag: String) =>
																<Typography sx={{ border: 1, borderRadius: '16px', padding: '3%', alignItems: 'center', marginLeft: 0.2, backgroundColor: 'lightsalmon', color: 'white' }} variant='caption'>
																	{tag}
																</Typography>
															)}
														</CardContent>
													</div>
												</CardActionArea>
												<div>
													<Tooltip
														title="Delete"
														style={{ alignItems: 'self-end' }}
													>
														<IconButton>
															<DeleteIcon
																sx={{ color: 'red' }}
																onClick={() => handleRemove(noteData.id)}
															/>
														</IconButton>
													</Tooltip>
												</div>
											</Item>

											<br />
										</div>
									))}
							</Grid>
						</div>


						<div hidden={!showNoteForm}>
							<Grid xs={12}>
								<div>
									<div>
										{/*tags*/}

										<Box sx={{ flexGrow: 1 }}>
											<form onSubmit={handleOnSubmit}>
												<TextField
													inputRef={tagRef}
													fullWidth
													variant='standard'
													size='small'
													sx={{ margin: '1rem 0' }}
													margin='none'
													placeholder={tags.length < 5 ? 'Enter tags' : ''}
													InputProps={{
														startAdornment: (
															<Box
																sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}

															>
																{tags.map((data, index) => {
																	return (
																		<Tags
																			data={data}
																			handleDelete={handleDelete}
																			key={index}
																		/>
																	)
																})}
															</Box>
														),
													}}
												/>
											</form>
										</Box>

										{/* end tags */}
									</div>
									<Box
										component="form"
										onSubmit={handleEditOrAdd}
										sx={{ mt: 1 }}
									>
										<Card
											sx={{ minWidth: 275, width: '100vh', height: '100vh' }}
										>
											<CardContent>
												<Input
													required
													placeholder="Title"
													value={title}
													onChange={(e) => setTitle(e.target.value)}
													inputProps={ariaLabel}
													sx={{
														width: '80%',
														height: '100%',
														marginBottom: 5,
														marginLeft: 2,
														fontSize: 36,
													}}
												// sx={{}}
												/>

												<br />

												<div>
													<FormControl
														sx={{ m: 1, minWidth: 120 }}
														required
														size="small"
													>
														<InputLabel id="demo-select-small">
															Category
														</InputLabel>
														<Select
															labelId="demo-simple-select-label"
															id="demo-simple-select"
															label="Category"
															value={category}
															onChange={(e) => setCategory(e.target.value)}
														>
															{fetchCategory.map((category: Category) => (
																<MenuItem
																	key={category.id}
																	value={category.name}
																>
																	{category.name}
																</MenuItem>
															))}
														</Select>
													</FormControl>
												</div>
												<br />
												<br />

												<TextField
													id="outlined-textarea"
													label="Description"
													required
													// placeholder="Description"
													rows={16}
													multiline
													value={description}
													onChange={(e) => setDescription(e.target.value)}
													sx={{ width: '100%', height: '100%' }}
												/>
											</CardContent>
											<br />
											<div style={{ textAlign: 'center' }}>
												<Button
													// onClick={handleEditOrAdd}
													type='submit'
													variant="contained"
													color="success"
													sx={{ width: '15%' }}
												>
													Save
												</Button>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<Button
													onClick={handleCancel}
													variant="contained"
													color="error"
												>
													Cancel
												</Button>
											</div>
										</Card>
									</Box>
								</div>
							</Grid>
						</div>
					</Grid>
				</Box>
			</div>
		</div>
	)
}
