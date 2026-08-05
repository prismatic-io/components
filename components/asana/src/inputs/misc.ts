import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments:
      "Input the path only (/goals), The base URL is already included (https://app.asana.com/api/1.0). For example, to connect to https://app.asana.com/api/1.0/goals, only /goals is entered in this field.",
    example: "/goals",
  },
};
