import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectMobileDeviceExamplePayload } from "../examplePayloads";
import { selectMobileDeviceInputs } from "../inputs";
import type { MobileDevice } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectMobileDevice = dataSource({
  display: {
    label: "Select Mobile Device",
    description:
      "Dynamically fetch a list of mobile devices from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectMobileDeviceInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<MobileDevice>(
      client,
      "/v2/mobile-devices",
      true,
      {},
    );
    const result: Element[] = mapToSortedElements(results, "id", "name");
    return { result };
  },
  examplePayload: selectMobileDeviceExamplePayload,
});
