import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { apiVersionInput, connectionInput } from "./common";

const { debugRequest: _, ...rest } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  apiVersion: apiVersionInput,
  ...rest,
  url: {
    ...rest.url,
    comments:
      "Input the path only (/provision), The base URL is already included (https://api.gusto.com/v1). For example, to connect to https://api.gusto.com/v1/provision, only /provision is entered in this field.",
    example: "/provision",
  },
};
