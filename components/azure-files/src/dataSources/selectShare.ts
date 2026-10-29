import { dataSource } from "@prismatic-io/spectral";
import type { ShareItem } from "@azure/storage-file-share";
import { createAuthorizedClient } from "../client";
import { selectShareInputs } from "../inputs/dataSources";

export const selectShare = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Share",
    description: "Select an Azure Files share.",
  },
  inputs: selectShareInputs,
  perform: async (context, params) => {
    const client = createAuthorizedClient(params.azureConnection);
    const shares: ShareItem[] = [];
    for await (const share of client.listShares()) {
      shares.push(share);
    }
    return { result: shares.map((share) => share.name) };
  },
});
