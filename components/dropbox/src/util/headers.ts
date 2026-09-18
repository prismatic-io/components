import { util } from "@prismatic-io/spectral";
import type { RawRequestHeaderInputs } from "../types";
export const getHeadersRawRequest = (
  dropboxToken: string,
  httpClientInputs: RawRequestHeaderInputs,
): Record<string, string> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${dropboxToken}`,
  };
  if (httpClientInputs.headers.length > 0) {
    let contentTypeHeader = "";
    httpClientInputs.headers.forEach((header) => {
      const headerName = header.key.toLowerCase();
      const headerValue = util.types.toString(header.value);
      if (headerName === "content-type") {
        contentTypeHeader = headerValue;
      }
    });
    headers["Content-Type"] = contentTypeHeader;
  } else {
    headers["Content-Type"] = "";
  }
  return headers;
};
export const getUserTypeHeader = (
  userType: "admin" | "user",
  teamMemberId: string,
): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (userType === "user") {
    headers["Dropbox-API-Select-User"] = teamMemberId;
  } else if (userType === "admin") {
    headers["Dropbox-API-Select-Admin"] = teamMemberId;
  } else {
    throw new Error("Invalid user type. Must be 'user' or 'admin'.");
  }
  return headers;
};
