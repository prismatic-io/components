export const accountSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    displayName: { type: "string" },
    regionCode: { type: "string" },
    createTime: { type: "string", format: "date-time" },
    updateTime: { type: "string", format: "date-time" },
    deleted: { type: "boolean" },
    gmpOrganization: { type: "string" },
  },
  required: [],
};
export const listAccountsOutputSchema = {
  type: "object" as const,
  properties: {
    accounts: { type: "array", items: accountSchema },
    nextPageToken: { type: "string" },
  },
  required: ["accounts"],
};
export const propertySchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    parent: { type: "string" },
    account: { type: "string" },
    displayName: { type: "string" },
    propertyType: {
      type: "string",
      enum: [
        "PROPERTY_TYPE_UNSPECIFIED",
        "PROPERTY_TYPE_ORDINARY",
        "PROPERTY_TYPE_SUBPROPERTY",
        "PROPERTY_TYPE_ROLLUP",
      ],
    },
    industryCategory: {
      type: "string",
      enum: [
        "INDUSTRY_CATEGORY_UNSPECIFIED",
        "AUTOMOTIVE",
        "BUSINESS_AND_INDUSTRIAL_MARKETS",
        "FINANCE",
        "HEALTHCARE",
        "TECHNOLOGY",
        "TRAVEL",
        "OTHER",
        "ARTS_AND_ENTERTAINMENT",
        "BEAUTY_AND_FITNESS",
        "BOOKS_AND_LITERATURE",
        "FOOD_AND_DRINK",
        "GAMES",
        "HOBBIES_AND_LEISURE",
        "HOME_AND_GARDEN",
        "INTERNET_AND_TELECOM",
        "LAW_AND_GOVERNMENT",
        "NEWS",
        "ONLINE_COMMUNITIES",
        "PEOPLE_AND_SOCIETY",
        "PETS_AND_ANIMALS",
        "REAL_ESTATE",
        "REFERENCE",
        "SCIENCE",
        "SPORTS",
        "JOBS_AND_EDUCATION",
        "SHOPPING",
      ],
    },
    serviceLevel: {
      type: "string",
      enum: [
        "SERVICE_LEVEL_UNSPECIFIED",
        "GOOGLE_ANALYTICS_STANDARD",
        "GOOGLE_ANALYTICS_360",
      ],
    },
    timeZone: { type: "string" },
    currencyCode: { type: "string" },
    createTime: { type: "string", format: "date-time" },
    updateTime: { type: "string", format: "date-time" },
    deleteTime: { type: "string", format: "date-time" },
    expireTime: { type: "string", format: "date-time" },
  },
  required: [],
};
export const listPropertiesOutputSchema = {
  type: "object" as const,
  properties: {
    properties: { type: "array", items: propertySchema },
    nextPageToken: { type: "string" },
  },
  required: ["properties"],
};
export const getPropertyOutputSchema = propertySchema;
const dimensionValueSchema = {
  type: "object" as const,
  properties: { value: { type: "string" } },
  required: [],
  additionalProperties: true,
};
const metricValueSchema = {
  type: "object" as const,
  properties: { value: { type: "string" } },
  required: [],
  additionalProperties: true,
};
const rowSchema = {
  type: "object" as const,
  properties: {
    dimensionValues: { type: "array", items: dimensionValueSchema },
    metricValues: { type: "array", items: metricValueSchema },
  },
  required: [],
};
const quotaStatusSchema = {
  type: "object" as const,
  properties: {
    consumed: { type: "integer", format: "int32" },
    remaining: { type: "integer", format: "int32" },
  },
  required: [],
};
export const runReportOutputSchema = {
  type: "object" as const,
  properties: {
    kind: { type: "string" },
    dimensionHeaders: {
      type: "array",
      items: {
        type: "object" as const,
        properties: { name: { type: "string" } },
        required: [],
      },
    },
    metricHeaders: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          name: { type: "string" },
          type: {
            type: "string",
            enum: [
              "METRIC_TYPE_UNSPECIFIED",
              "TYPE_INTEGER",
              "TYPE_FLOAT",
              "TYPE_SECONDS",
              "TYPE_MILLISECONDS",
              "TYPE_MINUTES",
              "TYPE_HOURS",
              "TYPE_STANDARD",
              "TYPE_CURRENCY",
              "TYPE_FEET",
              "TYPE_MILES",
              "TYPE_METERS",
              "TYPE_KILOMETERS",
            ],
          },
        },
        required: [],
      },
    },
    rows: { type: "array", items: rowSchema },
    totals: { type: "array", items: rowSchema },
    maximums: { type: "array", items: rowSchema },
    minimums: { type: "array", items: rowSchema },
    rowCount: { type: "integer", format: "int32" },
    metadata: {
      type: "object" as const,
      properties: {
        currencyCode: { type: "string" },
        timeZone: { type: "string" },
        emptyReason: { type: "string" },
        dataLossFromOtherRow: { type: "boolean" },
        subjectToThresholding: { type: "boolean" },
        samplingMetadatas: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              samplesReadCount: { type: "string", format: "int64" },
              samplingSpaceSize: { type: "string", format: "int64" },
            },
            required: [],
          },
        },
        schemaRestrictionResponse: {
          type: "object" as const,
          properties: {
            activeMetricRestrictions: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  metricName: { type: "string" },
                  restrictedMetricTypes: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "RESTRICTED_METRIC_TYPE_UNSPECIFIED",
                        "COST_DATA",
                        "REVENUE_DATA",
                      ],
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
    },
    propertyQuota: {
      type: "object" as const,
      properties: {
        tokensPerDay: quotaStatusSchema,
        tokensPerHour: quotaStatusSchema,
        concurrentRequests: quotaStatusSchema,
        serverErrorsPerProjectPerHour: quotaStatusSchema,
        potentiallyThresholdedRequestsPerHour: quotaStatusSchema,
        tokensPerProjectPerHour: quotaStatusSchema,
      },
      required: [],
    },
  },
  required: [],
};
export const sendMeasurementProtocolEventsOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};
