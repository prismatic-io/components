import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { listCompanyAdminsInputs } from "../../inputs";
import { createClient } from "../../client";
import { listCompanyAdminsExamplePayload } from "../../examplePayloads";
import { fetchAllPages } from "../../util";
import { listCompanyAdminsOutputSchema } from "../../outputSchemas";

export const listCompanyAdmins = action({
  display: {
    label: "List Company Admins",
    description: "Lists all admin users at a company.",
  },
  inputs: listCompanyAdminsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompanyAdminsOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/admins`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/admins`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: listCompanyAdminsExamplePayload,
});
