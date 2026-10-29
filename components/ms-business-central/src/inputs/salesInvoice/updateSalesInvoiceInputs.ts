import { input, util } from "@prismatic-io/spectral";

export const salesInvoiceId = input({
  label: "Sales Invoice ID",
  comments: "The unique identifier of the sales invoice object.",
  type: "string",
  required: true,
  dataSource: "listSalesInvoices",
  clean: util.types.toString,
  placeholder: "0ba5738a-44e3-ea11-bb43-000d3a2feca1",
  example: "0ba5738a-44e3-ea11-bb43-000d3a2feca1",
});
