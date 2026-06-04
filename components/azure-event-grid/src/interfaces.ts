export interface UpdateEventSubscription {
  retryPolicy: {
    maxDeliveryAttempts: number;
    eventTimeToLiveInMinutes: number;
  };
  eventDeliverySchema?: string;
  destination?: {
    properties: {
      endpointUrl: string;
    };
    endpointType: string;
  };
}

export interface EventSubscription {
  name: string;
  id: string;
  type: string;
  properties: Record<string, unknown>;
}
