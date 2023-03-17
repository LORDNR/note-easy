import type { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma, reqValidation } from '../utils'
import { SuccessResponse, ErrorResponse } from '../types/response'
import sendVerifyEmail from '../utils/sendVerifyEmail'
import config from '../config'

async function register(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { email, password, firstname, lastname } = req.body

		const customer = await prisma.customer.create({
			data: {
				email,
				password: bcryptjs.hashSync(password, await bcryptjs.genSalt(10)),
				firstname,
				lastname,
			},
		})

		await sendVerifyEmail(
			email,
			customer.id,
			'call-update-status',
			'To get started with Verify Email, please click here:',
			'24h',
		)

		return res.status(201).json({
			status: 'success',
			message: 'Register Success. Please Verify Email',
			data: { customer_id: customer.id },
		} as SuccessResponse)
	} catch (error: any) {
		if (error.message.code === 'P2002') {
			throw 'Email already exists.'
		}

		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function callUpdateStatus(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { token } = req.params

		const secret = config.environments.SECRET

		// let decoded: any = jwt.verify(token.substring(1), secret)
		let decoded: any = jwt.verify(token, secret)
		const customerId = decoded.customerId
		if (await updateStatus(customerId)) {
			return res.status(200).json({
				status: 'success',
				message: 'Verify email success',
			} as SuccessResponse)
		}
	} catch (error) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function updateStatus(customerId: string): Promise<boolean> {
	try {
		await prisma.customer.update({
			where: {
				id: customerId,
			},
			data: {
				status: 'Verified',
			},
		})

		return true
	} catch (error) {
		console.log(`updateStatus: ${error}`)
		return false
	}
}

export default { register, callUpdateStatus }
