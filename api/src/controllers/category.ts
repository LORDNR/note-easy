import type { Request, Response } from 'express'

import { prisma, reqValidation } from '../utils'
import { SuccessResponse, ErrorResponse } from '../types/response'

async function create(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { name } = req.body

		const category = await prisma.categoryNote.create({
			data: {
				name,
			},
		})

		return res.status(201).json({
			status: 'success',
			data: category,
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function find(req: Request, res: Response) {
	try {
		const categories = await prisma.categoryNote.findMany()

		return res.status(200).json({
			status: 'success',
			data: categories,
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function findById(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { id } = req.params

		const category = await prisma.categoryNote.findUnique({
			where: {
				id,
			},
		})

		return res.status(200).json({
			status: 'success',
			data: category,
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function update(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { id } = req.params
		const { name } = req.body

		await prisma.categoryNote.update({
			where: {
				id,
			},
			data: {
				name,
			},
		})

		return res.status(200).json({
			status: 'success',
			message: 'Update success.',
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function remove(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { id } = req.params

		await prisma.categoryNote.delete({
			where: {
				id,
			},
		})

		return res.status(204).end()
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

export default { find, findById, create, update, remove }
