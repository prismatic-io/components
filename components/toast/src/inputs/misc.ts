import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./shared";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/partners/v1/restaurants), The base URL is already included (https://toast-api-server). For example, to connect to https://toast-api-server/partners/v1/restaurants, only /partners/v1/restaurants is entered in this field.`,
    example: "/partners/v1/restaurants",
    placeholder: "/partners/v1/restaurants",
  },
};
