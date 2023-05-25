import { Router, Request, Response, NextFunction } from "express";
import { Invoice } from "../controllers/invoice.controller";
import { checkId } from "../middlewares/authenticateToken";


const InvoiceRouter = Router()

InvoiceRouter
.get("/invoice", Invoice.fetchAllInvoice)
.get("/invoice/:id", checkId, Invoice.fetchSingleInvoice)
.post("/invoice", Invoice.createInvoince)
.put("/invoice/:id", checkId, Invoice.updateInvoice)
.delete("/invoice/:id", checkId, Invoice.deleteInvoice)

export default InvoiceRouter