import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _debugRequest, ...rawHttpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...rawHttpInputs,
  url: {
    ...rawHttpInputs.url,
    comments:
      "Input the path only (/Accounts), The base URL is already included (https://api.xero.com/api.xro/2.0). For example, to connect to https://api.xero.com/api.xro/2.0/Accounts, only /Accounts is entered in this field.",
    example: "/Accounts",
  },
};
