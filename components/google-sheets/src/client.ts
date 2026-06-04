import { GoogleSpreadsheet } from "google-spreadsheet";
import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import { googleConnection } from "./connections";
import { auth, drive } from "@googleapis/drive";

export const getAccessToken = (connection: Connection) => {
  const { access_token: token } = connection.token;
  if (token) {
    return util.types.toString(token);
  }
  throw new ConnectionError(
    connection,
    "Did not receive a valid OAuth2 access token.",
  );
};

const getOauth = (token: string) => {
  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({ access_token: `${token}` });

  return oauth2Client;
};

const validateConnection = (connection: Connection) => {
  if (connection.key !== googleConnection.key) {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method specified: ${googleConnection.key}`,
    );
  }
};

export const createClient = async (
  spreadsheetId: unknown,
  connection: Connection,
): Promise<GoogleSpreadsheet> => {
  validateConnection(connection);

  if (!spreadsheetId && spreadsheetId !== null) {
    throw new Error("Did not receive a valid Spreadsheet ID.");
  }

  const token = getAccessToken(connection);

  
  const doc = new GoogleSpreadsheet(util.types.toString(spreadsheetId), {
    token,
  });

  if (spreadsheetId) {
    
    await doc.loadInfo();
  }

  
  
  

  return doc;
};

export const createDriveClient = (connection: Connection) => {
  validateConnection(connection);
  const token = getAccessToken(connection);
  const auth = getOauth(token);

  return drive({
    version: "v3",
    auth,
  });
};
