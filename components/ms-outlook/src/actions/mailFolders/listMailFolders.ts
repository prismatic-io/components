import { action } from "@prismatic-io/spectral";
import type { MailSearchFolder } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { listMailFoldersExamplePayload } from "../../examplePayloads";
import { listMailFoldersInputs } from "../../inputs";
import type { ODataAttrs, ODataQueryParams } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllData } from "../../util";

export const listMailFolders = action({
  display: {
    label: "List Mail Folders",
    description:
      "Gets the mail folder collection directly under the root folder of the signed-in user, or under the specified parent folder.",
  },
  inputs: listMailFoldersInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.parentFolderId
        ? `/me/mailFolders/${params.parentFolderId}/childFolders`
        : "/me/mailFolders",
    );

    const queryParams: ODataQueryParams = {};
    if (params.pageLimit) {
      queryParams.$top = params.pageLimit;
    }
    if (params.pageSkip) {
      queryParams.$skip = params.pageSkip;
    }

    const data = await fetchAllData<MailSearchFolder & ODataAttrs>(
      client,
      url,
      params.fetchAll,
      queryParams as Record<string, unknown>,
    );
    return { data };
  },
  examplePayload: listMailFoldersExamplePayload,
});
