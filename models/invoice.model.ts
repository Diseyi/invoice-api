
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true }
});

const itemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
});

const invoiceSchema = new Schema(
    {
        id: { type: String, required: true },
        paymentDue: { type: String, required: true },
        paymentTerms: { type: Number, required: true },
        clientName: { type: String, required: true },
        clientEmail: { type: String, required: true },
        status: { type: String, required: true },
        total: { type: Number, required: true },
        senderAddress: { type: addressSchema, required: true },
        clientAddress: { type: addressSchema, required: true },
        items: { type: [itemSchema], required: true }
    }, {
        timestamps: true,
    }
);

const InvoiceModel = model("Invoice", invoiceSchema);
export default InvoiceModel