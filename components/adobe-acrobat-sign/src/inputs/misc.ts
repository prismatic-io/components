import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _debugRequest, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    placeholder: "Enter API path",
    example: "/agreements",
    comments:
      "Input the path only (/agreements). The base URL is already included. For example, in order to send an agreements request, only /agreements is entered in this field.",
  },
};
