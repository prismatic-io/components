import { basename } from "node:path";
import { action } from "@prismatic-io/spectral";
import type { files } from "dropbox";
import * as mime from "mime-types";
import { createAuthorizedClient } from "../auth";
import { downloadFileExamplePayload } from "../example-payloads";
import { connectionInput, download_as_zip, path } from "../inputs";
import { checkDebug, handleDropboxError, validatePath } from "../util";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download the file (< 150MB) at the specified path",
  },
  perform: async (context, { dropboxConnection, path, download_as_zip }) => {
    checkDebug(
      {
        dropboxConnection,
        path,
        download_as_zip,
      },
      context,
    );
    validatePath(path);
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      if (download_as_zip) {
        const { result } = await dbx.filesDownloadZip({
          path,
        });
        return {
          data: result,
          contentType: "application/zip",
        };
      } else {
        const { result } = await dbx.filesDownload({
          path,
        });

        return {
          
          
          
          
          
          data: (result as files.FileMetadata & { fileBinary: Buffer })
            .fileBinary,
          contentType:
            mime.lookup(basename(result.path_lower)) || mime.types.bin,
        };
      }
    } catch (err) {
      handleDropboxError(err, [path]);
    }
  },
  inputs: { dropboxConnection: connectionInput, path, download_as_zip },
  examplePayload: downloadFileExamplePayload,
});
