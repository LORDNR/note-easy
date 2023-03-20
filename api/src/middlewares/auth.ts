import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ErrorResponse } from '../types/response'
import config from '../config'

declare global {
    namespace Express {
        interface Request {
            customerId?: string
        }
    }
}

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) {
            throw 'Invalid authorization'
        }

        let token = req.headers.authorization

        var decoded = jwt.verify(
            token,
            config.environments.SECRET,
        ) as jwt.JwtPayload

        req.customerId = decoded.id

        return next()
    } catch (error) {
        return res
            .status(401)
            .json({ status: 'error', message: error } as ErrorResponse)
    }
}

export { verifyToken }
