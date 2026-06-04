import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import {
  connectionInput,
  project_id,
  dataAndDomain,
  eventArray,
  where,
  name,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { editGCSPipelineExamplePayload } from "../../examplePayloads";

export const editGCSPipeline = action({
  display: {
    label: "Edit GCS Pipeline",
    description: "This request edit the params for an export pipeline.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    name,
    project_id: {
      ...project_id,
      comments:
        "Your project id (must be specified when using service account based authentication)",
    },
    events: eventArray,
    where: {
      ...where,
      comments:
        "A selector expression used to filter by events data, such as event properties. Please note that after this update, the sync of older dates to your data warehouse (if enabled) will only contain events matching your new where clause.",
    },
  },
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
  examplePayload: editGCSPipelineExamplePayload,
});
