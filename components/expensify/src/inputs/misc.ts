import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  connectionInput,
  ...httpRequestInputs,
  url: {
    ...httpRequestInputs.url,
    comments:
      "This input is not required as the Expensify API is a single endpoint.",
    example: "",
    required: false,
  },
};
