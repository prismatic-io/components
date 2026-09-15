const userResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    name: { type: "string" },
    slug: { type: "string" },
    email: { type: "string" },
    scheduling_url: { type: "string" },
    timezone: { type: "string" },
    avatar_url: { type: ["string", "null"] },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    current_organization: { type: "string" },
    resource_type: { type: "string" },
  },
  required: [
    "uri",
    "name",
    "email",
    "scheduling_url",
    "timezone",
    "created_at",
    "updated_at",
  ],
};
export const getUserOutputSchema = {
  type: "object",
  properties: {
    resource: userResource,
  },
  required: ["resource"],
};
export const getCurrentUserOutputSchema = {
  type: "object",
  properties: {
    resource: userResource,
  },
  required: ["resource"],
};
