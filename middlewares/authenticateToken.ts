import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from 'config';
import log from "../utilities/logger";
import { InvoiceService } from "../services/invoice.services";



export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        email: string;
    }
}

export const checkId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const data = await InvoiceService.findInvoice({id})

    if (!data) {
        return res.status(404).send({ error: "ID does not exist" });
    }
    next()
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(401).json({ error: 'You are not authorized' })
    }

    const token = authorization.split(' ')[1]
    const ACCESSTOKEN = config.get<string>('accessTokenKey');

    jwt.verify(token, `${ACCESSTOKEN}`, (err: any, user: any) => {
        if (err) {
            log.error(err);
            return res.status(403).json({ error: err });
        }
        return next()
    });
}
