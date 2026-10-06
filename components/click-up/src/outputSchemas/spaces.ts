import { statusRefSchema, workspaceTeamUserSchema } from "./shared";
const featureToggleSchema = {
  type: "object" as const,
  properties: { enabled: { type: "boolean" } },
  required: ["enabled"],
};
const dueDatesFeatureSchema = {
  type: "object" as const,
  properties: {
    enabled: { type: "boolean" },
    start_date: { type: "boolean" },
    remap_due_dates: { type: "boolean" },
    remap_closed_due_date: { type: "boolean" },
  },
  required: [
    "enabled",
    "start_date",
    "remap_due_dates",
    "remap_closed_due_date",
  ],
};
const spaceFeaturesProperties = {
  due_dates: dueDatesFeatureSchema,
  time_tracking: featureToggleSchema,
  tags: featureToggleSchema,
  time_estimates: featureToggleSchema,
  checklists: featureToggleSchema,
  custom_fields: featureToggleSchema,
  remap_dependencies: featureToggleSchema,
  dependency_warning: featureToggleSchema,
  portfolios: featureToggleSchema,
};
const spaceCoreProperties = {
  id: { type: "string" },
  name: { type: "string" },
  private: { type: "boolean" },
  statuses: { type: "array", items: statusRefSchema },
  multiple_assignees: { type: "boolean" },
};
const spaceCoreRequired = [
  "id",
  "name",
  "private",
  "statuses",
  "multiple_assignees",
  "features",
];
const spaceSchema = {
  type: "object" as const,
  properties: {
    ...spaceCoreProperties,
    features: {
      type: "object" as const,
      properties: spaceFeaturesProperties,
      required: [
        "due_dates",
        "time_tracking",
        "tags",
        "time_estimates",
        "checklists",
        "custom_fields",
        "remap_dependencies",
        "dependency_warning",
        "portfolios",
      ],
    },
  },
  required: spaceCoreRequired,
};
export const getSpaceOutputSchema = spaceSchema;
export const updateSpaceOutputSchema = spaceSchema;
export const createSpaceOutputSchema = {
  type: "object" as const,
  properties: {
    ...spaceCoreProperties,
    statuses: {
      type: "array",
      items: {
        ...statusRefSchema,
        required: ["id", "status", "type", "orderindex", "color"],
      },
    },
    features: {
      type: "object" as const,
      properties: {
        due_dates: dueDatesFeatureSchema,
        sprints: featureToggleSchema,
        points: featureToggleSchema,
        custom_items: featureToggleSchema,
        tags: featureToggleSchema,
        time_estimates: featureToggleSchema,
        checklists: featureToggleSchema,
        zoom: featureToggleSchema,
        milestones: featureToggleSchema,
        custom_fields: featureToggleSchema,
        remap_dependencies: featureToggleSchema,
        dependency_warning: featureToggleSchema,
        multiple_assignees: featureToggleSchema,
        portfolios: featureToggleSchema,
        emails: featureToggleSchema,
      },
      required: [
        "due_dates",
        "sprints",
        "points",
        "custom_items",
        "tags",
        "time_estimates",
        "checklists",
        "zoom",
        "milestones",
        "custom_fields",
        "remap_dependencies",
        "dependency_warning",
        "multiple_assignees",
        "portfolios",
        "emails",
      ],
    },
    archived: { type: "boolean" },
  },
  required: [...spaceCoreRequired, "archived"],
};
export const listSpacesOutputSchema = {
  type: "object" as const,
  properties: {
    spaces: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          ...spaceCoreProperties,
          color: { type: "string" },
          avatar: { type: "string" },
          admin_can_manage: { type: "boolean" },
          archived: { type: "boolean" },
          members: {
            type: "array",
            items: {
              type: "object" as const,
              properties: { user: workspaceTeamUserSchema },
              required: ["user"],
            },
          },
          features: {
            type: "object" as const,
            properties: spaceFeaturesProperties,
            required: [
              "due_dates",
              "time_tracking",
              "tags",
              "time_estimates",
              "checklists",
            ],
          },
        },
        required: spaceCoreRequired,
      },
    },
  },
  required: ["spaces"],
};
