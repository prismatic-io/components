import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "The path to append to the base URL. Enter the path only (for example, /v1/documents/{documentId}); the base URL (https://docs.googleapis.com) is added automatically.",
    example: "/v1/documents/{documentId}",
  },
};
