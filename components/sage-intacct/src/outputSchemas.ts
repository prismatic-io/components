const xmlControlSchema = {
  type: "object" as const,
  properties: {
    status: { type: "array" as const, items: { type: "string" as const } },
    senderid: { type: "array" as const, items: { type: "string" as const } },
    controlid: { type: "array" as const, items: { type: "string" as const } },
    uniqueid: { type: "array" as const, items: { type: "string" as const } },
    dtdversion: { type: "array" as const, items: { type: "string" as const } },
  },
};
const xmlAuthenticationSchema = {
  type: "object" as const,
  properties: {
    status: { type: "array" as const, items: { type: "string" as const } },
    userid: { type: "array" as const, items: { type: "string" as const } },
    companyid: { type: "array" as const, items: { type: "string" as const } },
    locationid: { type: "array" as const, items: { type: "string" as const } },
    sessiontimestamp: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    sessiontimeout: {
      type: "array" as const,
      items: { type: "string" as const },
    },
  },
};
const xmlResultWithKeySchema = {
  type: "object" as const,
  properties: {
    status: { type: "array" as const, items: { type: "string" as const } },
    function: { type: "array" as const, items: { type: "string" as const } },
    controlid: { type: "array" as const, items: { type: "string" as const } },
    key: { type: "array" as const, items: { type: "string" as const } },
  },
};
const xmlResultNoKeySchema = {
  type: "object" as const,
  properties: {
    status: { type: "array" as const, items: { type: "string" as const } },
    function: { type: "array" as const, items: { type: "string" as const } },
    controlid: { type: "array" as const, items: { type: "string" as const } },
  },
};
const xmlResultWithDataSchema = {
  type: "object" as const,
  properties: {
    status: { type: "array" as const, items: { type: "string" as const } },
    function: { type: "array" as const, items: { type: "string" as const } },
    controlid: { type: "array" as const, items: { type: "string" as const } },
    data: {
      type: "array" as const,
      items: {
        type: "object" as const,
        additionalProperties: true,
      },
    },
  },
};
const xmlEnvelopeWithKeySchema = {
  type: "object" as const,
  properties: {
    response: {
      type: "object" as const,
      properties: {
        control: {
          type: "array" as const,
          items: xmlControlSchema,
        },
        operation: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              authentication: {
                type: "array" as const,
                items: xmlAuthenticationSchema,
              },
              result: {
                type: "array" as const,
                items: xmlResultWithKeySchema,
              },
            },
          },
        },
      },
    },
  },
};
const xmlEnvelopeNoKeySchema = {
  type: "object" as const,
  properties: {
    response: {
      type: "object" as const,
      properties: {
        control: {
          type: "array" as const,
          items: xmlControlSchema,
        },
        operation: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              authentication: {
                type: "array" as const,
                items: xmlAuthenticationSchema,
              },
              result: {
                type: "array" as const,
                items: xmlResultNoKeySchema,
              },
            },
          },
        },
      },
    },
  },
};
const xmlEnvelopeWithDataSchema = {
  type: "object" as const,
  properties: {
    response: {
      type: "object" as const,
      properties: {
        control: {
          type: "array" as const,
          items: xmlControlSchema,
        },
        operation: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              authentication: {
                type: "array" as const,
                items: xmlAuthenticationSchema,
              },
              result: {
                type: "array" as const,
                items: xmlResultWithDataSchema,
              },
            },
          },
        },
      },
    },
  },
};
const sdkReadEnvelopeSchema = {
  type: "object" as const,
  properties: {
    _status: { type: "string" as const },
    _functionName: { type: "string" as const },
    _controlId: { type: "string" as const },
    _listType: { type: "string" as const },
    _count: { type: "number" as const },
    _data: {
      type: "array" as const,
      items: { type: "object" as const, additionalProperties: true },
    },
  },
  required: [
    "_status",
    "_functionName",
    "_controlId",
    "_listType",
    "_count",
    "_data",
  ],
};
export const getCustomerOutputSchema = sdkReadEnvelopeSchema;
export const getVendorOutputSchema = sdkReadEnvelopeSchema;
export const getBillOutputSchema = sdkReadEnvelopeSchema;
export const getInvoiceOutputSchema = sdkReadEnvelopeSchema;
export const getContactOutputSchema = sdkReadEnvelopeSchema;
export const getApPaymentOutputSchema = sdkReadEnvelopeSchema;
export const getArPaymentOutputSchema = sdkReadEnvelopeSchema;
export const getARAdjustmentOutputSchema = sdkReadEnvelopeSchema;
export const getARAdjustmentLineOutputSchema = sdkReadEnvelopeSchema;
export const getARAdvanceOutputSchema = sdkReadEnvelopeSchema;
export const getProjectOutputSchema = {
  type: "object" as const,
  additionalProperties: true,
};
export const createContactOutputSchema = sdkReadEnvelopeSchema;
export const createCustomerOutputSchema = sdkReadEnvelopeSchema;
export const createVendorOutputSchema = sdkReadEnvelopeSchema;
export const createARAdvanceOutputSchema = xmlEnvelopeWithKeySchema;
export const createInvoiceOutputSchema = xmlEnvelopeWithKeySchema;
export const createBillOutputSchema = xmlEnvelopeWithDataSchema;
export const createProjectOutputSchema = {
  type: "object" as const,
  properties: {
    RECORDNO: { type: "string" as const },
    PROJECTID: { type: "string" as const },
  },
};
export const updateVendorOutputSchema = sdkReadEnvelopeSchema;
export const updateARAdjustmentOutputSchema = xmlEnvelopeWithKeySchema;
export const updateARAdvanceOutputSchema = xmlEnvelopeWithKeySchema;
export const updateInvoiceOutputSchema = xmlEnvelopeWithKeySchema;
export const updateContactOutputSchema = {
  type: "object" as const,
  properties: {
    _controlId: { type: "string" as const },
    contactName: { type: "string" as const },
    addressLine1: { type: "string" as const },
    firstName: { type: "string" as const },
    lastName: { type: "string" as const },
    pagerNo: { type: "string" as const },
    taxable: { type: "boolean" as const },
  },
  additionalProperties: true,
};
export const updateCustomerOutputSchema = {
  type: "object" as const,
  properties: {
    _controlId: { type: "string" as const },
    customFields: { type: "array" as const, items: { type: "array" as const } },
    customerId: { type: "string" as const },
    customerName: { type: "string" as const },
    excludedFromContactList: { type: "boolean" as const },
  },
  additionalProperties: true,
};
export const updateProjectOutputSchema = {
  type: "object" as const,
  properties: {
    RECORDNO: { type: "string" as const },
    PROJECTID: { type: "string" as const },
  },
};
export const deleteObjectOutputSchema = xmlEnvelopeNoKeySchema;
export const queryAndListOutputSchema = {
  type: "array" as const,
  items: { type: "object" as const, additionalProperties: true },
};
