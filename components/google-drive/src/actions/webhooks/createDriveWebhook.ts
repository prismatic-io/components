import { action, outputSchema } from "@prismatic-io/spectral";
import { v4 as uuid_v4 } from "uuid";
import { createClient } from "../../client";
import { WEBHOOK_CHANNEL_TYPE } from "../../constants";
import { createDriveWebhookInputs } from "../../inputs";
import { createDriveWebhookOutputSchema } from "../../outputSchemas";
import { createDriveWebhookExamplePayload } from "../../examplePayloads";
export const createDriveWebhook = action({
  display: {
    label: "Create Webhook for Drive",
    description:
      "Create a webhook to receive notifications of changes with a Google Drive",
  },
  inputs: createDriveWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDriveWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const startPageTokenResponse = await client.changes.getStartPageToken({
      driveId: params.driveId,
      supportsAllDrives: true,
    });
    const { data } = await client.changes.watch({
      driveId: params.driveId,
      requestBody: {
        id: uuid_v4(),
        type: WEBHOOK_CHANNEL_TYPE,
        address: params.endpoint,
        expiration: params.expiration,
      },
      supportsAllDrives: true,
      pageToken: startPageTokenResponse.data.startPageToken,
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
      ...createDriveWebhookExamplePayload.data,
      address: endpoint,
      expiration:
        expiration || createDriveWebhookExamplePayload.data.expiration,
    },
  }),
  examplePayload: createDriveWebhookExamplePayload,
});
