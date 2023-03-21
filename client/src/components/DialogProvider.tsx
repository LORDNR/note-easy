import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import BackdropProvider from './BackdropProvider'

export default function DialogProvider(props: {
	open: boolean
	dialogTitle: string
	noteId: string
	NotesData(): Promise<void>
	onClose: () => void
	setEmpty(): Promise<void>
}) {
	const [openBackdrop, setOpenBackdrop] = useState(false)

	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	async function handleSubmit() {
		setOpenBackdrop(!openBackdrop)
		try {
			await axios.delete(`/note/${props.noteId}`)
			props.NotesData()
			props.onClose()
			props.setEmpty()
			setOpenBackdrop(false)
		} catch (error) {
			console.log(error)
		}
	}

	async function handleCancel() {
		props.onClose()
	}

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={props.open}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{props.dialogTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the saved data?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit}>Submit</Button>
					<Button onClick={handleCancel} color='error'>
						cancel
					</Button>
				</DialogActions>
			</Dialog>
			<BackdropProvider open={openBackdrop}></BackdropProvider>
		</div>
	)
}
