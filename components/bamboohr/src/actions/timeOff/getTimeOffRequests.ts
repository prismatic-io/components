import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { getTimeOffRequestsExamplePayload } from "../../examplePayloads";
import { getTimeOffRequestsInputs } from "../../inputs";
import { getTimeOffRequestsOutputSchema } from "../../outputSchemas";
import { filterFalseyValues } from "../../util";

export const getTimeOffRequests = action({
  display: {
    label: "List Time Off Requests",
    description: "List employee time off requests for a given date range.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const queryParams = filterFalseyValues({
      id: params.timeOffRecordId,
      employeeId: params.employeeId,
      start: params.startDate,
      end: params.endDate,
      status: params.timeOffStatus,
    });
    const { data } = await client.get("/v1/time_off/requests/", {
      params: queryParams,
    });
    return { data };
  },
  examplePerform: async () => getTimeOffRequestsExamplePayload,
  inputs: getTimeOffRequestsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeOffRequestsOutputSchema,
  }),
  examplePayload: getTimeOffRequestsExamplePayload,
});
