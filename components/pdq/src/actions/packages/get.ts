import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { getPackageExamplePayload } from "../../examplePayloads/packages";
import { connection } from "../../inputs/general";
import { getPackageInputs } from "../../inputs/packages/get";

export const getPackage = action({
  display: {
    label: "Get Package",
    description: "Retrieve a package by ID",
  },
  inputs: {
    ...getPackageInputs,
    connection,
  },
  perform: async (context, { connection, packageId }) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const { data } = await client.get(`/packages/${packageId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getPackageExamplePayload,
  },
});
