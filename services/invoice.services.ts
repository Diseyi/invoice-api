import { FilterQuery } from "mongoose";
import ShortUniqueId from "short-unique-id";
import { omit } from "lodash";
import InvoiceModel from "../models/invoice.model";
import { IInvoice } from "../interface";

const uid = new ShortUniqueId({ length: 6 });

export class InvoiceService {
    static async createInvoice(input: IInvoice) {
        input.id = uid()
        const invoice = await InvoiceModel.create(input)
        return omit(invoice.toJSON(), "_id", "__v");
    }

    static async allInvoice() {
        return await InvoiceModel.find()
    }

    static async deleteInvoice(query: FilterQuery<{ id: string; }>) {
        return await InvoiceModel.findOneAndDelete(query)
    }

    static async findInvoice(query: FilterQuery<{ id: string; clientEmail: string; }>) {
        return await InvoiceModel.findOne(query).lean()
    }

    static async findAndUpdateInvoice(query: FilterQuery<{ id: string; }>, input: IInvoice) {
        return await InvoiceModel.findOneAndUpdate(query, input, { new: true })
    }

    static createSuccessResponse(data: any, text: string) {
        return {
            status: "success",
            message: text,
            data: data,
        };
    }

    static createErrorResponse(data: any, text: string) {
        return {
            status: "success",
            error: text,
            data: data,
        };
    }
}
