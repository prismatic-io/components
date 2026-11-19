import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { getPayScheduleInputs } from "../../inputs";
import { createClient } from "../../client";
import { getPayScheduleExamplePayload } from "../../examplePayloads";
import { getPayScheduleOutputSchema } from "../../outputSchemas";

export const getPaySchedule = action({
  display: {
    label: "Get Pay Schedule by ID",
    description: "Gets a pay schedule for a company by pay schedule ID.",
  },
  inputs: getPayScheduleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPayScheduleOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/companies/${params.companyId}/pay_schedules/${params.payScheduleId}`,
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.SAFE,
  examplePayload: getPayScheduleExamplePayload,
});
