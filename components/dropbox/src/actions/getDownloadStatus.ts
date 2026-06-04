import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { getDownloadStatusExamplePayload } from "../example-payloads";
import { asyncJobId, connectionInput } from "../inputs";
import { checkDebug, handleDropboxError } from "../util";

export const getDownloadStatus = action({
  display: {
    label: "Get Download Status",
    description: "Get the status of a file download from a URL to Dropbox",
  },
  perform: async (context, { dropboxConnection, asyncJobId }) => {
    checkDebug({ dropboxConnection, asyncJobId }, context);
    const dbx = createAuthorizedClient(dropboxConnection);

    try {
      const filesSaveUrlCheckJobStatus = await dbx.filesSaveUrlCheckJobStatus({
        async_job_id: asyncJobId,
      });
      return { data: filesSaveUrlCheckJobStatus };
    } catch (err) {
      handleDropboxError(err);
    }
  },
  inputs: {
    dropboxConnection: connectionInput,
    asyncJobId,
  },
  examplePayload: {
    data: getDownloadStatusExamplePayload,
  },
});
