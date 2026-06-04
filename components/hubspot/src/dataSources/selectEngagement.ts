import { URLSearchParams } from "node:url";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { ENGAGEMENT_OBJECTS } from "../constants/engagementObjects";
import { ENGAGEMENT_PROPERTIES } from "../constants/engagementProperties";
import { selectEngagementInputs } from "../inputs";
import type { Engagement } from "../types/Engagement";
import {
  addUrlSearchParamsFromStringArray,
  getAllPaginatedData,
  getEngagementObjectLabel,
} from "../util";

export const selectEngagement = dataSource({
  display: {
    label: "Select Engagement",
    description: "Select an engagement from the list of engagements.",
  },
  inputs: selectEngagementInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const allEngagements = ENGAGEMENT_OBJECTS.map((engagementObject) => {
      return getAllPaginatedData<Engagement>(
        client,
        `/crm/v3/objects/${engagementObject.value}`,
        true,
        true,
        {
          params: addUrlSearchParamsFromStringArray(
            new URLSearchParams(),
            ENGAGEMENT_PROPERTIES.map((engagementProperty) => engagementProperty.value),
            "properties",
          ),
        },
      );
    });

    const engagements = (await Promise.all(allEngagements)) as Engagement[][];
    const allResults: Element[] = [];
    ENGAGEMENT_OBJECTS.forEach(({ label }, index) => {
      const result = engagements[index].map<Element>((engagement) => ({
        label: `${getEngagementObjectLabel(engagement.properties)} (${label})`,
        key: util.types.toString(engagement.id),
      }));

      if (result.length > 0) {
        allResults.push(...result);
      }
    });
    return { result: allResults };
  },
  dataSourceType: "picklist",
});
