import { fieldWarningSchema } from "./common";

const openObject = <T extends object>(properties: T) => ({
  type: "object",
  properties,
  required: [],
  additionalProperties: true,
});

const int64String = { type: "string" };

const recordCountsSchema = (countKey: string) =>
  openObject({ recordCount: int64String, [countKey]: int64String });

const dataTypeCountsSchema = {
  type: "array",
  items: openObject({ type: { type: "string" }, count: int64String }),
};

const productAccountSchema = openObject({
  accountType: { type: "string" },
  accountId: { type: "string" },
  product: { type: "string" },
});

const reasonCountsSchema = {
  type: "array",
  items: openObject({ recordCount: int64String, reason: { type: "string" } }),
};

export const audienceMembersRequestOutputSchema = {
  type: "object" as const,
  properties: {
    requestId: { type: "string" },
    fieldWarnings: { type: "array", items: fieldWarningSchema },
  },
  required: [],
  additionalProperties: true,
};

export const getRequestStatusOutputSchema = {
  type: "object" as const,
  properties: {
    requestStatusPerDestination: {
      type: "array",
      items: openObject({
        destination: openObject({
          reference: { type: "string" },
          productDestinationId: { type: "string" },
          loginAccount: productAccountSchema,
          linkedAccount: productAccountSchema,
          operatingAccount: productAccountSchema,
        }),
        requestStatus: {
          type: "string",
          enum: [
            "REQUEST_STATUS_UNKNOWN",
            "SUCCESS",
            "PROCESSING",
            "FAILED",
            "PARTIAL_SUCCESS",
          ],
        },
        errorInfo: openObject({ errorCounts: reasonCountsSchema }),
        warningInfo: openObject({ warningCounts: reasonCountsSchema }),
        audienceMembersIngestionStatus: openObject({
          userDataIngestionStatus: openObject({
            recordCount: int64String,
            userIdentifierCount: int64String,
            uploadMatchRateRange: { type: "string" },
          }),
          mobileDataIngestionStatus: recordCountsSchema("mobileIdCount"),
          pairDataIngestionStatus: recordCountsSchema("pairIdCount"),
          userIdDataIngestionStatus: recordCountsSchema("userIdCount"),
          ppidDataIngestionStatus: recordCountsSchema("ppidCount"),
          googleUserIdDataIngestionStatus:
            recordCountsSchema("googleUserIdCount"),
          partnerProvidedIdDataIngestionStatus: recordCountsSchema(
            "partnerProvidedIdCount",
          ),
          compositeDataIngestionStatus: openObject({
            recordCount: int64String,
            uploadMatchRateRange: { type: "string" },
            dataTypeCounts: dataTypeCountsSchema,
          }),
        }),
        audienceMembersRemovalStatus: openObject({
          userDataRemovalStatus: recordCountsSchema("userIdentifierCount"),
          mobileDataRemovalStatus: recordCountsSchema("mobileIdCount"),
          pairDataRemovalStatus: recordCountsSchema("pairIdCount"),
          userIdDataRemovalStatus: recordCountsSchema("userIdCount"),
          ppidDataRemovalStatus: recordCountsSchema("ppidCount"),
          googleUserIdDataRemovalStatus:
            recordCountsSchema("googleUserIdCount"),
          partnerProvidedIdDataRemovalStatus: recordCountsSchema(
            "partnerProvidedIdCount",
          ),
          compositeDataRemovalStatus: openObject({
            recordCount: int64String,
            dataTypeCounts: dataTypeCountsSchema,
          }),
        }),
        removeAllAudienceMembersStatus: openObject({}),
        eventsIngestionStatus: openObject({ recordCount: int64String }),
      }),
    },
  },
  required: [],
  additionalProperties: true,
};
