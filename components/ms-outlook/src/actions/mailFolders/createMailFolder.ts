import { action } from "@prismatic-io/spectral";
import type { MailSearchFolder } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { createMailFolderExamplePayload } from "../../examplePayloads";
import { createMailFolderInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const createMailFolder = action({
  display: {
    label: "Create Mail Folder",
    description: "Creates a new mail folder.",
  },
  inputs: createMailFolderInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.parentFolderId
        ? `/me/mailFolders/${params.parentFolderId}/childFolders`
        : "/me/mailFolders",
    );
    const { data } = await client.post<MailSearchFolder>(url, {
      displayName: params.name,
    });
    return { data };
  },
  examplePayload: createMailFolderExamplePayload,
});
