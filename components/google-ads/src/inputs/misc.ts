import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../constants";
import { connectionInput } from "./common";
const { debugRequest: _, ...baseRawRequestInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...baseRawRequestInputs,
  url: {
    ...baseRawRequestInputs.url,
    example: `/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`,
    comments: `Input the path only (/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers), The base URL is already included (${GOOGLE_ADS_BASE_URL}). For example, to connect to ${GOOGLE_ADS_BASE_URL}/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers, only /${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers is entered in this field. Note: When using the Raw Request action, the API version must be specified in the path (e.g., /${GOOGLE_ADS_API_VERSION}/) to override the connection default.`,
    default: `/${GOOGLE_ADS_API_VERSION}/`,
  },
};
