import { v4 as uuid_v4 } from "uuid";
import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, driveId, webhookEndpointInput, webhookExpirationInput } from "../inputs";
import { LIST_CHANGES_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  getDriveQueryParams,
  getListChangesLegacyStateKey,
  getListChangesNewStateKey,
  resolveListChangesPageToken,
} from "../util";

const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "List changes made to files in your Google Drive since the last time this step ran (up to 1000)",
  },
  inputs: {
    connection,
    driveId,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const { value: pageToken, isLegacy } = resolveListChangesPageToken(context);
    const newStateKey = getListChangesNewStateKey(context);
    const legacyCleanup = isLegacy
      ? { instanceState: { [getListChangesLegacyStateKey(context)]: null } }
      : {};

    if (pageToken) {
      
      const { data } = await client.changes.list({
        pageSize: 1000,
        pageToken,
        ...getDriveQueryParams(params.driveId),
      });
      return {
        data,
        crossFlowState: { [newStateKey]: data.newStartPageToken },
        ...legacyCleanup,
      };
    }

    
    
    const {
      data: { startPageToken },
    } = await client.changes.getStartPageToken(getDriveQueryParams(params.driveId));
    context.logger.info(
      "First time running. Subsequent runs will show changes that occurred since the previous run.",
    );
    return {
      data: {
        kind: "drive#changeList",
        newStartPageToken: startPageToken,
        changes: [],
      },
      crossFlowState: { [newStateKey]: startPageToken },
      ...legacyCleanup,
    };
  },
  examplePayload: {
    data: LIST_CHANGES_EXAMPLE_PAYLOAD,
    crossFlowState: {
      "google-drive-list-changes-page-token:exampleStableFlowId:exampleStepId":
        "example-new-page-token",
    },
  },
});

const createDriveWebhook = action({
  display: {
    label: "Create Webhook for Drive",
    description: "Create a webhook to receive notifications of changes with a Google Drive",
  },
  inputs: {
    connection,
    driveId,
    endpoint: webhookEndpointInput,
    expiration: webhookExpirationInput,
  },
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
        type: "web_hook",
        address: params.endpoint,
        expiration: params.expiration,
      },
      supportsAllDrives: true,
      pageToken: startPageTokenResponse.data.startPageToken,
    });
    return { data };
  },
});

const createFileWebhook = action({
  display: {
    label: "Create Webhook for File or Folder",
    description: "Create a webhook to receive notifications of changes for a file or folder",
  },
  inputs: {
    connection,
    resourceId: input({
      label: "File or Folder ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      example: "ret08u3rv24htgh289g",
    }),
    endpoint: webhookEndpointInput,
    expiration: webhookExpirationInput,
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { data } = await client.files.watch({
      fileId: params.resourceId,
      requestBody: {
        id: uuid_v4(),
        type: "web_hook",
        address: params.endpoint,
        expiration: params.expiration,
      },
      supportsAllDrives: true,
    });
    return { data };
  },
});

const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Stop a webhook channel from sending notifications",
  },
  inputs: {
    connection,
    webhookId: input({
      label: "Webhook ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      example: "00000000-0000-0000-0000-000000000000",
      comments: "Returned when you create a webhook",
    }),
    resourceId: input({
      label: "Resource ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      example: "ret08u3rv24htgh289g",
      comments: "Returned when you create a webhook",
    }),
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { data } = await client.channels.stop({
      requestBody: {
        id: params.webhookId,
        resourceId: params.resourceId,
      },
    });
    return { data };
  },
});

export default {
  listChanges,
  createDriveWebhook,
  createFileWebhook,
  deleteWebhook,
};
