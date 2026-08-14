import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { PACKAGES_ENDPOINT } from "../../constants";
import { getPackageExamplePayload } from "../../examplePayloads/packages";
import { getPackageInputs } from "../../inputs";
import { getPackageOutputSchema } from "../../outputSchemas";
export const getPackage = action({
  display: {
    label: "Get Package",
    description: "Retrieve a package by ID.",
  },
  inputs: getPackageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPackageOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, packageId }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const { data } = await client.get(`${PACKAGES_ENDPOINT}/${packageId}`);
    return {
      data,
    };
  },
  examplePayload: getPackageExamplePayload,
});
