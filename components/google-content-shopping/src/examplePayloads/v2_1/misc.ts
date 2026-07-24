export const rawRequestExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    kind: "content#productsListResponse",
    resources: [
      {
        kind: "content#product",
        id: "online:en:US:1111111111",
        offerId: "1111111111",
        title: "Example Product",
        contentLanguage: "en",
        targetCountry: "US",
      },
    ],
  },
};
