import { body } from "express-validator";


const validateAddress = (value: { street: any; city: any; postCode: any; country: any; }) => {
    if (!value.street) {
      throw new Error('Street is required');
    }
    if (!value.city) {
      throw new Error('City is required');
    }
    if (!value.postCode) {
      throw new Error('Post code is required');
    }
    if (!value.country) {
      throw new Error('Country is required');
    }
    return true;
  };

const validateItem = (value: { name: any; quantity: any; price: any; total: any; }) => {
    if (!value.name) {
      throw new Error('Name is required');
    }
    if (!value.quantity) {
      throw new Error('Quantity is required');
    }
    if (!value.price) {
      throw new Error('Price code is required');
    }
    if (!value.total) {
      throw new Error('Total is required');
    }
    return true;
  };
  
  export const InvoiceSchema = [
    body('id').notEmpty().withMessage('ID is required'),
    body('paymentDue').notEmpty().withMessage('Payment due is required'),
    body('paymentTerms').notEmpty().withMessage('Payment terms is required'),
    body('clientName').notEmpty().withMessage('Client name is required'),
    body('clientEmail').notEmpty().withMessage('Client email is required'),
    body('status').notEmpty().withMessage('Status is required'),
    body('total').notEmpty().withMessage('Total is required'),
    body('senderAddress').custom(validateAddress),
    body('clientAddress').custom(validateAddress),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*').custom(validateItem),
  ];
