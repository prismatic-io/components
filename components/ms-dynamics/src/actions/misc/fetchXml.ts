import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { fetchXmlExamplePayload } from "../../examplePayloads";
import { fetchXmlInputs } from "../../inputs";
import { paginateFetchXml } from "../../utils/pagination";

export const fetchXml = action({
  display: {
    label: "Run Fetch XML Query",
    description: "Executes a Fetch XML query against the Microsoft Dynamics 365 CRM instance.",
  },
  examplePayload: fetchXmlExamplePayload,
  perform: async (
    context,
    {
      entityType,
      xmlQuery,
      includeAnnotations,
      pageNumber,
      nextPageId,
      impersonateUserId,
      fetchAll: shouldFetchAll,
      connection,
    }
  ) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const executeFn = async (page?: number, cookie?: string) => {
      const result = await client.fetch({
        collection: entityType,
        fetchXml: xmlQuery,
        includeAnnotations,
        pageNumber: page,
        pagingCookie: cookie,
        impersonate: impersonateUserId,
      });
      return result as unknown as Record<string, unknown>;
    };

    if (shouldFetchAll) {
      return paginateFetchXml(executeFn, true, pageNumber, nextPageId);
    }

    const result = await client.fetch({
      collection: entityType,
      fetchXml: xmlQuery,
      includeAnnotations,
      pageNumber,
      pagingCookie: nextPageId,
      impersonate: impersonateUserId,
    });
    return { data: result };
  },
  inputs: fetchXmlInputs,
});
