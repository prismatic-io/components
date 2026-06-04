









export const listEventsProvidersExamplePayload = {
  data: {
    _embedded: {
      providers: [
        {
          id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          label: "My Custom Events Provider",
          description: "Provides custom application events",
          source: "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          docs_url: "https://developer.adobe.com/events/docs/",
          publisher: "Adobe Custom",
          _embedded: {
            eventmetadata: [
              {
                event_code: "com.adobe.custom.event.started",
                label: "Custom Event Started",
                description: "Triggered when a custom event starts",
                _links: {},
              },
            ],
          },
          _links: {
            self: {
              href: "https://api.adobe.io/events/providers/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            },
          },
        },
      ],
    },
    _links: {
      self: {
        href: "https://api.adobe.io/events/0A1B2C3D4E5F67890ABC@AdobeOrg/providers",
      },
    },
  },
};





export const getEventsProviderExamplePayload = {
  data: {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    label: "My Custom Events Provider",
    description: "Provides custom application events",
    source: "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    docs_url: "https://developer.adobe.com/events/docs/",
    publisher: "Adobe Custom",
    _embedded: {
      eventmetadata: [
        {
          event_code: "com.adobe.custom.event.started",
          label: "Custom Event Started",
          description: "Triggered when a custom event starts",
        },
      ],
    },
    _links: {
      self: {
        href: "https://api.adobe.io/events/providers/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    },
  },
};





export const createEventsProviderExamplePayload = {
  data: {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    label: "New Events Provider",
    description: "A newly created events provider",
    source: "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
    docs_url: "https://developer.adobe.com/events/docs/",
    publisher: "Adobe Custom",
    _embedded: {
      eventmetadata: [],
    },
    _links: {
      self: {
        href: "https://api.adobe.io/events/providers/b2c3d4e5-f6a7-8901-bcde-f12345678901",
      },
    },
  },
};





export const updateEventsProviderExamplePayload = {
  data: {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    label: "Updated Events Provider",
    description: "An updated events provider description",
    source: "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    docs_url: "https://developer.adobe.com/events/docs/guides/",
    publisher: "Adobe Custom",
    _embedded: {
      eventmetadata: [
        {
          event_code: "com.adobe.custom.event.started",
          label: "Custom Event Started",
          description: "Triggered when a custom event starts",
        },
      ],
    },
    _links: {
      self: {
        href: "https://api.adobe.io/events/providers/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    },
  },
};






export const deleteEventsProviderExamplePayload = {
  data: null,
};
