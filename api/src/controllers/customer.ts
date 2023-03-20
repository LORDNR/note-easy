import type { Request, Response } from 'express'

import { prisma, reqValidation } from '../utils'
import { SuccessResponse, ErrorResponse } from '../types/response'

async function profile(req: Request, res: Response) {
    const customerId = req.customerId
    try {
        const profile = await prisma.customer.findUniqueOrThrow({
            where: {
                id: customerId,
            },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                status: true,
            },
        })
        return res.status(200).json({
            status: 'success',
            data: profile,
        } as SuccessResponse)
    } catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error } as ErrorResponse)
    }
}

export default { profile }
