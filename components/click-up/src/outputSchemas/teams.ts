import { userGroupSchema, workspaceTeamUserSchema } from "./shared";
export const createTeamOutputSchema = userGroupSchema;
export const updateTeamOutputSchema = userGroupSchema;
export const getTeamOutputSchema = {
  type: "object" as const,
  properties: {
    groups: { type: "array", items: userGroupSchema },
  },
  required: ["groups"],
};
export const getAuthorizedTeamsOutputSchema = {
  type: "object" as const,
  properties: {
    teams: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          color: { type: "string" },
          avatar: { type: "string" },
          members: {
            type: "array",
            items: {
              type: "object" as const,
              properties: { user: workspaceTeamUserSchema },
              required: ["user"],
            },
          },
        },
        required: ["id", "name", "color", "avatar", "members"],
      },
    },
  },
  required: ["teams"],
};
export const getWorkspacePlanOutputSchema = {
  type: "object" as const,
  properties: {
    plan_name: { type: "string" },
    plan_id: { type: "integer" },
  },
};
export const getWorkspaceSeatsOutputSchema = {
  type: "object" as const,
  properties: {
    members: {
      type: "object" as const,
      properties: {
        filled_members_seats: { type: "integer" },
        total_member_seats: { type: "integer" },
        empty_member_seats: { type: "integer" },
      },
      required: [
        "filled_members_seats",
        "total_member_seats",
        "empty_member_seats",
      ],
    },
    guests: {
      type: "object" as const,
      properties: {
        filled_guest_seats: { type: "integer" },
        total_guest_seats: { type: ["integer", "string"] },
        empty_guest_seats: { type: ["integer", "string"] },
      },
      required: [
        "filled_guest_seats",
        "total_guest_seats",
        "empty_guest_seats",
      ],
    },
  },
  required: ["members", "guests"],
};
