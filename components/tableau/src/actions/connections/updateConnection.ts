import { action, util } from "@prismatic-io/spectral";
import { updateConnectionExamplePayload } from "../../examplePayloads";
import { updateConnectionInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const updateConnection = action({
  display: {
    label: "Update Connection",
    description:
      "Update the information and metadata of an existing connection by ID.",
  },
  examplePayload: updateConnectionExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(
      `/workbooks/${params.workbookId}/connections/${params.connectionId}`,
      {
        connection: {
          serverAddress: params.connectionSettings.serverAddress || undefined,
          serverPort: params.connectionSettings.serverPort || undefined,
          userName: params.connectionSettings.connectionUsername || undefined,
          password: params.connectionSettings.connectionPassword || undefined,
          embedPassword: params.connectionSettings.embedPassword || undefined,
          queryTaggingEnabled:
            params.connectionSettings.queryTaggingEnabled || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: updateConnectionInputs,
});
