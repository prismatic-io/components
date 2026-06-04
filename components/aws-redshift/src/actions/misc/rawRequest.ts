import { action } from "@prismatic-io/spectral";
import { getRedshiftDataApiClient } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { sign } from "aws4";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Redshift Data API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { awsConnection, awsRegion, body, action }) => {
    const { client, credentials, host } = await getRedshiftDataApiClient(
      awsConnection,
      awsRegion,
      context.debug.enabled,
    );

    const requestOpts = {
      host,
      path: "/",
      service: "redshift-data",
      region: awsRegion,
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": action,
      },
      body,
    };

    sign(requestOpts, credentials);

    const { data } = await client.post("/", requestOpts.body, { headers: requestOpts.headers });

    return { data };
  },
});
