import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../constants";
import { oneDriveConnection } from "./common";

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: oneDriveConnection,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments: `Input the path only (/me/drive), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/me/drive, only /me/drive is entered in this field.`,
    example: "/me/drive",
  },
};
