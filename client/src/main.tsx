import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import axios from 'axios'
import Error from './pages/Error'
import Login from './pages/Login'
import UpdateStatus from './pages/UpdateStatus'
import Register from './pages/Register'
import Notes from './pages/Notes'

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_API}`
// axios.defaults.withCredentials = true

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route errorElement={<Error />}></Route>
			<Route index element={<Login />}></Route>
			<Route path='register' element={<Register />}></Route>
			<Route path='update-status' element={<UpdateStatus />}></Route>
			<Route path='notes' element={<Notes />}></Route>
		</Route>,
	),
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<>
			<RouterProvider router={router} />
		</>
	</React.StrictMode>,
)
