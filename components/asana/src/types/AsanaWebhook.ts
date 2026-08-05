export interface AsanaWebhook {
  gid: string;
  active: boolean;
  resource: {
    gid: string;
    name: string;
    resource_type?: string;
  };
  resource_type?: string;
  target: string;
}
