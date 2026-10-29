import { action, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { getToken } from "../client";
import {
  handleErrors,
  sendRawRequest,
  inputs as httpClientInputs,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Gmail",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/v1/users/{userId}/messages), The base URL is already included (https://gmail.googleapis.com/gmail). For example, to connect to https://gmail.googleapis.com/gmail/v1/users/{userId}/messages, only /v1/users/{userId}/messages is entered in this field.",
      example: "/v1/users/{userId}/messages",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const token = await getToken(connection);
    try {
      const { data } = await sendRawRequest(
        "https://gmail.googleapis.com/gmail",
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        { Authorization: `Bearer ${token}` },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  examplePayload: rawRequestExamplePayload,
});

export default rawRequest;
