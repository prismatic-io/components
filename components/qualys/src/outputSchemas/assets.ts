export const listAssetsOutputSchema = {
  type: "object" as const,
  properties: {
    responseMessage: { type: "string" },
    responseCode: { type: "string" },
    count: { type: "number" },
    hasMore: { type: "number" },
    lastSeenAssetId: { type: "number" },
    assetListData: {
      type: "object",
      properties: {
        asset: {
          type: "array",
          items: {
            type: "object",
            properties: {
              assetId: { type: "number" },
              assetUUID: { type: "string" },
              hostId: { type: "number" },
              assetName: { type: "string" },
              address: { type: "string" },
              fqdn: { type: "string" },
              dnsName: { type: "string" },
              assetType: { type: "string" },
              operatingSystem: {
                type: "object",
                properties: {
                  osName: { type: "string" },
                  fullName: { type: "string" },
                  category: { type: "string" },
                },
              },
              lastModifiedDate: { type: "string" },
              createdDate: { type: "string" },
            },
          },
        },
      },
    },
  },
};
export const getAssetOutputSchema = listAssetsOutputSchema;
export const syncAssetOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    responseCode: { type: "string" },
    assetsError: { type: "object" },
  },
};
