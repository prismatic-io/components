import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl } from "../client";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments: `Input the path only (/octocat), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/octocat, only /octocat is entered in this field.`,
    example: "/octocat",
  },
};
