import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { getClosestS3EndpointResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const getClosestS3Endpoint = action({
  display: {
    label: "Get Closest S3 Upload Endpoint",
    description: "Retrieve the closest S3 upload endpoint",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(`/upload/endpoint`);
    return { data };
  },
  examplePayload: {
    data: getClosestS3EndpointResponse,
  },
});
