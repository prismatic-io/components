import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getClockingTransactionExamplePayload } from "../../examplePayloads";
import { getClockingTransactionInputs } from "../../inputs";
import { getClockingTransactionOutputSchema } from "../../outputSchemas";

export const getClockingTransaction = action({
  display: {
    label: "Get Clocking Transaction",
    description:
      "Returns the status of a previously submitted clocking transaction such as “Clock-In”, “Clock-Out,” “Scan”, etc.",
  },
  inputs: getClockingTransactionInputs,
  performSafety: "safe",
  perform: async (context, { connection, eventID }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/events/time/v1/data-collection-entries.process/${eventID}`,
    );
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getClockingTransactionOutputSchema,
  }),
  examplePayload: getClockingTransactionExamplePayload,
});
