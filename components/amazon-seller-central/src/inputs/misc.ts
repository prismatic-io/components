import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/orders/v0/orders), The base URL is already included (https://sellingpartnerapi-na.amazon.com/). For example, to connect to https://sellingpartnerapi-na.amazon.com/orders/v0/orders, only /orders/v0/orders is entered in this field.",
    example: "/orders/v0/orders",
  },
};
