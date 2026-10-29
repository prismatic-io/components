import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { apiVersion, connectionInput, returnHeaders } from "../common";

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/users/current.json), The base URL is already included (https://YOUR-DOMAIN.myshopify.com/admin/api/API-VERSION). For example, to connect to https://YOUR-DOMAIN.myshopify.com/admin/api/API-VERSION/users/current.json, only /users/current.json is entered in this field.",
    example: "/users/current.json",
  },
  apiVersion,
  returnHeaders,
};
