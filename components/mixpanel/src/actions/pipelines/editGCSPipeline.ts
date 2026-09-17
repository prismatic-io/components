import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { editGCSPipelineInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { editGCSPipelineExamplePayload } from "../../examplePayloads";
export const editGCSPipeline = action({
  display: {
    label: "Edit GCS Pipeline",
    description: "This request edit the params for an export pipeline.",
  },
  inputs: editGCSPipelineInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dataAndDomain, ...params }) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        if (Array.isArray(value)) {
          body.append(key, value.toString());
        } else {
          body.append(key, value);
        }
      }
    }
    const { data } = await client.post("/nessie/pipeline/edit", body, {
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
  }> => editGCSPipelineExamplePayload,
  examplePayload: editGCSPipelineExamplePayload,
});
