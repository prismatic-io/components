import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import fetch from "cross-fetch";
import { Dropbox } from "dropbox";
import { MISSING_ACCESS_TOKEN_ERROR_MESSAGE } from "./constants";
import { getUserTypeHeader } from "./util";
export const createAuthorizedClient = (
  dropboxConnection: Connection,
  userType?: "admin" | "user",
  teamMemberId?: string,
): Dropbox => {
  const accessToken = util.types.toString(
    dropboxConnection.token?.access_token,
  );
  if (!accessToken) {
    throw new ConnectionError(
      dropboxConnection,
      MISSING_ACCESS_TOKEN_ERROR_MESSAGE,
    );
  }
  const client = new Dropbox({
    accessToken,
    fetch,
    customHeaders:
      userType && teamMemberId ? getUserTypeHeader(userType, teamMemberId) : {},
  });
  return client;
};
