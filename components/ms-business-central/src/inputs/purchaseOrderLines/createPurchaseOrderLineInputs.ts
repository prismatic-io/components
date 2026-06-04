import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../utils";
import { companyId } from "../accounts/getAccountsInputs";
import { additionalProperties, connectionInput } from "../general";

const documentId = input({
  label: "Document ID",
  required: true,
  comments: "The ID of the parent purchase order line.",
  type: "string",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter document ID",
  dataSource: "selectPurchaseOrder",
  clean: cleanStringInput,
});

const itemId = input({
  label: "Item ID",
  required: false,
  comments: "The ID of the item in the purchase order line.",
  type: "string",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter item ID",
  dataSource: "listItems",
  clean: cleanStringInput,
});

const accountId = input({
  label: "Account ID",
  required: false,
  comments: "The id of the account that the purchase order line is related to.",
  type: "string",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter account ID",
  dataSource: "selectAccount",
  clean: cleanStringInput,
});

const lineType = input({
  label: "Line Type",
  required: false,
  comments: "The type of the purchase order line.",
  type: "string",
  example: "Item",
  placeholder: "Select line type",
  model: [
    {
      label: "Comment",
      value: "Comment",
    },
    {
      label: "Account",
      value: "Account",
    },
    {
      label: "Item",
      value: "Item",
    },
    {
      label: "Resource Value",
      value: "Resource Value",
    },
    {
      label: "Fixed Asset",
      value: "Fixed Asset",
    },
    {
      label: "Charge",
      value: "Charge",
    },
  ],
  clean: cleanStringInput,
});

const lineObjectNumber = input({
  label: "Line Object Number",
  required: false,
  comments: "The number of the object (account or item) of the purchase order line.",
  type: "string",
  example: "1996-S",
  placeholder: "Enter line object number",
  clean: cleanStringInput,
});

const description = input({
  label: "Description",
  required: false,
  comments: "Specifies the description of the purchase order line.",
  type: "string",
  example: "ATLANTA Whiteboard, base",
  placeholder: "Enter description",
  clean: cleanStringInput,
});

const quantity = input({
  label: "Quantity",
  required: false,
  comments: "The quantity of the item in the purchase order line.",
  type: "string",
  example: "12",
  placeholder: "Enter quantity",
  clean: cleanNumberInput,
});

const directUnitCost = input({
  label: "Direct Unit Cost",
  required: false,
  comments: "The direct cost per unit.",
  type: "string",
  example: "1397.3",
  placeholder: "Enter direct unit cost",
  clean: cleanNumberInput,
});
export const createPurchaseOrderLineInputs = {
  connection: connectionInput,
  companyId,
  documentId,
  itemId,
  accountId,
  lineType,
  lineObjectNumber,
  description,
  quantity,
  directUnitCost,
  additionalProperties: input({
    ...additionalProperties,
    example: JSON.stringify(
      {
        itemVariantId: "00000000-0000-0000-0000-000000000000",
        locationId: "00000000-0000-0000-0000-000000000000",
      },
      null,
      2,
    ),
  }),
};
