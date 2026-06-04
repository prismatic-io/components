import { dataSource } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../client";
import { codeResource, companyId, connectionInput } from "../inputs";

export const listCompanyCodes = dataSource({
  display: {
    label: "List Company Codes",
    description: "Get All Company Codes for the selected company and resource.",
  },
  inputs: {
    connectionInput,
    companyId,
    codeResource,
  },
  perform: async (_context, { connectionInput, companyId, codeResource }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, false);

    const { data } = await client.get(
      `/companies/${companyId}/codes/${codeResource}`,
    );
    if (Array.isArray(data) && data.length > 0) {
      const result = data.map((code: Record<string, unknown>) => ({
        label: code.description,
        key: code.code,
      }));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Resolvit USA - RTSS",
        key: "01",
      },
    ],
  },
});
