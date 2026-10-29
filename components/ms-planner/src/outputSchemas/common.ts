export const identitySchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    id: { type: "string" },
    tenantId: { type: "string" },
    thumbnails: { type: "object" },
  },
};

export const identitySetSchema = {
  type: "object" as const,
  properties: {
    application: identitySchema,
    applicationInstance: identitySchema,
    conversation: identitySchema,
    conversationIdentityType: identitySchema,
    device: identitySchema,
    encrypted: identitySchema,
    onPremises: identitySchema,
    guest: identitySchema,
    phone: identitySchema,
    user: identitySchema,
  },
};

export const deleteResultSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean", enum: [true] },
    id: { type: "string" },
    message: { type: "string" },
  },
  required: ["success", "id", "message"],
};
