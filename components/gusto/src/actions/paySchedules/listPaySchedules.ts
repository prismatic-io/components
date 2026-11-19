import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { listPaySchedulesInputs } from "../../inputs";
import { createClient } from "../../client";
import { listPaySchedulesExamplePayload } from "../../examplePayloads";
import { fetchAllPages } from "../../util";
import { listPaySchedulesOutputSchema } from "../../outputSchemas";

export const listPaySchedules = action({
  display: {
    label: "List Pay Schedules",
    description: "Lists pay schedules for a company.",
  },
  inputs: listPaySchedulesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPaySchedulesOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/pay_schedules`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/pay_schedules`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: listPaySchedulesExamplePayload,
});
