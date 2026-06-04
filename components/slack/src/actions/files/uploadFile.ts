import { Readable } from "node:stream";
import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a new file to a Slack conversation.",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    debugLogger({ ...params, debug });
    const client = await createOauthClient({
      slackConnection: params.connection,
    });
    const { data: fileData } = params.fileContent;
    const data = await client.files.uploadV2({
      file: Readable.from(fileData),
      filename: params.fileName,
      title: params.title || undefined,
      channel_id: params.channels || undefined,
      initial_comment: params.initialComment || undefined,
      thread_ts: params.thread || undefined,
    });
    return { data };
  },
  inputs: uploadFileInputs,
  examplePayload: {
    data: uploadFileExamplePayload,
  },
});
