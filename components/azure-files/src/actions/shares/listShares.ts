import type { ShareItem } from "@azure/storage-file-share";
import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listSharesInputs } from "../../inputs";
import { listSharesExamplePayload } from "../../examplePayloads";

export const listShares = action({
  display: {
    label: "List Shares",
    description: "List the file shares available in the account.",
  },
  perform: async (context, params) => {
    const client = createAuthorizedClient(params.azureConnection);
    const shares: ShareItem[] = [];
    for await (const share of client.listShares()) {
      shares.push(share);
    }
    return { data: shares };
  },
  inputs: listSharesInputs,
  examplePayload: listSharesExamplePayload,
});
