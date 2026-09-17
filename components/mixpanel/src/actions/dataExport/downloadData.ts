import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { downloadDataInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { downloadDataExamplePayload } from "../../examplePayloads";
import { downloadDataOutputSchema } from "../../outputSchemas";
export const downloadData = action({
  display: {
    label: "Download Data",
    description:
      "Download event data as it is received and stored within Mixpanel.",
  },
  inputs: downloadDataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: downloadDataOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, dataAndDomain, from_date, to_date, project_id, filters },
  ) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.get("/export", {
      params: {
        from_date,
        to_date,
        project_id,
        limit: filters.limit,
        event: filters.event,
        where: filters.where,
      },
      headers: {
        "Accept-Encoding": filters.gzipEncoding ? "gzip" : undefined,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => downloadDataExamplePayload,
  examplePayload: downloadDataExamplePayload,
});
