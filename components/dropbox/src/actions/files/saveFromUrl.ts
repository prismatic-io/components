import { action, outputSchema } from "@prismatic-io/spectral";
import type { DropboxResponse, files } from "dropbox";
import { createAuthorizedClient } from "../../auth";
import {
  IN_PROGRESS_TAG,
  SAVE_FROM_URL_POLL_INTERVAL_MS,
} from "../../constants";
import { saveFromUrlExamplePayload } from "../../examplePayloads";
import { saveFromUrlInputs } from "../../inputs";
import { saveFromUrlOutputSchema } from "../../outputSchemas";
import {
  checkDebug,
  delay,
  handleDropboxError,
  validatePath,
} from "../../util";
export const saveFromUrl = action({
  display: {
    label: "Save From URL",
    description: "Save a file from a URL to Dropbox",
  },
  performSafety: "notAllowed",
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
          await delay(SAVE_FROM_URL_POLL_INTERVAL_MS);
        } while (filesSaveUrlCheckJobStatus.result[".tag"] === IN_PROGRESS_TAG);
        return { data: filesSaveUrlCheckJobStatus };
      }
      return { data: filesSaveUrl };
    } catch (err) {
      handleDropboxError(err, [toPath]);
    }
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: saveFromUrlExamplePayload,
  }),
  inputs: saveFromUrlInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: saveFromUrlOutputSchema,
  }),
  examplePayload: {
    data: saveFromUrlExamplePayload,
  },
});
