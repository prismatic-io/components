import { action } from "@prismatic-io/spectral";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { title, connectionInput } from "../inputs";
import { getAccessToken } from "../client";
import { ensureTitle } from "../util";

export const createDocument = action({
  display: {
    label: "Create Spreadsheet",
    description: "Create a new Google Sheet Document",
  },
  perform: async (_context, { title, connection }) => {
    const token = getAccessToken(connection);
    const spreadsheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
      {
        token,
      },
      {
        title: ensureTitle(title),
      },
    );

    return {
      data: {
        spreadsheetId: spreadsheet.spreadsheetId,
        title,
      },
    };
  },
  inputs: {
    title: {
      ...title,
      label: "Document Title",
      comments: "Specifies the title of the document.",
    },
    connection: connectionInput,
  },
});

export default createDocument;
