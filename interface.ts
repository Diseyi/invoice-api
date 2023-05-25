

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
}

export interface IAddress {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface IItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
};

export interface IInvoice {
    id: string
    paymentDue: string;
    paymentTerms: string;
    clientName: string;
    clientEmail: string;
    status: string;
    total: number;
    senderAddress: IAddress;
    clientAddress: IAddress;
    items: IItem;
}