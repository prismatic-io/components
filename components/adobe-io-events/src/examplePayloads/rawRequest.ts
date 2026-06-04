









export const rawRequestExamplePayload = {
  data: {
    status: 200,
    headers: {},
    body: {
      _embedded: {
        providers: [
          {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            label: "My Custom Events Provider",
            description: "Provides custom application events",
            source: "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            publisher: "Adobe Custom",
          },
        ],
      },
      _links: {
        self: {
          href: "https://api.adobe.io/events/0A1B2C3D4E5F67890ABC@AdobeOrg/providers",
        },
      },
    },
  },
};
