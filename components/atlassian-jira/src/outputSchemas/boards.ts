import { sprintBeanSchema } from "./common";

export const getBoardOutputSchema = {
  type: "object" as const,
  properties: {
    admins: {
      type: "object" as const,
      properties: {
        groups: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              name: {
                type: "string",
              },
              self: {
                type: "string",
                format: "uri",
              },
            },
          },
        },
        users: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              accountId: {
                type: "string",
              },
              active: {
                type: "boolean",
              },
              avatarUrls: {
                type: "object" as const,
                properties: {
                  "16x16": {
                    type: "string",
                    format: "uri",
                  },
                  "24x24": {
                    type: "string",
                    format: "uri",
                  },
                  "32x32": {
                    type: "string",
                    format: "uri",
                  },
                  "48x48": {
                    type: "string",
                    format: "uri",
                  },
                },
              },
              displayName: {
                type: "string",
              },
              key: {
                type: "string",
              },
              name: {
                type: "string",
              },
              self: {
                type: "string",
                format: "uri",
              },
            },
          },
        },
      },
    },
    canEdit: {
      type: "boolean",
    },
    favourite: {
      type: "boolean",
    },
    id: {
      type: "integer",
      format: "int64",
    },
    isPrivate: {
      type: "boolean",
    },
    location: {
      type: "object" as const,
      properties: {
        avatarURI: {
          type: "string",
          format: "uri",
        },
        displayName: {
          type: "string",
        },
        name: {
          type: "string",
        },
        projectId: {
          type: "integer",
          format: "int64",
        },
        projectKey: {
          type: "string",
        },
        projectName: {
          type: "string",
        },
        projectTypeKey: {
          type: "string",
        },
        userAccountId: {
          type: "string",
        },
        userId: {
          type: "integer",
          format: "int64",
        },
      },
    },
    name: {
      type: "string",
    },
    self: {
      type: "string",
      format: "uri",
    },
    type: {
      type: "string",
    },
  },
};

export const listBoardsOutputSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
      format: "int32",
    },
    startAt: {
      type: "integer",
      format: "int64",
    },
    total: {
      type: "integer",
      format: "int64",
    },
    values: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          admins: {
            type: "object" as const,
            properties: {
              groups: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    name: {
                      type: "string",
                    },
                    self: {
                      type: "string",
                      format: "uri",
                    },
                  },
                },
              },
              users: {
                type: "array",
                items: {
                  type: "object" as const,
                  properties: {
                    accountId: {
                      type: "string",
                    },
                    active: {
                      type: "boolean",
                    },
                    avatarUrls: {
                      type: "object" as const,
                      properties: {
                        "16x16": {
                          type: "string",
                          format: "uri",
                        },
                        "24x24": {
                          type: "string",
                          format: "uri",
                        },
                        "32x32": {
                          type: "string",
                          format: "uri",
                        },
                        "48x48": {
                          type: "string",
                          format: "uri",
                        },
                      },
                    },
                    displayName: {
                      type: "string",
                    },
                    key: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    self: {
                      type: "string",
                      format: "uri",
                    },
                  },
                },
              },
            },
          },
          canEdit: {
            type: "boolean",
          },
          favourite: {
            type: "boolean",
          },
          id: {
            type: "integer",
            format: "int64",
          },
          isPrivate: {
            type: "boolean",
          },
          location: {
            type: "object" as const,
            properties: {
              avatarURI: {
                type: "string",
                format: "uri",
              },
              displayName: {
                type: "string",
              },
              name: {
                type: "string",
              },
              projectId: {
                type: "integer",
                format: "int64",
              },
              projectKey: {
                type: "string",
              },
              projectName: {
                type: "string",
              },
              projectTypeKey: {
                type: "string",
              },
              userAccountId: {
                type: "string",
              },
              userId: {
                type: "integer",
                format: "int64",
              },
            },
          },
          name: {
            type: "string",
          },
          self: {
            type: "string",
            format: "uri",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export const listBoardsSprintsOutputSchema = {
  type: "object" as const,
  properties: {
    isLast: {
      type: "boolean",
    },
    maxResults: {
      type: "integer",
    },
    startAt: {
      type: "integer",
    },
    total: {
      type: "integer",
    },
    values: {
      type: "array",
      items: sprintBeanSchema,
    },
  },
};
