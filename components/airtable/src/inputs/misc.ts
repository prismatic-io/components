import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "The request path only (e.g., `/v0/meta/bases/{BASE_ID}/tables`). The base URL [https://api.airtable.com](https://api.airtable.com) is already included. For example, to call `https://api.airtable.com/v0/meta/bases/{BASE_ID}/tables`, enter only `/v0/meta/bases/{BASE_ID}/tables` in this field.",
    example: "/v0/meta/bases/{BASE_ID}/tables",
  },
};
