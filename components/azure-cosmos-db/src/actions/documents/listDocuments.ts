import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { listDocumentsInputs } from "../../inputs";
import { listDocumentsExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const listDocuments = action({
  display: {
    label: "List Documents",
    description: "List all documents in a collection",
  },
  perform: async (
    context,
    {
      connection,
      databaseId,
      collectionId,
      maxItemCount,
      continuationToken,
      fetchAll,
    },
  ) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: context.debug.enabled,
    });

    const headers: Record<string, string> = {
      "x-ms-max-item-count": (!fetchAll ? (maxItemCount ?? -1) : -1).toString(),
    };

    if (continuationToken && !fetchAll) {
      headers["x-ms-continuation"] = continuationToken;
    }

    const { data: firstData, headers: firstHeaders } = await client.get(
      `/${resourceLink}/docs`,
      {
        headers,
      },
    );

    let allDocuments = firstData.Documents || [];
    const firstContinuationToken = firstHeaders["x-ms-continuation"];

    if (!fetchAll) {
      return {
        data: {
          ...firstData,
          continuationToken: firstContinuationToken,
        },
      };
    }

    let nextContinuationToken = firstContinuationToken;
    while (nextContinuationToken) {
      const pageHeaders: Record<string, string> = {
        "x-ms-max-item-count": "-1",
        "x-ms-continuation": nextContinuationToken,
      };

      const { data: nextData, headers: nextHeaders } = await client.get(
        `/${resourceLink}/docs`,
        {
          headers: pageHeaders,
        },
      );

      allDocuments = allDocuments.concat(nextData.Documents || []);
      nextContinuationToken = nextHeaders["x-ms-continuation"];
    }

    return {
      data: {
        ...firstData,
        Documents: allDocuments,
        _count: allDocuments.length,
        continuationToken: undefined,
      },
    };
  },
  inputs: listDocumentsInputs,
  examplePayload: listDocumentsExamplePayload,
});
