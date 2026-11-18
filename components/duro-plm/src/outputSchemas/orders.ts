import {
  nullableDateTime,
  nullableInteger,
  nullableString,
  userSummarySchema,
} from "./shared";

const changeOrderStatusEnum = ["CLOSED", "DRAFT", "OPEN", null];
const changeOrderTypeEnum = ["DCO", "ECO", "MCO", null];
const changeOrderResolutionEnum = [
  "APPROVED",
  "FINALIZING",
  "NONE",
  "REJECTED",
  "UNRESOLVED",
  null,
];
const ecoDefaultApprovalEnum = ["FIRST_IN", "MAJORITY", "UNANIMOUS", null];
const erpItemTypeEnum = [
  "LOT_NUMBERED",
  "NONE",
  "SERIALIZED",
  "STANDARD",
  null,
];
const documentStatusEnum = ["COMPLETED", "ERROR", "NONE", "PROCESSING", null];

const changeOrderCommonProperties = {
  id: nullableString,
  description: nullableString,
  name: nullableString,
  status: { type: ["string", "null"], enum: changeOrderStatusEnum },
  type: { type: ["string", "null"], enum: changeOrderTypeEnum },
  created: nullableDateTime,
  creator: userSummarySchema,
};

export const createChangeOrderOutputSchema = {
  type: "object" as const,
  properties: {
    createChangeOrder: {
      type: ["object", "null"],
      properties: {
        ...changeOrderCommonProperties,
        con: {
          type: ["object", "null"],
          properties: { displayValue: nullableString },
          required: ["displayValue"],
        },
      },
      required: [
        "id",
        "con",
        "description",
        "name",
        "status",
        "type",
        "created",
        "creator",
      ],
    },
  },
  required: ["createChangeOrder"],
};

export const listChangeOrdersOutputSchema = {
  type: "object" as const,
  properties: {
    changeOrders: {
      type: ["object", "null"],
      properties: {
        connection: {
          type: ["object", "null"],
          properties: {
            edges: {
              type: ["array", "null"],
              items: {
                type: ["object", "null"],
                properties: {
                  node: {
                    type: ["object", "null"],
                    properties: {
                      ...changeOrderCommonProperties,
                      con: {
                        type: ["object", "null"],
                        properties: {
                          id: nullableString,
                          displayValue: nullableString,
                        },
                        required: ["id", "displayValue"],
                      },
                      documentLinks: {
                        type: ["array", "null"],
                        items: {
                          type: ["object", "null"],
                          properties: {
                            document: {
                              type: ["object", "null"],
                              properties: {
                                id: nullableString,
                                size: nullableInteger,
                                src: nullableString,
                                name: nullableString,
                                url: nullableString,
                                status: {
                                  type: ["string", "null"],
                                  enum: documentStatusEnum,
                                },
                                created: nullableDateTime,
                              },
                              required: [
                                "id",
                                "size",
                                "src",
                                "name",
                                "url",
                                "status",
                                "created",
                              ],
                            },
                          },
                          required: ["document"],
                        },
                      },
                      resolution: {
                        type: ["string", "null"],
                        enum: changeOrderResolutionEnum,
                      },
                      erpOptions: {
                        type: ["object", "null"],
                        properties: {
                          effectivity: {
                            type: ["object", "null"],
                            properties: {
                              endDate: nullableDateTime,
                              startDate: nullableDateTime,
                            },
                            required: ["endDate", "startDate"],
                          },
                          itemType: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: ["string", "null"],
                                enum: erpItemTypeEnum,
                              },
                            },
                            required: ["value"],
                          },
                        },
                        required: ["effectivity", "itemType"],
                      },
                      approvalType: {
                        type: ["string", "null"],
                        enum: ecoDefaultApprovalEnum,
                      },
                      lastModified: nullableDateTime,
                    },
                    required: [
                      "con",
                      "id",
                      "name",
                      "type",
                      "description",
                      "documentLinks",
                      "status",
                      "resolution",
                      "erpOptions",
                      "created",
                      "creator",
                      "approvalType",
                      "lastModified",
                    ],
                  },
                },
                required: ["node"],
              },
            },
          },
          required: ["edges"],
        },
      },
      required: ["connection"],
    },
  },
  required: ["changeOrders"],
};
