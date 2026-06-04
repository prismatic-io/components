import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BaseUrl } from "../util";
import { connection } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments: `Input the path only (e.g., /v1/posts/list). The base URL is already included (${BaseUrl.Root}). For example, to connect to ${BaseUrl.Root}/v1/posts/list, only /v1/posts/list is entered in this field.`,
    example: "/v1/posts/list",
  },
};
