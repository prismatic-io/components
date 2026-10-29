import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMobileDeviceExamplePayload } from "../../examplePayloads";
import { getMobileDeviceInputs } from "../../inputs";
import type { MobileDeviceDetail } from "../../types";

export const getMobileDevice = action({
  display: {
    label: "Get Mobile Device",
    description: "Get a single mobile device record by ID.",
  },
  inputs: getMobileDeviceInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<MobileDeviceDetail>(
      `/v2/mobile-devices/${resourceId}`,
    );
    return { data };
  },
  examplePayload: getMobileDeviceExamplePayload,
});
