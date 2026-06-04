import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "./client";
import { connectionInput } from "./inputs";
import { ShareItem } from "@azure/storage-file-share";

const selectShare = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Share",
    description: "Select an Azure Files share",
  },
  inputs: { azureConnection: connectionInput },
  perform: async (context, params) => {
    const client = createAuthorizedClient(params.azureConnection);
    const shares: ShareItem[] = [];
    for await (const share of client.listShares()) {
      shares.push(share);
    }
    return { result: shares.map((share) => share.name) };
  },
});

export default { selectShare };
