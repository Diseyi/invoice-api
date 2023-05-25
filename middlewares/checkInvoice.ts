import { Request, Response, NextFunction } from "express";
import { InvoiceService } from "../services/invoice.services";

export const checkId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const data = await InvoiceService.findInvoice({id})

    if (!data) {
        return res.status(404).send({ error: "ID does not exist" });
    }
    next()
}