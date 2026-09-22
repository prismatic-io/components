import { action, outputSchema } from "@prismatic-io/spectral";
import { retrieveDataSourceOutputSchema } from "../../outputSchemas";
import { retrieveDataSourceInputs } from "../../inputs";
import { createClient } from "../../client";
import { retrieveDataSourceExamplePayload } from "../../examplePayloads";
export const retrieveDataSource = action({
  display: {
    label: "Retrieve Data Source",
    description:
      "Retrieve a data source object containing structural information about columns and configuration.",
  },
  inputs: retrieveDataSourceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: retrieveDataSourceOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, dataSourceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data_sources/${dataSourceId}`);
    return { data };
  },
  examplePayload: retrieveDataSourceExamplePayload,
});
