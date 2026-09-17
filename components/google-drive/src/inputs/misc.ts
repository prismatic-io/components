import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection, fields } from "./common";
const { debugRequest: _, ...httpRawRequestInputs } = httpClientInputs;
export const emptyTrashInputs = { connection };
export const getAboutInputs = { connection, fields };
export const getCurrentUserInputs = { connection };
export const rawRequestInputs = {
  connection,
  ...httpRawRequestInputs,
  url: {
    ...httpRawRequestInputs.url,
    comments:
      "Input the path only (/files), The base URL is already included (https://www.googleapis.com/drive/v3). For example, to connect to https://www.googleapis.com/drive/v3/files, only /files is entered in this field.",
    example: "/files",
  },
};
