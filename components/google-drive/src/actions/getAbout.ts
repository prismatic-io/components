import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fields } from "../inputs";
import { response } from "../response";

response.data.data = {
  user: {},
  teamDriveThemes: [],
  appInstalled: true,
  canCreateDrives: false,
  canCreateTeamDrives: false,
  driveThemes: [],
  exportFormats: {},
  folderColorPalette: [],
  importFormats: {},
  kind: "",
  maxImportSizes: {},
  maxUploadSize: "25mb",
  storageQuota: { limit: "256gb" },
};

export const getAbout = action({
  display: {
    label: "Get About",
    description: "Gets information about the user's Drive, and system capabilities ",
  },
  perform: async (_context, { connection, fields }) => {
    const drive = createClient(connection);
    const { data } = await drive.about.get({
      fields: util.types.toString(fields),
    });

    return {
      data,
    };
  },
  inputs: { connection, fields },
  examplePayload: {
    data: {
      user: {
        displayName: "example",
        emailAddress: "example@email.com",
        kind: "example",
      },
    },
  },
});

export default getAbout;
