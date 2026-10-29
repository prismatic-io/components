import { input } from "@prismatic-io/spectral";
import { cleanCodeInput } from "../actionUtils";

export const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        DetailType: "SalesItemLineDetail",
        Amount: 100.0,
        Description: "Consulting Services",
        SalesItemLineDetail: {
          ItemRef: { value: "1" },
          Qty: 2,
          UnitPrice: 50.0,
        },
      },
    ],
    null,
    2,
  ),
  comments:
    'A JSON array of line item objects. Each line item requires a DetailType, Amount, and a detail object matching the type. The most common type is "SalesItemLineDetail" with ItemRef (value is the item ID), Qty, and UnitPrice. Add multiple objects to the array for multiple line items. See [QuickBooks documentation](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/salesreceipt#create-a-salesreceipt) for all supported line types.',
  clean: cleanCodeInput,
});

export const customFields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        DefinitionId: "1",
        Type: "StringType",
        Name: "Crew #",
      },
    ],
    null,
    2,
  ),
  comments:
    'A JSON array of custom field objects. Each object requires DefinitionId (the custom field ID), Type (e.g., "StringType"), and Name (the field label). Leave empty if no custom fields are needed.',
  clean: cleanCodeInput,
});

export const nonInventoryItemData = input({
  label: "Non-Inventory Item Data",
  comments: "The attributes of the non-inventory item to create",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      Type: "NonInventory",
      ExpenseAccountRef: {
        name: "Cost of Goods Sold",
        value: "80",
      },
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});
