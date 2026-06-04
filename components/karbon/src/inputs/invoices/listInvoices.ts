import { input } from "@prismatic-io/spectral";
import { $orderby, connection } from "../shared";
import { includeLineItems } from "./shared";

export default {
  connection,
  includeLineItems,
  $orderby: input({
    ...$orderby,
    model: [
      { value: "InvoiceDate", label: "Invoice Date" },
      { value: "InvoiceDate asc", label: "Invoice Date asc" },
      { value: "InvoiceDate desc", label: "Invoice Date desc" },
    ],
  }),
};
