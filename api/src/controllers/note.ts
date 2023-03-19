import type { Request, Response } from 'express'

import { prisma, reqValidation } from '../utils'
import { SuccessResponse, ErrorResponse } from '../types/response'

async function create(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { title, noteMessage, customerId, categoryId } = req.body

		const noteData = await prisma.note.create({
			data: {
				title,
				note: noteMessage,
				customer: {
					connect: {
						id: customerId,
					},
				},
				categoryNote: {
					connect: {
						id: categoryId,
					},
				},
				HistoryNote: {
					create: {
						customer: {
							connect: {
								id: customerId,
							},
						},
					},
				},
			},
		})

		return res.status(201).json({
			status: 'success',
			data: noteData,
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}

async function find(req: Request, res: Response) {
	try {
		const notes = await prisma.note.findMany({
			select: {
				id: true,
				title: true,
				note: true,
				customer: {
					select: {
						email: true,
					},
				},
				categoryNote: {
					select: {
						name: true,
					},
				},
			},
		})

		return res.status(200).json({
			status: 'success',
			data: notes,
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

		const note = await prisma.note.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				title: true,
				note: true,
				customer: {
					select: {
						email: true,
					},
				},
				categoryNote: {
					select: {
						name: true,
					},
				},
			},
		})

		return res.status(200).json({
			status: 'success',
			data: note,
		} as SuccessResponse)
	} catch (error: any) {
		return res
			.status(400)
			.json({ status: 'error', message: error } as ErrorResponse)
	}
}
async function findByCustomer(req: Request, res: Response) {
	try {
		reqValidation(req)

		const { id } = req.params

		const note = await prisma.note.findMany({
			where: {
				customerId: id
			},
			select: {
				id: true,
				title: true,
				note: true,
				categoryNote: {
					select: {
						name: true,
					},
				},
				createdAt: true,
				updatedAt: true
			},
		})

		return res.status(200).json({
			status: 'success',
			data: note,
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
		const { title, noteMessage, categoryId } = req.body

		await prisma.note.update({
			where: {
				id,
			},
			data: {
				title,
				note: noteMessage,
				categoryNote: {
					connect: {
						id: categoryId,
					},
				},
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

		await prisma.note.delete({
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

export default { create, find, findById, findByCustomer, update, remove }
