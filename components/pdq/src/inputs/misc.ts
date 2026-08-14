import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";
const { debugRequest, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments:
      "Input the path only (/deployments), The base URL is already included (https://app.pdq.com/v1/api). For example, to connect to https://app.pdq.com/v1/api/deployments, only /deployments is entered in this field. e.g. /deployments",
    placeholder: "/deployments",
    example: "/deployments",
  },
};
