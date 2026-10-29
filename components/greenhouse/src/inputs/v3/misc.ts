import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { V3_BASE_URL } from "../../constants";
import { connectionInput } from "./common";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequestV3Inputs = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments: `Input the path only (/jobs), The base URL is already included (${V3_BASE_URL}). For example, to connect to ${V3_BASE_URL}/jobs, only /jobs is entered in this field.`,
    example: "/jobs",
  },
};
