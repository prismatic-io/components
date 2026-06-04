import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import {
  oneDriveConnection,
  groupId,
  siteId,
  userId,
  pageLimit,
  pageToken,
} from "../inputs";
import { handleErrors } from "../errors";
import { listDrivesExamplePayload } from "../examplePayloads";



export const listDrives = action({
  display: {
    label: "List My Drives",
    description: "Returns a list of all drives available to the current user",
  },
  perform: async (context, { connection, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get("/me/drives", {
          params:
            pageLimit || pageToken
              ? {
                  $top: util.types.toInt(pageLimit) || undefined,
                  $skipToken: util.types.toString(pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});

export const listDrivesByUser = action({
  display: {
    label: "List Drives By User",
    description: "Returns a list of all drives available to the given user",
  },
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/users/${params.userId}/drives`, {
          params:
            params.pageLimit || params.pageToken
              ? {
                  $top: util.types.toInt(params.pageLimit) || undefined,
                  $skipToken:
                    util.types.toString(params.pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    userId,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});

export const listDrivesByGroup = action({
  display: {
    label: "List Drives By Group",
    description: "Returns a list of all drives available to the given group",
  },
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/groups/${params.groupId}/drives`, {
          params:
            params.pageLimit || params.pageToken
              ? {
                  $top: util.types.toInt(params.pageLimit) || undefined,
                  $skipToken:
                    util.types.toString(params.pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    groupId,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});

export const listDrivesBySite = action({
  display: {
    label: "List Drives By Site",
    description: "Returns a list of all drives available to the given site",
  },
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/sites/${params.siteId}/drives`, {
          params:
            params.pageLimit || params.pageToken
              ? {
                  $top: util.types.toInt(params.pageLimit) || undefined,
                  $skipToken:
                    util.types.toString(params.pageToken) || undefined,
                }
              : undefined,
        }),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    siteId,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});

export default {
  listDrives,
  listDrivesByGroup,
  listDrivesByUser,
  listDrivesBySite,
};
