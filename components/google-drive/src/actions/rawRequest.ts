import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
  handleErrors,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection as connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Drive",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/files), The base URL is already included (https://www.googleapis.com/drive/v3). For example, to connect to https://www.googleapis.com/drive/v3/files, only /files is entered in this field.",
      example: "/files",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    try {
      const { data } = await sendRawRequest(
        "https://www.googleapis.com/drive/v3",
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection?.token?.access_token}`,
        },
      );
      return { data };
    } catch (error) {
      throw new Error(util.types.toJSON(handleErrors(error)));
    }
  },
});

export default rawRequest;
