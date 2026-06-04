import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  filters,
  sort,
  start,
  max,
  nested,
  additionalFields,
  customerId,
  routingNumber,
  accountNumber,
} from "./shared";
import { cleanArrayCodeInput } from "../util";
const listCustomerComments =
  " See [Bill.com API documentation](https://developer.bill.com/reference/listcustomers) for more information.";

const listCustomerBankAccountComments =
  " See [Bill.com API documentation](https://developer.bill.com/v2/reference/ar-customermgmt-listcustomerbankaccount) for more information.";

const customerAdditionalFields = {
  isActive: "1",
  shortName: "John",
  parentCustomerId: "12345",
  companyName: "A company",
  contactFirstName: "John",
  contactLastName: "Doe",
};

const customerBankAccountAdditionalFields = {
  isActive: "string",
  nickname: "string",
  isLockedByOrg: true,
  isSavings: "string",
  isPersonalAcct: "string",
  isWrittenAuth: true,
  isPrivate: true,
  phone: "string",
  cpUserId: "string",
};

export const listCustomerInputs = {
  connection,
  start,
  max,
  sort: input({ ...sort, comments: `${sort.comments}${listCustomerComments}` }),
  filters: input({
    ...filters,
    comments: `${filters.comments}${listCustomerComments}`,
  }),
  nested,
};

const customerName = input({
  label: "Customer Name",
  type: "string",
  example: "John",
  placeholder: "Enter customer name",
  required: true,
  comments: "The name of the customer.",
  clean: util.types.toString,
});

export const createCustomerInputs = {
  connection,
  customerName,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(customerAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createcustomer for more information.`,
  }),
};

const customersCreateBulk = input({
  label: "Customers to Create",
  type: "code",
  language: "json",
  comments:
    "An array of customer objects to create. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ar-customermgmt-bulkcreatecustomer) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "Customer",
          isActive: "1",
          name: "John",
          companyName: "A Company",
          contactFirstName: "John",
          contactLastName: "Doe",
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Customers to Create"),
});

export const bulkCreateCustomersInputs = {
  connection,
  customersCreateBulk,
};

export const getCustomerInputs = {
  connection,
  customerId,
};

export const updateCustomerInputs = {
  connection,
  customerId,
  customerName: input({ ...customerName, required: false }),
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(customerAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/updatecustomer for more information.`,
  }),
};

const customersUpdateBulk = input({
  label: "Customers to Update",
  type: "code",
  language: "json",
  comments:
    "An array of customer objects to update. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ar-customermgmt-bulkupdatecustomer) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          id: "0cu...",
          entity: "Customer",
          isActive: "1",
          name: "John",
          companyName: "A Company",
          contactFirstName: "John",
          contactLastName: "Doe",
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Customers to Update"),
});

export const bulkUpdateCustomersInputs = {
  connection,
  customersUpdateBulk,
};

export const deleteCustomerInputs = {
  connection,
  customerId,
};

export const listCustomerBankAccountInputs = {
  connection,
  start,
  max,
  filters: input({
    ...filters,
    comments: `${filters.comments}${listCustomerBankAccountComments}`,
  }),
  sort: input({
    ...sort,
    comments: `${sort.comments}${listCustomerBankAccountComments}`,
  }),
  nested,
};

const customerBankAccountId = input({
  label: "Customer Bank Account ID",
  type: "string",
  example: "cba...",
  placeholder: "Enter customer bank account ID",
  required: true,
  comments: "ID of the customer bank account.",
  clean: util.types.toString,
});

export const getCustomerBankAccountInputs = {
  connection,
  customerBankAccountId,
};

const nameOnAccount = input({
  label: "Name on Account",
  type: "string",
  example: "Account Name",
  placeholder: "Enter name on account",
  required: true,
  comments: "Customer bank account name.",
  clean: util.types.toString,
});

const agreedWithTOS = input({
  label: "Agreed with TOS",
  type: "boolean",
  default: "true",
  comments:
    "When true, indicates agreement with the BILL Payment Terms Of Service.",
  clean: util.types.toBool,
});

export const createCustomerBankAccountInputs = {
  connection,
  customerId,
  nameOnAccount,
  routingNumber: input({
    ...routingNumber,
    comments: "The customer bank routing number.",
  }),
  accountNumber: input({
    ...accountNumber,
    comments: "The customer bank account number.",
  }),
  agreedWithTOS,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(customerBankAccountAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createcustomerbankaccount for more information.`,
  }),
};
