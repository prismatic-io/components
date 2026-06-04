import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, teamMemberId, userType } from "../inputs";
import { checkDebug, getHeadersRawRequest, getUserTypeHeader } from "../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Dropbox",
  },
  inputs: {
    connection: connectionInput,
    userType,
    teamMemberId,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/file_requests/create), The base URL is already included (https://api.dropboxapi.com/2). For example, to connect to https://api.dropboxapi.com/2/file_requests/create, only /file_requests/create is entered in this field.",
      example: "/file_requests/create",
    },
  },
  perform: async (
    context,
    { connection, userType, teamMemberId, ...httpClientInputs },
  ) => {
    checkDebug(
      { connection, userType, teamMemberId, ...(httpClientInputs.data as any) },
      context,
    );
    const dropboxToken = connection.token.access_token;
    const userHeader =
      userType && teamMemberId ? getUserTypeHeader(userType, teamMemberId) : {};
    const headers = getHeadersRawRequest(dropboxToken, httpClientInputs);
    try {
      const { data } = await sendRawRequest(
        "https://api.dropboxapi.com/2/",
        { ...httpClientInputs, debugRequest: context.debug.enabled },
        { ...headers, ...userHeader },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
