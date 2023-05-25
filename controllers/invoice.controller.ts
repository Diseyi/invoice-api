import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { InvoiceService } from "../services/invoice.services";
import log from "../utilities/logger";

export class Invoice {
    static async createInvoince(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(422).json({ errors: errorMessages });
        }

        try {
            const data = await InvoiceService.createInvoice(req.body)
            const invoice = InvoiceService.createSuccessResponse(data, "Invoice successfully created!")
            return res.status(201).send(invoice)
        } catch (error) {
            log.error(error);
            return res.status(522).send({ error: "Invoice creation failed" });
        }
    }

    static async fetchAllInvoice(req: Request, res: Response) {
        try {
            const data = await InvoiceService.allInvoice()
            const invoice = InvoiceService.createSuccessResponse(data, "Process successful!")
            return res.status(200).send(invoice)
        } catch (error) {
            log.error(error);
            return res.status(522).send({ error: "" });
        }
    }
    
    static async fetchSingleInvoice(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const data = await InvoiceService.findInvoice({id})
            const invoice = InvoiceService.createSuccessResponse(data, "Invoice successfully fetch")
            return res.status(200).send(invoice)
        } catch (error) {
            log.error(error);
            return res.status(522).send({ error: "" });
        }
    }

    static async updateInvoice(req: Request, res: Response) {
        const id = req.params.id

        try {
            const input = req.body;
            const data = await InvoiceService.findAndUpdateInvoice({id}, input)
            const invoice = InvoiceService.createSuccessResponse(data, "Invoice successfully updated!")
            return res.status(200).send(invoice)
        } catch (error) {
            log.error(error);
            return res.status(522).send({ error: "" });
        }
    }

    static async deleteInvoice(req: Request, res: Response) {
        const id = req.params.id

        try {
            const data = await InvoiceService.deleteInvoice({id})
            const invoice = InvoiceService.createSuccessResponse([], "Invoice successfully deleted!")
            return res.status(200).send(invoice)
        } catch (error) {
            log.error(error);
            return res.status(522).send({ error: "" });
        }
    }

}