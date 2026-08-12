const webhooksIntegrationSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    url: { type: "string" },
    custom_headers: { type: ["string", "null"] },
    encode_as: { type: "string", enum: ["json", "form"] },
    payload: { type: ["string", "null"] },
  },
  required: ["name", "url"],
};
export const createWebhookOutputSchema = webhooksIntegrationSchema;
export const getWebhookOutputSchema = webhooksIntegrationSchema;
export const updateWebhookOutputSchema = webhooksIntegrationSchema;
