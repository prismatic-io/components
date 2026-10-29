import { dataSource, type Element } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../client";
import { selectDocumentInputs } from "../inputs";
import { CosmosDbResourceType, HttpVerb } from "../constants";

export const selectDocument = dataSource({
  display: {
    label: "Select Document",
    description: "Select a document from the list of documents in a collection",
  },
  inputs: selectDocumentInputs,
  perform: async (_context, { connection, databaseId, collectionId }) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: false,
    });

    const headers: Record<string, string> = {
      "x-ms-max-item-count": "-1",
    };

    const { data: firstData, headers: firstHeaders } = await client.get(
      `/${resourceLink}/docs`,
      {
        headers,
      },
    );

    let allDocuments: { id: string }[] = firstData.Documents || [];
    const firstContinuationToken = firstHeaders["x-ms-continuation"];

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

    const result = allDocuments.map<Element>((document) => ({
      label: document.id,
      key: document.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});
