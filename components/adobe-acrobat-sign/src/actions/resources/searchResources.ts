import { action } from "@prismatic-io/spectral";
import { searchResourcesInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { searchResourcesExamplePayload } from "../../examplePayloads";
import type { SearchRequestBody } from "../../types";

export const searchResources = action({
  display: {
    label: "Search Resources",
    description:
      "Retrieves, searches, filters, and sorts agreements for the authenticated user.",
  },
  inputs: searchResourcesInputs,
  perform: async (
    context,
    {
      connection,
      assetId,
      libraryDocumentId,
      pageSize,
      parentId,
      participantEmail,
      queryableFields,
      searchQuery,
      searchRole,
      searchStatus,
      searchType,
      searchUserId,
      searchWorkflowId,
      sortByField,
      sortOrder,
      startIndex,
      subTypes,
      visibility,
      externalId,
      groupId,
      ownershipScope,
      dateGreaterThanCreatedDate,
      dateGreaterThanExpirationDate,
      dateGreaterThanModifiedDate,
      dateLessThanCreatedDate,
      dateLessThanExpirationDate,
      dateLessThanModifiedDate,
      dateMaxCreatedDate,
      dateMaxExpirationDate,
      dateMaxModifiedDate,
      dateMinCreatedDate,
      dateMinExpirationDate,
      dateMinModifiedDate,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const payload: SearchRequestBody = {
      scope: ["AGREEMENT_ASSETS"],
      query: searchQuery,
      agreementAssetsCriteria: {
        createdDate: {
          range: {
            max: dateMaxCreatedDate,
            min: dateMinCreatedDate,
            gt: dateGreaterThanCreatedDate,
            lt: dateLessThanCreatedDate,
          },
        },
        expirationDate: {
          range: {
            max: dateMaxExpirationDate,
            min: dateMinExpirationDate,
            gt: dateGreaterThanExpirationDate,
            lt: dateLessThanExpirationDate,
          },
        },
        modifiedDate: {
          range: {
            max: dateMaxModifiedDate,
            min: dateMinModifiedDate,
            gt: dateGreaterThanModifiedDate,
            lt: dateLessThanModifiedDate,
          },
        },
        externalId,
        groupId,
        id: assetId,
        libraryDocumentId,
        pageSize,
        parentId,
        participantEmail,
        queryableFields,
        role: searchRole,
        sortByField,
        sortOrder,
        startIndex,
        status: searchStatus.length > 0 ? searchStatus : undefined,
        subTypes: [subTypes],
        type: [searchType],
        userId: searchUserId,
        visibility,
        workflowId: searchWorkflowId,
      },
    };

    const { data } = await client.post("/search", payload, {
      headers: {
        ["x-ownership-scope"]: ownershipScope,
      },
    });

    return {
      data,
    };
  },
  examplePayload: searchResourcesExamplePayload,
});
