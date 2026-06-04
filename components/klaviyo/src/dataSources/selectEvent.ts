import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { KlaviyoApi } from "../enums/KlaviyoApi";
import { fetchEvents } from "../utils";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description: "Select an event to use.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const { data, included } = await fetchEvents(
      eventsApi,
      undefined,
      ["name"],
      undefined,
      [],
      [],
    );

    const includedData: Record<string, string> = {};

    if (included && included.length > 0) {
      included.forEach((item) => {
        if (item.type === "metric") {
          const name = item.attributes.name;
          if (name) {
            includedData[item.id] = name;
          }
        }
      });
    } else {
      throw new Error("No included data found");
    }

    const objects = data.map<Element>((event) => {
      const label = includedData[event.relationships?.metric?.data?.id ?? ""];
      return {
        key: event.id,
        label,
      };
    });

    return { result: objects };
  },
});
