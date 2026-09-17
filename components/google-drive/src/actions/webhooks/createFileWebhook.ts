import { action, outputSchema } from "@prismatic-io/spectral";
import { v4 as uuid_v4 } from "uuid";
import { createClient } from "../../client";
import { WEBHOOK_CHANNEL_TYPE } from "../../constants";
import { createFileWebhookInputs } from "../../inputs";
import { createFileWebhookOutputSchema } from "../../outputSchemas";
import { createFileWebhookExamplePayload } from "../../examplePayloads";
export const createFileWebhook = action({
  display: {
    label: "Create Webhook for File or Folder",
    description:
      "Create a webhook to receive notifications of changes for a file or folder",
  },
  inputs: createFileWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFileWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { data } = await client.files.watch({
      fileId: params.resourceId,
      requestBody: {
        id: uuid_v4(),
        type: WEBHOOK_CHANNEL_TYPE,
        address: params.endpoint,
        expiration: params.expiration,
      },
      supportsAllDrives: true,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { endpoint, expiration },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createFileWebhookExamplePayload.data,
      address: endpoint,
      expiration: expiration || createFileWebhookExamplePayload.data.expiration,
    },
  }),
  examplePayload: createFileWebhookExamplePayload,
});
