import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fileId, metadataFields } from "../inputs";

export const getFileMetadata = action({
  display: {
    label: "Get File Metadata",
    description: "Gets a file's metadata and content by ID.",
  },
  perform: async (_context, { connection, fileId, metadataFields }) => {
    const drive = createClient(connection);

    
    const { data } = await drive.files.get({
      fileId,
      fields: metadataFields,
      supportsAllDrives: true,
    });

    return {
      data,
    };
  },
  inputs: { connection, fileId, metadataFields },
  examplePayload: {
    data: {
      id: "1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs",
      name: "Fountain AX <> ADP WFN Marketplace Mapping",
      mimeType: "application/vnd.google-apps.spreadsheet",
      thumbnailLink:
        "https://lh3.googleusercontent.com/drive-storage/AJQWtBNQ460KV9YNsFDL_x3WQq6D019SkKdIUuWzGO2YKBSiLOfmFtlunKSyC02yi7bycbMN_n2DB1k7OJ5akXI6ZrQ0s0y6qHOaaTrOJyis6EeSsEnJMrFOeNzzn3jo0kg=s220",
    },
  },
});

export default getFileMetadata;
