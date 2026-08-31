import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only, such as `/2.0/folders`. The base URL `https://api.box.com` is already included. For example, to call `https://api.box.com/2.0/folders`, enter `/2.0/folders` in this field.",
    example: "/2.0/folders",
  },
};
