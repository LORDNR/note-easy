import { useParams, useSearchParams } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import { useEffect } from 'react'

export default function UpdateStatus() {
	const [searchParams] = useSearchParams()
	const token = searchParams.get('token')
	console.log('token: ' + token)

	useEffect(() => {
		CallUpdateStatus()
	}, [])

	async function CallUpdateStatus() {
		if (validator.isJWT(token!)) {
			try {
				await axios.get('/auth/call-update-status/' + token)
				console.log('test call update status')

				alert('Verify email successfully')
				window.location.href = '/'
			} catch (error) {
				alert(error)
				console.log(error)
			}
		}
	}

	return <h1 hidden>Verify Success</h1>
}
