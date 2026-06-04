import type { Connection } from "@prismatic-io/spectral";
import { apiKey } from "../connections/apiKey";
import { oAuth2 } from "../connections/oAuth2";
import { toStr } from "./toStr";

export const getConnectionHeaders = (connection: Connection) => {
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  switch (connection.key) {
    case apiKey.key: {
      const username = toStr(connection.fields.username);
      const apiKey = toStr(connection.fields.apiKey);
      const basicToken = Buffer.from(`${username}:${apiKey}`).toString(
        "base64",
      );

      return {
        ...headers,
        Authorization: `Basic ${basicToken}`,
      };
    }
    case oAuth2.key: {
      const accessToken = toStr(connection.token?.access_token);

      return {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    default:
      return {};
  }
};
