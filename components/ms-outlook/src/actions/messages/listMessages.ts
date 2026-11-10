import { action, outputSchema } from "@prismatic-io/spectral";
import { listMessagesOutputSchema } from "../../outputSchemas";
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
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.folderId ? `/me/mailFolders/${params.folderId}/messages` : "/me/messages",
    );

    const queryParams: ODataQueryParams = {};
    if (params.pagination?.pageLimit) {
      queryParams.$top = params.pagination.pageLimit;
    }
    if (params.pagination?.pageSkip) {
      queryParams.$skip = params.pagination.pageSkip;
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
  examplePerform: async () => listMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMessagesOutputSchema,
  }),
  examplePayload: listMessagesExamplePayload,
});
