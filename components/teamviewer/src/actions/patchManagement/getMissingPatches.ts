import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMissingPatchesExamplePayload } from "../../examplePayloads/patchManagement";
import { getMissingPatchesInputs } from "../../inputs/patchManagement";

export const getMissingPatches = action({
  display: {
    label: "Get Missing Patches",
    description:
      "This request will return all missing patches on the device, which id is provided in the request.",
  },
  perform: async (context, { connection, deviceId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(
      `/patchmanagement/devices/${deviceId}/patches/missing`,
    );

    return {
      data,
    };
  },
  inputs: getMissingPatchesInputs,
  examplePayload: getMissingPatchesExamplePayload,
});
