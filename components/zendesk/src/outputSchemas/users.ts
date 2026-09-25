export const userSchema = {
  type: "object" as const,
  properties: {
    active: { type: "boolean" },
    agent_brand_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    alias: { type: "string" },
    chat_only: { type: "boolean" },
    created_at: { type: "string", format: "date-time" },
    custom_role_id: { type: ["integer", "null"], format: "int64" },
    default_group_id: { type: "integer", format: "int64" },
    details: { type: "string" },
    email: { type: "string" },
    external_id: { type: ["string", "null"] },
    iana_time_zone: { type: "string" },
    id: { type: "integer", format: "int64" },
    last_login_at: { type: "string", format: "date-time" },
    locale: { type: "string" },
    locale_id: { type: "integer", format: "int64" },
    moderator: { type: "boolean" },
    name: { type: "string" },
    notes: { type: "string" },
    only_private_comments: { type: "boolean" },
    organization_id: { type: ["integer", "null"], format: "int64" },
    phone: { type: ["string", "null"] },
    photo: { type: ["object", "null"], additionalProperties: true },
    remote_photo_url: { type: "string" },
    report_csv: { type: "boolean" },
    restricted_agent: { type: "boolean" },
    role: { type: "string" },
    role_type: { type: ["integer", "null"] },
    separation: {
      type: "object",
      properties: {
        brand_id: { type: "integer", format: "int64" },
        scope: { type: "string", enum: ["account", "brand"] },
      },
      required: ["scope"],
    },
    shared: { type: "boolean" },
    shared_agent: { type: "boolean" },
    shared_phone_number: { type: ["boolean", "null"] },
    signature: { type: "string" },
    suspended: { type: "boolean" },
    suspension_details: {
      type: ["object", "null"],
      properties: {
        channels: {
          type: "array",
          items: { type: "string", enum: ["all", "messaging"] },
          minItems: 1,
        },
      },
      required: ["channels"],
    },
    tags: { type: "array", items: { type: "string" } },
    ticket_restriction: { type: ["string", "null"] },
    time_zone: { type: "string" },
    two_factor_auth_enabled: { type: ["boolean", "null"] },
    updated_at: { type: "string", format: "date-time" },
    url: { type: "string" },
    user_fields: { type: "object", additionalProperties: true },
    verified: { type: "boolean" },
  },
  required: ["name"],
  additionalProperties: true,
};
export const createUserOutputSchema = userSchema;
export const deleteUserOutputSchema = { type: "string" as const };
export const listUsersOutputSchema = {
  type: "array" as const,
  items: userSchema,
};
export const searchUsersOutputSchema = {
  type: "array" as const,
  items: userSchema,
};
export const showUserOutputSchema = userSchema;
export const updateUserOutputSchema = userSchema;
