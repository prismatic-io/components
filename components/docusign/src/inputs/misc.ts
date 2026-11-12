import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { connection } from "./common";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only, for example /ACCOUNT_ID/folders. The base URL (the account's DocuSign base URI followed by /restapi/v2.1/accounts) is already included.",
    example: "/ACCOUNT_ID/folders",
  },
};
