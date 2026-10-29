import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPackageExamplePayload } from "../../examplePayloads";
import { getPackageInputs } from "../../inputs";
import type { Package } from "../../types";

export const getPackage = action({
  display: {
    label: "Get Package",
    description: "Get a single package record by ID.",
  },
  inputs: getPackageInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Package>(`/v1/packages/${resourceId}`);
    return { data };
  },
  examplePayload: getPackageExamplePayload,
});
