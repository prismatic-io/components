import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTimezoneExamplePayload } from "../examplePayloads";
import { selectTimezoneInputs } from "../inputs";
import { computeEndpointBasedOnConnection } from "../util";

export const selectTimezone = dataSource({
  display: {
    label: "Select Timezone",
    description: "Select a timezone from the list of supported timezones.",
  },
  inputs: selectTimezoneInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { alias: string; displayName: string }[];
    }>(computeEndpointBasedOnConnection(connection, "/me/outlook/supportedTimeZones"));

    const result = data.value.map<Element>((timezone) => ({
      label: `${timezone.displayName} (${timezone.alias})`,
      key: util.types.toString(timezone.alias),
    }));
    return { result };
  },
  examplePayload: selectTimezoneExamplePayload,
  dataSourceType: "picklist",
});
