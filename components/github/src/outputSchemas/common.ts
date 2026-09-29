export const simpleUserSchema = {
  type: ["object", "null"],
  properties: {
    login: { type: "string" },
    id: { type: "integer" },
    node_id: { type: "string" },
    avatar_url: { type: "string", format: "uri" },
    url: { type: "string", format: "uri" },
    html_url: { type: "string", format: "uri" },
    type: { type: "string" },
    site_admin: { type: "boolean" },
  },
  required: ["login", "id", "node_id", "url", "type", "site_admin"],
};
