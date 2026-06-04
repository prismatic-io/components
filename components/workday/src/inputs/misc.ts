import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { SERVICES } from "../constants";
import { connection } from "./shared";

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;

export const rawRequestInputs: {
  connection: typeof connection;
} & Omit<typeof httpClientInputs, "debugRequest"> = {
  connection,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments: `Input the path only (${SERVICES.accountsPayable}/supplierInvoiceRequests), The base URL is already included (https://<domain>/ccx). For example, to connect to https://<domain>/ccx${SERVICES.accountsPayable}/supplierInvoiceRequests, only ${SERVICES.accountsPayable}/supplierInvoiceRequests is entered in this field.`,
    example: `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
  },
};
