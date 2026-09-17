import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { createGCSPipelineInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { createGCSPipelineExamplePayload } from "../../examplePayloads";
import { createGCSPipelineOutputSchema } from "../../outputSchemas";
export const createGCSPipeline = action({
  display: {
    label: "Create GCS Pipeline",
    description: "This request creates an export pipeline.",
  },
  inputs: createGCSPipelineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createGCSPipelineOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, dataAndDomain, ...params }) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const body = new URLSearchParams({
      data_format: "json",
      data_source: "events",
      type: "gcs-raw",
    });
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        if (Array.isArray(value)) {
          body.append(key, value.toString());
        } else {
          body.append(key, value);
        }
      }
    }
    const { data } = await client.post("/nessie/pipeline/create", body, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createGCSPipelineExamplePayload,
  examplePayload: createGCSPipelineExamplePayload,
});
