import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { GET_REGISTRANTS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { getRegistrantInputs } from "../../inputs/registrants/getRegistrantInputs";
import { bigIntTransformerConfig, parseRegistrantKey } from "../../utils";

export const getRegistrant = action({
  display: {
    label: "Get Registrant",
    description: "Retrieve registration details for a specific registrant.",
  },
  inputs: getRegistrantInputs,
  examplePayload: GET_REGISTRANTS_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, webinarKey, registrantKey },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants/${registrantKey}`;
    const { data: payloadWithoutParsing } = await client.get(url, {
      transformResponse: bigIntTransformerConfig.transformResponse,
    });

    const registrantKeyFromPayload = payloadWithoutParsing.registrantKey.c;
    const data = {
      ...payloadWithoutParsing,
      registrantKey: parseRegistrantKey(registrantKeyFromPayload),
    };

    return {
      data,
    };
  },
});
