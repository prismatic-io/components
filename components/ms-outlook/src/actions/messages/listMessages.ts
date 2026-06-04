import { action } from "@prismatic-io/spectral";
import type { Message } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { listMessagesExamplePayload } from "../../examplePayloads";
import { listMessagesInputs } from "../../inputs";
import type { ODataAttrs, ODataQueryParams } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllData } from "../../util";

export const listMessages = action({
  display: {
    label: "List Mail Messages",
    description: "Lists mail messages in a user's mailbox.",
  },
  inputs: listMessagesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.folderId ? `/me/mailFolders/${params.folderId}/messages` : "/me/messages",
    );

    const queryParams: ODataQueryParams = {};
    if (params.pageLimit) {
      queryParams.$top = params.pageLimit;
    }
    if (params.pageSkip) {
      queryParams.$skip = params.pageSkip;
    }
    if (params.search) {
      queryParams.$search = params.search;
    }
    if (params.filter) {
      queryParams.$filter = params.filter;
    }

    const data = await fetchAllData<Message & ODataAttrs>(
      client,
      url,
      params.fetchAll,
      queryParams as Record<string, unknown>,
    );
    return { data };
  },
  examplePayload: listMessagesExamplePayload,
});
