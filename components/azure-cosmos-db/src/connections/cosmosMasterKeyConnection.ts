import { connection } from "@prismatic-io/spectral";

export const cosmosMasterKeyConnection = connection({
  key: "cosmosMasterKey",
  display: {
    label: "Master Key",
    description: "Azure Cosmos DB Master Key",
  },
  inputs: {
    cosmosEndpoint: {
      label: "Endpoint",
      type: "string",
      required: true,
      shown: true,
      comments: "Your Azure Cosmos DB account endpoint URL.",
      example: "https://your-cosmos-account.documents.azure.com:443",
      placeholder: "https://your-cosmos-account.documents.azure.com:443",
    },
    masterKey: {
      label: "Master Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Your Azure Cosmos DB account master key. You can find this in the Azure Cosmos DB account settings.",
      example: "YOUR_MASTER_KEY",
    },
  },
});
