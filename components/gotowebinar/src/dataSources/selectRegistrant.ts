import { dataSource, Element } from "@prismatic-io/spectral";
import { connection, webinarKey } from "../inputs/general";
import { createGotoWebinarClient } from "../client";
import { Registrant } from "../interfaces";
import { bigIntTransformerConfig, parseRegistrantKey } from "../utils";

export const selectRegistrant = dataSource({
  display: {
    label: "Select Registrant",
    description:
      "Select a registrant from a list of registrants for a webinar.",
  },
  inputs: {
    connection,
    webinarKey: {
      ...webinarKey,
      dataSource: undefined,
    },
  },
  perform: async (context, { connection, webinarKey }) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, false);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants`;

    const { data } = await client.get<Registrant[]>(url, {
      transformResponse: bigIntTransformerConfig.transformResponse,
    });

    if (!data || data.length === 0) {
      return {
        result: [],
      };
    }

    const result = data
      .map(
        (registrant): Element => ({
          key: parseRegistrantKey(registrant.registrantKey.c),
          label: `${registrant.firstName} ${registrant.lastName} (${registrant.email})`,
        }),
      )
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
