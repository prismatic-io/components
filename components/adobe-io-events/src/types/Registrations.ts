export type Registrations = {
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    registrations: {
      _links: {
        [key: string]: {
          href: string;
        };
      };
      id: number;
      name: string;
      description: string;
      client_id: string;
      registration_id: string;
      events_of_interest: {
        event_code: string;
        provider_id: string;
        event_label: string;
        event_description: string;
        provider_label: string;
        provider_description: string;
        event_delivery_format: string;
        provider_metadata: string;
      }[];
      webhook_status: string;
      created_date: string;
      updated_date: string;
      consumer_id: string;
      project_id: string;
      workspace_id: string;
      webhook_url: string;
      delivery_type: string;
      enabled: boolean;
    }[];
  };
};
