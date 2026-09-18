import { action, ConnectionError, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { MISSING_ACCESS_TOKEN_ERROR_MESSAGE } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import {
  checkDebug,
  getHeadersRawRequest,
  getUserTypeHeader,
} from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Dropbox",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, userType, teamMemberId, ...httpClientInputs },
  ) => {
    checkDebug(
      { connection, userType, teamMemberId, ...(httpClientInputs.data as any) },
      context,
    );
    const dropboxToken = util.types.toString(connection.token?.access_token);
    if (!dropboxToken) {
      throw new ConnectionError(connection, MISSING_ACCESS_TOKEN_ERROR_MESSAGE);
    }
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
