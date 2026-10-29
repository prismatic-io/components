import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { getApplicationV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { getApplicationV3Inputs } from "../../../inputs/v3/applications";
import type { V3Application } from "../../../types";

export const getApplicationV3 = action({
  display: {
    label: "Get Application",
    description: "Retrieves a single application by ID.",
  },
  perform: async (context, { connection, applicationId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.get<V3Application[]>("/applications", {
      params: { ids: applicationId },
    });
    return { data: data[0] ?? null };
  },
  inputs: getApplicationV3Inputs,
  examplePayload: getApplicationV3ExamplePayload,
});
