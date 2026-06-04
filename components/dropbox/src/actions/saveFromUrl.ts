import { action } from "@prismatic-io/spectral";
import type { DropboxResponse, files } from "dropbox";
import { createAuthorizedClient } from "../auth";
import { IN_PROGRESS_TAG } from "../constants";
import { saveFromUrlExamplePayload } from "../example-payloads";
import { delay } from "../helpers";
import {
  connectionInput,
  toPath,
  urlToSave,
  waitUntilComplete,
} from "../inputs";
import { checkDebug, handleDropboxError, validatePath } from "../util";

export const saveFromUrl = action({
  display: {
    label: "Save From URL",
    description: "Save a file from a URL to Dropbox",
  },
  perform: async (
    context,
    { dropboxConnection, toPath, urlToSave, waitUntilComplete },
  ) => {
    checkDebug(
      { dropboxConnection, toPath, urlToSave, waitUntilComplete },
      context,
    );
    validatePath(toPath);
    const dbx = createAuthorizedClient(dropboxConnection);

    try {
      const filesSaveUrl = await dbx.filesSaveUrl({
        path: toPath,
        url: urlToSave,
      });

      if (waitUntilComplete) {
        // @ts-expect-error - Dropbox SDK tagged union type; async_job_id exists at runtime
        const asyncJobId = filesSaveUrl.result.async_job_id;
        let filesSaveUrlCheckJobStatus: DropboxResponse<files.SaveUrlJobStatus>;

        do {
          filesSaveUrlCheckJobStatus = await dbx.filesSaveUrlCheckJobStatus({
            async_job_id: asyncJobId,
          });
          
          await delay(1000);
        } while (filesSaveUrlCheckJobStatus.result[".tag"] === IN_PROGRESS_TAG);
        return { data: filesSaveUrlCheckJobStatus };
      }

      return { data: filesSaveUrl };
    } catch (err) {
      handleDropboxError(err, [toPath]);
    }
  },
  inputs: {
    dropboxConnection: connectionInput,
    toPath: {
      ...toPath,
      comments:
        "The path with file name with extension where the URL will be saved to in Dropbox.",
      example: "/path/to/file.txt",
    },
    urlToSave,
    waitUntilComplete,
  },
  examplePayload: {
    data: saveFromUrlExamplePayload,
  },
});
