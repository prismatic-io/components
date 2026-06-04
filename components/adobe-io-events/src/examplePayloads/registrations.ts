









export const createWebhookExamplePayload = {
  data: {
    id: 12345,
    name: "My Webhook Registration",
    description: "Receives events via webhook for custom processing",
    client_id: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    registration_id: "c3d4e5f6-a7b8-9012-cdef-234567890123",
    events_of_interest: [
      {
        event_code: "com.adobe.custom.event.started",
        provider: "My Custom Events Provider",
        provider_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        event_label: "Custom Event Started",
        event_description: "Triggered when a custom event starts",
        provider_label: "My Custom Events Provider",
        provider_description: "Provides custom application events",
        event_delivery_format: "cloud_events_v1",
      },
    ],
    webhook_status: "verified",
    created_date: "2026-01-15T10:30:00.000Z",
    updated_date: "2026-01-15T10:30:00.000Z",
    consumer_id: "0A1B2C3D4E5F67890ABC@AdobeOrg",
    project_id: "d4e5f6a7b8c90123",
    workspace_id: "e5f6a7b8c9012345",
    webhook_url: "https://hooks.example.com/adobe-events",
    delivery_type: "webhook",
    enabled: true,
    _links: {
      "rel:events": {
        href: "https://api.adobe.io/events/organizations/0A1B2C3D4E5F67890ABC@AdobeOrg/integrations/12345/c3d4e5f6-a7b8-9012-cdef-234567890123",
      },
      "rel:trace": {
        href: "https://api.adobe.io/events/organizations/0A1B2C3D4E5F67890ABC@AdobeOrg/integrations/12345/c3d4e5f6-a7b8-9012-cdef-234567890123/tracing",
      },
      self: {
        href: "https://api.adobe.io/events/0A1B2C3D4E5F67890ABC@AdobeOrg/d4e5f6a7b8c90123/e5f6a7b8c9012345/registrations/c3d4e5f6-a7b8-9012-cdef-234567890123",
      },
    },
  },
};





export const listAllRegistrationsExamplePayload = {
  data: {
    _embedded: {
      registrations: [
        {
          _links: {
            "rel:events": {
              href: "https://api.adobe.io/events/organizations/0A1B2C3D4E5F67890ABC@AdobeOrg/integrations/12345/c3d4e5f6-a7b8-9012-cdef-234567890123",
            },
            "rel:trace": {
              href: "https://api.adobe.io/events/organizations/0A1B2C3D4E5F67890ABC@AdobeOrg/integrations/12345/c3d4e5f6-a7b8-9012-cdef-234567890123/tracing",
            },
            self: {
              href: "https://api.adobe.io/events/0A1B2C3D4E5F67890ABC@AdobeOrg/d4e5f6a7b8c90123/e5f6a7b8c9012345/registrations/c3d4e5f6-a7b8-9012-cdef-234567890123",
            },
          },
          id: 12345,
          name: "My Webhook Registration",
          description: "Receives events via webhook for custom processing",
          client_id: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
          registration_id: "c3d4e5f6-a7b8-9012-cdef-234567890123",
          events_of_interest: [
            {
              event_code: "com.adobe.custom.event.started",
              provider_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
              event_label: "Custom Event Started",
              event_description: "Triggered when a custom event starts",
              provider_label: "My Custom Events Provider",
              provider_description: "Provides custom application events",
              event_delivery_format: "cloud_events_v1",
              provider_metadata: "3rd_party_custom_events",
            },
          ],
          webhook_status: "verified",
          created_date: "2026-01-15T10:30:00.000Z",
          updated_date: "2026-01-15T10:30:00.000Z",
          consumer_id: "0A1B2C3D4E5F67890ABC@AdobeOrg",
          project_id: "d4e5f6a7b8c90123",
          workspace_id: "e5f6a7b8c9012345",
          webhook_url: "https://hooks.example.com/adobe-events",
          delivery_type: "webhook",
          enabled: true,
        },
      ],
    },
    _links: {
      self: {
        href: "https://api.adobe.io/events/0A1B2C3D4E5F67890ABC@AdobeOrg/d4e5f6a7b8c90123/e5f6a7b8c9012345/registrations",
      },
    },
  },
};






export const deleteRegistrationExamplePayload = {
  data: null,
};






export const deleteInstancedWebhooksExamplePayload = {
  data: [
    {
      message:
        "Registration c3d4e5f6-a7b8-9012-cdef-234567890123 was successfully deleted.",
    },
    {
      message:
        "Registration d4e5f6a7-b8c9-0123-def4-567890123456 was successfully deleted.",
    },
  ],
};
