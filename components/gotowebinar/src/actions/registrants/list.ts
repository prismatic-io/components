import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { LIST_REGISTRANTS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { listRegistrantsInputs } from "../../inputs/registrants/listRegistrantsInputs";
import { bigIntTransformerConfig, parseRegistrantKey } from "../../utils";
import { Registrant } from "../../interfaces";

export const listRegistrants = action({
  display: {
    label: "List Registrants",
    description:
      "Retrieve registration details for all registrants of a specific webinar.",
  },
  inputs: listRegistrantsInputs,
  examplePayload: LIST_REGISTRANTS_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, page, limit },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
    const params = {
      page,
      limit,
    };

    const { data } = await client.get<Registrant[]>(url, {
      params,
      transformResponse: bigIntTransformerConfig.transformResponse,
    });

    const parsedResponse = data.map((registrant) => ({
      ...registrant,
      registrantKey: parseRegistrantKey(registrant.registrantKey.c),
    }));

    return {
      data: parsedResponse,
    };
  },
});
