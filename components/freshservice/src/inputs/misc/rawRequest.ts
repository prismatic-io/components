import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../common";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `The path to append to the base URL. The base URL (https://<domain>.freshservice.com/api/v2) is already included. For example, to reach https://<domain>.freshservice.com/api/v2/problems, enter /problems.`,
    example: "/problems",
    placeholder: "/problems",
  },
};
