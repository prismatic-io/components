import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { cleanStringInput } from "../util";
import {
  additionalFields,
  companyId,
  connection,
  memo,
  paginationQueryStringInputs,
  params,
} from "./shared";

const supplierInvoiceRequestId = input({
  label: "Supplier Invoice Request ID",
  comments: "Identifies the supplier invoice request.",
  type: "string",
  placeholder: "Enter supplier invoice request ID",
  example: "",
  required: true,
  clean: util.types.toString,
  dataSource: "selectSupplierInvoiceRequest",
});


const postSupplierInvoiceRequestsAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.accountsPayable.slice(1)}/post-/supplierInvoiceRequests) for more information.`;

const postSupplierInvoiceRequestsAdditionalFieldsExample = JSON.stringify(
  {
    lines: [
      {
        unitCost: "482931938",
        internalMemo:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        worktags: [
          {
            id: "string",
            descriptor: "Lorem ipsum dolor sit ame",
          },
        ],
        itemDescription:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        splits: [
          {
            percent: "640",
            billable: true,
            memo: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
            quantity: "1219127822",
            amount: "1629252870",
            worktags: [
              {
                id: "string",
                descriptor: "Lorem ipsum dolor sit ame",
              },
            ],
            id: "string",
            descriptor: "Lorem ipsum dolor sit ame",
          },
        ],
        order:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        billable: true,
        splitBy: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        quantity: "884590584",
        extendedAmount: "594603050",
        spendCategory: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        unitOfMeasure: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        memo: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        serviceLine: true,
        item: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
        },
        id: "string",
        descriptor: "Lorem ipsum dolor sit ame",
      },
    ],
    statutoryInvoiceType: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    suppliersInvoiceNumber:
      "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    referenceNumber:
      "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    invoiceReceivedDate: "2024-06-08T07:00:00.000Z",
    freightAmount: "972111269",
    supplier: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    handlingCode: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    shipToAddress: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    invoiceDate: "2024-06-08T07:00:00.000Z",

    remitToConnection: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
  },
  null,
  2,
);

const currencyId = input({
  label: "Currency ID",
  comments: "Identifies the currency used for the invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter currency ID",
  clean: cleanStringInput,
});

const taxAmount = input({
  label: "Tax Amount",
  comments: "Total tax amount applied to the invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter tax amount",
  clean: cleanStringInput,
});

const requesterId = input({
  label: "Requester ID",
  comments: "Identifies the worker who requested the invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter requester ID",
  clean: cleanStringInput,
});

const controlTotalAmount = input({
  label: "Control Total Amount",
  comments: "Expected total amount used to validate invoice line totals.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter control total amount",
  clean: cleanStringInput,
});

const paymentTermsId = input({
  label: "Payment Terms ID",
  comments: "Identifies the payment terms that apply to the invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter payment terms ID",
  clean: cleanStringInput,
});

const referenceTypeId = input({
  label: "Reference Type ID",
  comments: "Identifies the reference type for the invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter reference type ID",
  clean: cleanStringInput,
});

const supplierInvoceId = input({
  label: "Supplier Invoice ID",
  comments: "Identifies the supplier invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter supplier invoice ID",
  clean: cleanStringInput,
});

const supplierInvoiceDescriptor = input({
  label: "Supplier Invoice Descriptor",
  comments: "Human-readable descriptor for the supplier invoice.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter supplier invoice descriptor",
  clean: cleanStringInput,
});


const fileLength = input({
  label: "File Length",
  comments: "Size of the attached file in bytes.",
  type: "string",
  placeholder: "Enter file length",
  example: "1307948067",
  required: false,
  clean: cleanStringInput,
});

const contentTypeId = input({
  label: "Content Type ID",
  comments: "Identifies the MIME content type of the attachment.",
  type: "string",
  placeholder: "Enter content type ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const fileName = input({
  label: "File Name",
  comments: "Display name of the attached file.",
  type: "string",
  placeholder: "Enter file name",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const supplierInvoiceRequestAttachmentDescriptor = input({
  label: "Supplier Invoice Request Attachment Descriptor",
  comments: "Human-readable descriptor for the attachment.",
  type: "string",
  placeholder: "Enter supplier invoice request attachment descriptor",
  example: "",
  required: false,
  clean: cleanStringInput,
});

const supplierInvoiceRequestAttachmentId = input({
  label: "Supplier Invoice Request Attachment ID",
  comments: "Identifies the attachment on the supplier invoice request.",
  type: "string",
  placeholder: "Enter supplier invoice request attachment ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});


const supplierInvoiceInstanceId = input({
  label: "Supplier Invoice Instance ID",
  comments: "Identifies the supplier invoice instance to submit for approval.",
  type: "string",
  required: true,
  example: "",
  placeholder: "Enter supplier invoice instance ID",
  clean: util.types.toString,
});

const supplierInvoiceInstanceDescriptor = input({
  label: "Supplier Invoice Instance Descriptor",
  comments:
    "Human-readable descriptor for the supplier invoice instance being submitted.",
  type: "string",
  required: true,
  example: "",
  placeholder: "Enter supplier invoice instance descriptor",
  clean: util.types.toString,
});

export const getSupplierInvoiceRequestAttachmentsInputs = {
  connection,
  supplierInvoiceRequestId,
  ...paginationQueryStringInputs,
};

export const getSupplierInvoiceRequestsByIdInputs = {
  connection,
  supplierInvoiceRequestId,
};

export const listSupplierInvoiceRequestsInputs = {
  connection,
  ...paginationQueryStringInputs,
  params: {
    ...params,
    comments: `${params.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.accountsPayable.slice(1)}/get-/supplierInvoiceRequests).`,
  },
};

export const postSupplierInvoiceRequestsInputs = {
  connection,
  currencyId,
  companyId,
  taxAmount,
  requesterId,
  controlTotalAmount,
  paymentTermsId,
  referenceTypeId,
  memo,
  supplierInvoceId,
  supplierInvoiceDescriptor,
  additionalFields: {
    ...additionalFields,
    example: postSupplierInvoiceRequestsAdditionalFieldsExample,
    comments: postSupplierInvoiceRequestsAdditionalFieldsComments,
  },
};

export const postSupplierInvoiceRequestsAttachmentsInputs = {
  connection,
  supplierInvoiceRequestId,
  fileLength,
  contentTypeId,
  fileName,
  supplierInvoiceRequestAttachmentDescriptor,
  supplierInvoiceRequestAttachmentId,
};

export const submitSupplierInvoiceRequestInputs = {
  connection,
  supplierInvoiceRequestId,
  supplierInvoiceInstanceId,
  supplierInvoiceInstanceDescriptor,
};
