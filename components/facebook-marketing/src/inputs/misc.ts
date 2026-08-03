import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { myConnectionField, version } from "./common";
const { debugRequest, ...restHttpClientInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: myConnectionField,
  version,
  ...restHttpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/me/adaccounts), The base URL is already included (https://graph.facebook.com/v<INPUT_VERSION>.0). For example, to connect to https://graph.facebook.com/v<INPUT_VERSION>.0/me/adaccounts, only /me/adaccounts is entered in this field.",
    example: "/me/adaccounts",
  },
};
