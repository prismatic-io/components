import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput, cleanBooleanInput } from "../util";
import {
  additionalFields,
  connection,
  filters,
  max,
  nested,
  sort,
  start,
  vendorId,
} from "./shared";
const listBillsComments =
  " See [Bill.com API documentation](https://developer.bill.com/reference/listbills) for more information.";

const invoiceNumber = input({
  label: "Invoice Number",
  type: "string",
  example: "01",
  placeholder: "Enter invoice number",
  required: true,
  comments:
    "User-generated invoice number. This value can be your chosen number scheme or bill due date.",
  clean: util.types.toString,
});

const invoiceDate = input({
  label: "Invoice Date",
  type: "string",
  example: "2021-01-01",
  placeholder: "Enter invoice date",
  required: true,
  comments:
    "Date when the bill is sent. This value is in the YYYY-MM-DD format.",
  clean: util.types.toString,
});

const dueDate = input({
  label: "Due Date",
  type: "string",
  example: "2021-01-01",
  placeholder: "Enter due date",
  required: true,
  comments: "Date when the bill is due. The value is in the YYYY-MM-DD format.",
  clean: util.types.toString,
});

const billLineItems = input({
  label: "Bill Line Items",
  type: "code",
  language: "json",
  comments:
    "An array of bill line items. See [Bill.com API documentation](https://developer.bill.com/reference/createbill) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        entity: "BillLineItem",
        amount: 0,
        chartOfAccountId: "string",
        departmentId: "string",
        locationId: "string",
        jobId: "string",
        customerId: "string",
        jobBillable: true,
        description: "string",
        lineType: "string",
        itemId: "string",
        quantity: 0,
        unitPrice: 0,
        employeeId: "string",
        actgClassId: "string",
        purchaseOrderBillLinkId: "string",
        unitOfMeasureId: "string",
        lineOrder: 0,
        cdFieldId1: "string",
        cdFieldId2: "string",
        cdFieldId3: "string",
        cdFieldId4: "string",
        cdFieldId5: "string",
        cdFieldId6: "string",
        useSmartApprovers: true,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Bill Line Items"),
});

const allowDuplicateInvNum = input({
  label: "Allow Duplicate Invoice Number",
  type: "boolean",
  comments: "When true, allows duplicate invoice numbers.",
  default: "false",
  clean: util.types.toBool,
});

const createBillAdditionalFields = {
  entity: "Bill",
  isActive: "string",
  glPostingDate: "string",
  exchangeRate: 0,
  description: "string",
  poNumber: "string",
  payFromBankAccountId: "string",
  payFromChartOfAccountId: "string",
  paymentTermId: "string",
  hasAutoPay: true,
  eBillCreated: true,
  invoiceProductId: "string",
  chartOfAccountId: "string",
  departmentId: "string",
  locationId: "string",
  actgClassId: "string",
  source: "string",
  useBillDesc: true,
  defaultInvoiceNumber: true,
  isAutoSaved: true,
  billTemplateId: "string",
};

export const createBillInputs = {
  connection,
  vendorId,
  invoiceNumber,
  invoiceDate,
  dueDate,
  billLineItems,
  allowDuplicateInvNum,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(createBillAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createbill for more information.`,
  }),
};

const billsCreateBulk = input({
  label: "Bills to Create",
  type: "code",
  language: "json",
  comments:
    "An array of bill objects to create. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendortransactions-bulkcreatebill) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "Bill",
          isActive: "string",
          vendorId: "string",
          invoiceNumber: "string",
          invoiceDate: "string",
          dueDate: "string",
          glPostingDate: "string",
          exchangeRate: 0,
          description: "string",
          poNumber: "string",
          payFromBankAccountId: "string",
          payFromChartOfAccountId: "string",
          paymentTermId: "string",
          hasAutoPay: true,
          eBillCreated: true,
          invoiceProductId: "string",
          chartOfAccountId: "string",
          departmentId: "string",
          locationId: "string",
          actgClassId: "string",
          source: "string",
          useBillDesc: true,
          defaultInvoiceNumber: true,
          isAutoSaved: true,
          billTemplateId: "string",
          billLineItems: [
            {
              entity: "BillLineItem",
              amount: 0,
              chartOfAccountId: "string",
              departmentId: "string",
              locationId: "string",
              jobId: "string",
              customerId: "string",
              jobBillable: true,
              description: "string",
              lineType: "string",
              itemId: "string",
              quantity: 0,
              unitPrice: 0,
              employeeId: "string",
              actgClassId: "string",
              purchaseOrderBillLinkId: "string",
              unitOfMeasureId: "string",
              lineOrder: 0,
              cdFieldId1: "string",
              cdFieldId2: "string",
              cdFieldId3: "string",
              cdFieldId4: "string",
              cdFieldId5: "string",
              cdFieldId6: "string",
              useSmartApprovers: true,
            },
          ],
        },
        allowDuplicateInvNum: true,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Bills to Create"),
});

export const bulkCreateBillsInputs = {
  connection,
  billsCreateBulk,
};

const billId = input({
  label: "Bill ID",
  type: "string",
  example: "00n...",
  placeholder: "Enter bill ID",
  required: true,
  comments: "The unique identifier for the bill.",
  clean: util.types.toString,
});

export const getBillInputs = {
  connection,
  billId,
};

export const listBillsInputs = {
  connection,
  start,
  max,
  filters: input({
    ...filters,
    comments: `${filters.comments}${listBillsComments}`,
  }),
  sort: input({
    ...sort,
    comments: `${sort.comments}${listBillsComments}`,
  }),
  nested,
};

const allowDuplicateInvNumOptional = input({
  label: "Allow Duplicate Invoice Number",
  type: "string",
  comments: "Allow duplicate invoice numbers.",
  required: false,
  default: undefined,
  placeholder: "Select option",
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});

export const updateBillInputs = {
  connection,
  billId,
  vendorId,
  invoiceNumber,
  invoiceDate,
  dueDate,
  billLineItems: input({
    ...billLineItems,
    comments:
      "An array of bill line items. See [Bill.com API documentation](https://developer.bill.com/reference/updatebill) for more information.",
  }),
  allowDuplicateInvNum: allowDuplicateInvNumOptional,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(createBillAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/updatebill for more information.`,
  }),
};

const billsUpdateBulk = input({
  label: "Bills to Update",
  type: "code",
  language: "json",
  comments:
    "An array of bill objects to update. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendortransactions-bulkupdatebill) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          id: "00n...",
          entity: "Bill",
          isActive: "string",
          vendorId: "string",
          invoiceNumber: "string",
          invoiceDate: "string",
          dueDate: "string",
          glPostingDate: "string",
          exchangeRate: 0,
          description: "string",
          poNumber: "string",
          payFromBankAccountId: "string",
          payFromChartOfAccountId: "string",
          paymentTermId: "string",
          hasAutoPay: true,
          eBillCreated: true,
          invoiceProductId: "string",
          chartOfAccountId: "string",
          departmentId: "string",
          locationId: "string",
          actgClassId: "string",
          source: "string",
          useBillDesc: true,
          defaultInvoiceNumber: true,
          isAutoSaved: true,
          billTemplateId: "string",
          billLineItems: [
            {
              entity: "BillLineItem",
              amount: 0,
              chartOfAccountId: "string",
              departmentId: "string",
              locationId: "string",
              jobId: "string",
              customerId: "string",
              jobBillable: true,
              description: "string",
              lineType: "string",
              itemId: "string",
              quantity: 0,
              unitPrice: 0,
              employeeId: "string",
              actgClassId: "string",
              purchaseOrderBillLinkId: "string",
              unitOfMeasureId: "string",
              lineOrder: 0,
              cdFieldId1: "string",
              cdFieldId2: "string",
              cdFieldId3: "string",
              cdFieldId4: "string",
              cdFieldId5: "string",
              cdFieldId6: "string",
              useSmartApprovers: true,
            },
          ],
        },
        allowDuplicateInvNum: true,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Bills to Update"),
});

export const bulkUpdateBillsInputs = {
  connection,
  billsUpdateBulk,
};

export const deleteBillInputs = {
  connection,
  billId,
};
