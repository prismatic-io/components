export const listCategoriesOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          activated: { type: "boolean" },
          allowDuplicateRevisions: { type: "boolean" },
          allowManualRevisionEntry: { type: "boolean" },
          assignable: { type: "boolean" },
          creationDateTime: { type: "string" },
          creator: {
            type: "object",
            properties: {
              email: { type: "string" },
              fullName: { type: "string" },
              guid: { type: "string" },
            },
          },
          description: { type: "string" },
          effectivityType: {
            type: "string",
            enum: [
              "PERMANENT_ON_APPROVAL",
              "PERMANENT_ON_DATE",
              "TEMPORARY",
              "PERMANENT",
              "IMMEDIATE",
            ],
          },
          enforceDefaultEffectivityType: { type: "boolean" },
          enforceDefaultNumberSequence: { type: "boolean" },
          guid: { type: "string" },
          initialImplementationStatus: {
            type: "string",
            enum: [
              "NOT_STARTED",
              "IN_PROGRESS",
              "NEEDS_ATTENTION",
              "DONE",
              "BLANK",
              "CANCELED",
            ],
          },
          level: { type: "integer", format: "int32" },
          name: { type: "string" },
          numberingSequencePrefixDefault: {
            type: "object",
            properties: { guid: { type: "string" }, value: { type: "string" } },
          },
          parentCategory: {
            type: "object",
            properties: { guid: { type: "string" }, name: { type: "string" } },
          },
          path: { type: "string" },
          structural: { type: "boolean" },
          systemDefined: { type: "boolean" },
          numberFormat: {
            type: "object",
            properties: {
              guid: { type: "string" },
              fields: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    guid: { type: "string" },
                    value: { type: "string" },
                  },
                },
              },
            },
          },
          requirements: {
            type: "array",
            items: {
              type: "object",
              properties: {
                assignee: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    fullName: { type: "string" },
                    guid: { type: "string" },
                  },
                },
                creationDateTime: { type: "string" },
                creator: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    fullName: { type: "string" },
                    guid: { type: "string" },
                  },
                },
                modifier: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    fullName: { type: "string" },
                    guid: { type: "string" },
                  },
                },
                modificationDateTime: { type: "string" },
                description: { type: "string" },
                guid: { type: "string" },
                title: { type: "string" },
                number: { type: "string" },
                priority: { type: "string" },
                status: {
                  type: "object",
                  properties: {
                    guid: { type: "string" },
                    value: { type: "string" },
                    code: { type: "string" },
                  },
                },
                template: {
                  type: "object",
                  properties: {
                    guid: { type: "string" },
                    name: { type: "string" },
                  },
                },
                additionalAttributes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      apiName: { type: "string" },
                      fieldType: {
                        type: "string",
                        enum: [
                          "SINGLE_LINE_TEXT",
                          "MULTI_LINE_TEXT",
                          "DROP_DOWN",
                          "FIXED_DROP_DOWN",
                          "DATE",
                          "NUMBER",
                          "BOOLEAN",
                          "INTEGER",
                          "OBJECT",
                          "POSITIVE_DOUBLE",
                          "POSITIVE_INTEGER",
                          "RICH_TEXT",
                          "GUID",
                          "DATETIME",
                          "COST",
                          "LIST",
                          "ENUM",
                        ],
                      },
                      guid: { type: "string" },
                      multiSelect: { type: "boolean" },
                      name: { type: "string" },
                      value: {},
                    },
                  },
                },
              },
            },
          },
          evaluatorGroupDefault: {
            type: "object",
            properties: { guid: { type: "string" }, name: { type: "string" } },
          },
        },
      },
    },
    count: { type: "integer", format: "int32" },
  },
};
