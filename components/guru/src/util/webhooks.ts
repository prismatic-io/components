enum WebhookStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const getStatusValue = (status: boolean) => {
  return status ? WebhookStatus.ENABLED : WebhookStatus.DISABLED;
};
