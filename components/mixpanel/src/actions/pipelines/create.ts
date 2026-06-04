import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import {
  connectionInput,
  project_id,
  dataAndDomain,
  trial,
  from_date,
  to_date,
  frequency,
  eventArray,
  where,
  gcs_bucket,
  gcs_prefix,
  gcs_region,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { createGCSPipelineExamplePayload } from "../../examplePayloads";

export const createGCSPipeline = action({
  display: {
    label: "Create GCS Pipeline",
    description: "This request creates an export pipeline.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    gcs_bucket,
    gcs_prefix,
    gcs_region,
    project_id: {
      ...project_id,
      comments:
        "Your project id (must be specified when using service account based authentication)",
    },
    from_date: {
      ...from_date,
      comments:
        "The starting date of the export window. It is formatted as YYYY-MM-DD and cannot be more than six months in the past. If trial is set to true this will default to the previous day; otherwise, it is a required parameter.",
    },
    to_date: {
      ...to_date,
      comments:
        "The ending date of the export window. It is formatted as YYYY-MM-DD. The export will continue indefinitely if to_date is empty.",
      required: false,
    },
    trial,
    frequency,
    events: eventArray,
    where: {
      ...where,
      comments:
        "A selector expression used to filter by events data, such as event properties. Learn more about how to construct event selector expressions here.",
    },
  },
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
  examplePayload: createGCSPipelineExamplePayload,
});
