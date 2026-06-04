import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput } from "../actionUtils";

export const invoiceId = input({
  label: "Invoice ID",
  placeholder: "Enter invoice ID",
  type: "string",
  required: true,
  example: "259",
  comments: "The ID of the invoice.",
  dataSource: "selectInvoice",
  clean: util.types.toString,
});

export const data = input({
  label: "Data",
  placeholder: "Enter JSON data",
  comments: "A string of JSON data that represents a QuickBooks invoice.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      Line: [
        {
          DetailType: "SalesItemLineDetail",
          Amount: 100.0,
          SalesItemLineDetail: {
            ItemRef: {
              name: "Services",
              value: "1",
            },
          },
        },
      ],
      CustomerRef: {
        value: "1",
      },
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});
