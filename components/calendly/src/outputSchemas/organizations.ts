const organizationInvitationResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    organization: { type: "string" },
    email: { type: "string" },
    status: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    last_sent_at: { type: ["string", "null"], format: "date-time" },
    user: { type: ["string", "null"] },
  },
  required: [
    "uri",
    "organization",
    "email",
    "status",
    "created_at",
    "updated_at",
  ],
};
export const getOrganizationInvitationOutputSchema = {
  type: "object",
  properties: {
    resource: organizationInvitationResource,
  },
  required: ["resource"],
};
export const inviteUserToOrganizationOutputSchema = {
  type: "object",
  properties: {
    resource: organizationInvitationResource,
  },
  required: ["resource"],
};
export const listOrganizationInvitationsOutputSchema = {
  type: "array",
  items: organizationInvitationResource,
};
const membershipUserSchema = {
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
  },
};
const organizationMembershipResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    role: { type: "string" },
    user: membershipUserSchema,
    organization: { type: "string" },
    updated_at: { type: "string", format: "date-time" },
    created_at: { type: "string", format: "date-time" },
  },
  required: ["uri", "role", "user", "organization", "created_at", "updated_at"],
};
export const getOrganizationMembershipOutputSchema = {
  type: "object",
  properties: {
    resource: organizationMembershipResource,
  },
  required: ["resource"],
};
export const listOrganizationMembershipsOutputSchema = {
  type: "array",
  items: organizationMembershipResource,
};
export const listActivityLogEntriesOutputSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      occurred_at: { type: "string", format: "date-time" },
      uri: { type: "string" },
      namespace: { type: "string" },
      action: { type: "string" },
      actor: {
        type: ["object", "null"],
        properties: {
          uri: { type: ["string", "null"] },
          type: { type: "string" },
          organization: {
            type: ["object", "null"],
            properties: {
              uri: { type: "string" },
              role: { type: "string" },
            },
          },
          group: {
            type: ["object", "null"],
            properties: {
              uri: { type: "string" },
              name: { type: "string" },
              role: { type: "string" },
            },
          },
          display_name: { type: "string" },
          alternative_identifier: { type: ["string", "null"] },
        },
      },
      fully_qualified_name: { type: "string" },
      details: { type: "object" },
      organization: { type: "string" },
    },
    required: [
      "uri",
      "occurred_at",
      "namespace",
      "action",
      "fully_qualified_name",
      "organization",
    ],
  },
};
export const removeUserFromOrganizationOutputSchema = {
  type: "object",
  properties: {},
};
export const revokeUserOrganizationInvitationOutputSchema = {
  type: "object",
  properties: {},
};
