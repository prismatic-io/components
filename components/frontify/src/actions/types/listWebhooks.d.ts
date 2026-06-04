export default interface ListWebhooksResponse {
  webhooks: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    items: {
      id: string;
      creator: {
        id: string;
        name: string;
        email: string;
      };
      createdAt: string;
      name: string;
      notificationUrl: string;
      secret?: string;
      __typename: string;
      project?: {
        id?: string;
      };
    }[];
  };
}
