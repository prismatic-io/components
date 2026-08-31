import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/products), The base URL is already included (https://api.stripe.com/v1). For example, to connect to https://api.stripe.com/v1/products, only /products is entered in this field.",
    example: "/products",
  },
};
