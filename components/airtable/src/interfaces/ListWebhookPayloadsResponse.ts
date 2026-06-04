export interface ListWebhookPayloadsResponse {
  cursor: number;
  mightHaveMore: boolean;
  payloads: {
    actionMetadata: {
      source: string;
      sourceMetadata: {
        user: {
          email: string;
          id: string;
          permissionLevel: string;
        };
      };
    };
    baseTransactionNumber: number;
    payloadFormat: string;
    timestamp: string;
  }[];
}
