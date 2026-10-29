import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import {
  companyId,
  connectionInput,
  includeTotalCount,
  limit,
  offset,
} from "../../inputs";

export const getCompanyDocuments = action({
  display: {
    label: "Get Company Documents",
    description: "Retrieve Company Documents by Company ID",
  },
  inputs: {
    connectionInput,
    companyId,
    includeTotalCount,
    limit,
    offset,
  },
  perform: async (
    context,
    { connectionInput, companyId, includeTotalCount, limit, offset },
  ) => {
    validateV1Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/documents/v1/companies/${companyId}/companyDocuments`,
      {
        params: {
          includeTotalCount: includeTotalCount || undefined,
          limit: limit || undefined,
          offset: offset || undefined,
        },
      },
    );
    return {
      data,
    };
  },
});
