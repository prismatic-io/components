import { input, util } from "@prismatic-io/spectral";
import { LIST_DRAFT_ORDERS_DATASOURCE_REFERENCE } from "../../constants";
import {
  cleanArrayCodeInput,
  cleanDraftOrderId,
  cleanStringInput,
} from "../../util";
import {
  additionalFields,
  customerIdGql,
  getAlldata,
  pagination,
  shopifyConnection,
  tags,
  taxExempt,
} from "./common";

const draftOrderId = input({
  label: "Draft Order ID",
  type: "string",
  required: true,
  example: "916042021234 or gid://shopify/DraftOrder/916042021234",
  placeholder: "Enter draft order ID",
  comments: "The unique identifier for the draft order.",
  clean: cleanDraftOrderId,
  dataSource: LIST_DRAFT_ORDERS_DATASOURCE_REFERENCE,
});

const lineItems = input({
  label: "Line Items",
  type: "code",
  required: true,
  language: "json",
  example: JSON.stringify(
    [
      {
        title: "Custom product",
        originalUnitPrice: 14.99,
        quantity: 5,
        appliedDiscount: {
          description: "wholesale",
          value: 5,
          amount: 3.74,
          valueType: "PERCENTAGE",
          title: "Fancy",
        },
        weight: {
          value: 1,
          unit: "KILOGRAMS",
        },
        customAttributes: [
          {
            key: "color",
            value: "Gold",
          },
          {
            key: "material",
            value: "Plastic",
          },
        ],
      },
    ],
    null,
    2,
  ),

  comments: "Provide a JSON array containing line item objects.",
  clean: (value) => cleanArrayCodeInput(value, "Line items"),
});

const useCustomerAddress = input({
  label: "Use Customer Address",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "This flag determines if the order will use the customers default address.",
  clean: util.types.toBool,
});

const note = input({
  label: "Note",
  type: "string",
  required: false,
  example: "Test draft order",
  placeholder: "Enter note",
  comments: "A note on the draft order.",
  clean: cleanStringInput,
});

export const listDraftOrdersInputs = {
  shopifyConnection,
  getAlldata,
  pagination,
};

export const getDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};

export const deleteDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};

export const createDraftOrderInputs = {
  shopifyConnection,
  customerIdGql,
  lineItems,
  useCustomerAddress,
  note,
  taxExempt: input({
    ...taxExempt,
    required: false,
    default: "false",
    comments: "Whether or not taxes are exempt for the draft order.",
  }),
  tags: input({
    ...tags,
    comments: "Provide a list of tags for the draft order.",
  }),
  additionalFields,
};

export const completeDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};

export const countDraftOrdersInputs = {
  shopifyConnection,
};
