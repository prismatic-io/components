import { input } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { cleanStringInput } from "../../utils";
import { includeLineItems } from "./shared";

const invoiceKey = input({
  label: "Invoice Key",
  type: "string",
  required: true,
  example: "M2dVbCt4RHk",
  placeholder: "M2dVbCt4RHk",
  comments: "The Invoice key to get the Invoice for.",
  clean: cleanStringInput,
  dataSource: "selectInvoice",
});

export default {
  connection,
  invoiceKey,
  includeLineItems,
};
