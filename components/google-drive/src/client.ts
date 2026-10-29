import type { Connection } from "@prismatic-io/spectral";
import { google } from "googleapis";
import { drive } from "@googleapis/drive";
import { getOauth, getToken } from "./util";

export const createClient = (connection: Connection) => {
  const token = getToken(connection);
  const auth = getOauth(token);

  return drive({
    version: "v3",
    auth,
  });
};

export const createActivityClient = (connection: Connection) => {
  const token = getToken(connection);
  const auth = getOauth(token);

  return google.driveactivity({
    version: "v2",
    auth,
  });
};
