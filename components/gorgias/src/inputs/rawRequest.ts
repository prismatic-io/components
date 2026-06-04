import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { sharedInputs } from "./shared";

const BASE_URL = "https://<YOUR_DOMAIN>.gorgias.com/api";

export const rawRequestInputs = {
  connection: sharedInputs.connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/tickets), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/tickets, only /tickets is entered in this field.`,
    example: "/tickets",
    placeholder: "/tickets",
  },
};
