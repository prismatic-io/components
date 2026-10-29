import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getDataChangesByIdExamplePayload } from "../../examplePayloads";
import { getDataChangesByIdInputs } from "../../inputs";
import { getDataChangesByIdOutputSchema } from "../../outputSchemas";

export const getDataChangesById = action({
  display: {
    label: "Get Data Change by ID",
    description:
      "Retrieves the data change with the specified ID. A data change is a Prism artifact used to load data into a Prism table for analysis in downstream applications such as Discovery Board, Reports, Accounting Center, and People Analytics.",
  },
  performSafety: "safe",
  perform: async (context, { connection, tenant, dataChangeId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/dataChanges/${dataChangeId}`,
    );
    return {
      data,
    };
  },
  inputs: getDataChangesByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDataChangesByIdOutputSchema,
  }),
  examplePayload: getDataChangesByIdExamplePayload,
});
