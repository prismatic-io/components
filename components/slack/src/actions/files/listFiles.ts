import { action, util } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listFilesExamplePayload } from "../../examplePayloads";
import { listFilesInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";

export const listFiles = action({
  display: {
    label: "List Files",
    description: "List all available files.",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    debugLogger({ ...params, debug });
    const client = await createOauthClient({
      slackConnection: params.connection,
    });

    if (params.fetchAll) {
      return paginateResults(client, "files", "files", "list", {});
    }

    const data = await client.files.list({
      page: util.types.toInt(params.cursor),
    });
    return { data };
  },
  inputs: listFilesInputs,
  examplePayload: {
    data: listFilesExamplePayload as unknown,
  },
});
