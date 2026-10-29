import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import {
  companyId,
  connectionInput,
  includeTotalCount,
  limit,
  offset,
} from "../../inputs";

export const getEmployeeDocuments = action({
  display: {
    label: "Get Employee Documents",
    description: "Retrieve Employee Documents by Company ID",
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
      `/documents/v1/companies/${companyId}/employeeDocuments`,
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
