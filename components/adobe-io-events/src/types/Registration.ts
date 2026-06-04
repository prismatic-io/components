import type { EventOfInterest } from "./EventOfInterest";

export type Registration = {
  client_id: string;
  name: string;
  description: string;
  webhook_url: string;
  events_of_interest: EventOfInterest[];
  delivery_type: string;
  runtime_action?: string;
  enabled: boolean;
};
