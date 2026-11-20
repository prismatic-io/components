import { input } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { SERVICE_VERSIONS } from "../constants";
import { cleanStringInput } from "../util";
import { connection, reportUrl } from "./common";

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;

export const rawRequestInputs: {
  connection: typeof connection;
} & Omit<typeof httpClientInputs, "debugRequest"> = {
  connection,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments: `Input the path only, starting with /api and including the tenant name: /api/{service}/{version}/{tenant}/{resource}. The base URL is already included (https://{host}/ccx). For example, to connect to https://{host}/ccx/api/${SERVICE_VERSIONS.accountsPayable}/acme/supplierInvoiceRequests for the tenant acme, only /api/${SERVICE_VERSIONS.accountsPayable}/acme/supplierInvoiceRequests is entered in this field.`,
    example: `/api/${SERVICE_VERSIONS.accountsPayable}/acme/supplierInvoiceRequests`,
  },
};

const verificationReportUrl = input({
  ...reportUrl,
  comments:
    "Optional report URL to read after authenticating, to confirm the account can access it. Leave blank to check authentication only. The whole report is read, so use a small one.",
  required: false,
  clean: cleanStringInput,
});

export const verifyConnectionInputs = {
  connection,
  reportUrl: verificationReportUrl,
};
