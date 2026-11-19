import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { listEmployeesInputs } from "../../inputs";
import { createClient } from "../../client";
import { listEmployeesExamplePayload } from "../../examplePayloads";
import { fetchAllPages } from "../../util";
import { listEmployeesOutputSchema } from "../../outputSchemas";

export const listEmployees = action({
  display: {
    label: "List Employees",
    description: "Lists employees of a company.",
  },
  inputs: listEmployeesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEmployeesOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/employees`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/employees`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: listEmployeesExamplePayload,
});
