const emptyMarkerSchema = {
  type: "object" as const,
  properties: {},
  required: [],
};
const activityUserSchema = {
  type: "object" as const,
  properties: {
    knownUser: {
      type: "object",
      properties: {
        personName: { type: "string" },
        isCurrentUser: { type: "boolean" },
      },
      required: [],
    },
    deletedUser: emptyMarkerSchema,
    unknownUser: emptyMarkerSchema,
  },
  required: [],
};
const domainSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    legacyId: { type: "string" },
  },
  required: [],
};
const groupSchema = {
  type: "object" as const,
  properties: {
    email: { type: "string" },
    title: { type: "string" },
  },
  required: [],
};
const driveReferenceSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    title: { type: "string" },
  },
  required: [],
};
const actorSchema = {
  type: "object" as const,
  properties: {
    user: activityUserSchema,
    anonymous: emptyMarkerSchema,
    impersonation: {
      type: "object",
      properties: { impersonatedUser: activityUserSchema },
      required: [],
    },
    system: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    administrator: emptyMarkerSchema,
  },
  required: [],
};
const ownerSchema = {
  type: "object" as const,
  properties: {
    user: activityUserSchema,
    drive: driveReferenceSchema,
    domain: domainSchema,
    teamDrive: driveReferenceSchema,
  },
  required: [],
};
const driveItemSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    mimeType: { type: "string" },
    owner: ownerSchema,
    driveFile: emptyMarkerSchema,
    driveFolder: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    file: emptyMarkerSchema,
    folder: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
  },
  required: [],
};
const driveItemReferenceSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    driveFile: emptyMarkerSchema,
    driveFolder: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    file: emptyMarkerSchema,
    folder: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
  },
  required: [],
};
const activityDriveSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    root: driveItemSchema,
  },
  required: [],
};
const targetSchema = {
  type: "object" as const,
  properties: {
    driveItem: driveItemSchema,
    drive: activityDriveSchema,
    fileComment: {
      type: "object",
      properties: {
        legacyCommentId: { type: "string" },
        legacyDiscussionId: { type: "string" },
        linkToDiscussion: { type: "string" },
        parent: driveItemSchema,
      },
      required: [],
    },
    teamDrive: activityDriveSchema,
  },
  required: [],
};
const targetReferenceSchema = {
  type: "object" as const,
  properties: {
    driveItem: driveItemReferenceSchema,
    drive: driveReferenceSchema,
    teamDrive: driveReferenceSchema,
  },
  required: [],
};
const fieldValueSchema = {
  type: "object" as const,
  properties: {
    text: {
      type: "object",
      properties: { value: { type: "string" } },
      required: [],
    },
    textList: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "object",
            properties: { value: { type: "string" } },
            required: [],
          },
        },
      },
      required: [],
    },
    selection: {
      type: "object",
      properties: {
        value: { type: "string" },
        displayName: { type: "string" },
      },
      required: [],
    },
    selectionList: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              displayName: { type: "string" },
            },
            required: [],
          },
        },
      },
      required: [],
    },
    integer: {
      type: "object",
      properties: { value: { type: "string" } },
      required: [],
    },
    user: {
      type: "object",
      properties: { value: { type: "string" } },
      required: [],
    },
    userList: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "object",
            properties: { value: { type: "string" } },
            required: [],
          },
        },
      },
      required: [],
    },
    date: {
      type: "object",
      properties: { value: { type: "string" } },
      required: [],
    },
  },
  required: [],
};
const activityPermissionSchema = {
  type: "object" as const,
  properties: {
    role: { type: "string" },
    allowDiscovery: { type: "boolean" },
    user: activityUserSchema,
    group: groupSchema,
    domain: domainSchema,
    anyone: emptyMarkerSchema,
  },
  required: [],
};
const actionDetailSchema = {
  type: "object" as const,
  properties: {
    create: {
      type: "object",
      properties: {
        new: emptyMarkerSchema,
        upload: emptyMarkerSchema,
        copy: {
          type: "object",
          properties: { originalObject: targetReferenceSchema },
          required: [],
        },
      },
      required: [],
    },
    edit: emptyMarkerSchema,
    move: {
      type: "object",
      properties: {
        addedParents: { type: "array", items: targetReferenceSchema },
        removedParents: { type: "array", items: targetReferenceSchema },
      },
      required: [],
    },
    rename: {
      type: "object",
      properties: {
        oldTitle: { type: "string" },
        newTitle: { type: "string" },
      },
      required: [],
    },
    delete: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    restore: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    permissionChange: {
      type: "object",
      properties: {
        addedPermissions: { type: "array", items: activityPermissionSchema },
        removedPermissions: { type: "array", items: activityPermissionSchema },
      },
      required: [],
    },
    comment: {
      type: "object",
      properties: {
        mentionedUsers: { type: "array", items: activityUserSchema },
        post: {
          type: "object",
          properties: { subtype: { type: "string" } },
          required: [],
        },
        assignment: {
          type: "object",
          properties: {
            subtype: { type: "string" },
            assignedUser: activityUserSchema,
          },
          required: [],
        },
        suggestion: {
          type: "object",
          properties: { subtype: { type: "string" } },
          required: [],
        },
      },
      required: [],
    },
    dlpChange: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    reference: {
      type: "object",
      properties: { type: { type: "string" } },
      required: [],
    },
    settingsChange: {
      type: "object",
      properties: {
        restrictionChanges: {
          type: "array",
          items: {
            type: "object",
            properties: {
              feature: { type: "string" },
              newRestriction: { type: "string" },
            },
            required: [],
          },
        },
      },
      required: [],
    },
    appliedLabelChange: {
      type: "object",
      properties: {
        changes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              title: { type: "string" },
              types: { type: "array", items: { type: "string" } },
              fieldChanges: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    fieldId: { type: "string" },
                    oldValue: fieldValueSchema,
                    newValue: fieldValueSchema,
                    displayName: { type: "string" },
                  },
                  required: [],
                },
              },
            },
            required: [],
          },
        },
      },
      required: [],
    },
  },
  required: [],
};
const actionSchema = {
  type: "object" as const,
  properties: {
    detail: actionDetailSchema,
    actor: actorSchema,
    target: targetSchema,
    timestamp: { type: "string", format: "date-time" },
    timeRange: {
      type: "object",
      properties: {
        startTime: { type: "string", format: "date-time" },
        endTime: { type: "string", format: "date-time" },
      },
      required: [],
    },
  },
  required: [],
};
const driveActivitySchema = {
  type: "object" as const,
  properties: {
    primaryActionDetail: actionDetailSchema,
    actors: { type: "array", items: actorSchema },
    actions: { type: "array", items: actionSchema },
    targets: { type: "array", items: targetSchema },
    timestamp: { type: "string", format: "date-time" },
    timeRange: {
      type: "object",
      properties: {
        startTime: { type: "string", format: "date-time" },
        endTime: { type: "string", format: "date-time" },
      },
      required: [],
    },
  },
  required: [],
};
export const queryDriveActivityOutputSchema = {
  type: "object" as const,
  properties: {
    activities: { type: "array", items: driveActivitySchema },
    nextPageToken: { type: "string" },
  },
  required: [],
};
