import { action } from "@prismatic-io/spectral";
import { CREATE_REGISTRANT_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { createRegistrantInputs } from "../../inputs/registrants/createRegistrantInputs";
import { bigIntTransformerConfig, parseRegistrantKey } from "../../utils";
import { Registrant } from "../../interfaces";

export const createRegistrant = action({
  display: {
    label: "Create Registrant",
    description: "Register an attendee for a scheduled webinar.",
  },
  inputs: createRegistrantInputs,
  examplePayload: CREATE_REGISTRANT_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      webinarKey,
      responses,
      email,
      firstName,
      address,
      city,
      organization,
      country,
      lastName,
      industry,
      jobTitle,
      numberOfEmployees,
      phone,
      purchasingRole,
      purchasingTimeFrame,
      questionAndComments,
      source,
      state,
      zipCode,
    },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
    const payload = {
      firstName,
      lastName,
      email,
      source,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      organization,
      jobTitle,
      questionAndComments,
      industry,
      numberOfEmployees,
      purchasingTimeFrame,
      purchasingRole,
      responses,
    };

    const { data: payloadWithoutParsing } = await client.post<Registrant>(
      url,
      payload,
      {
        transformResponse: bigIntTransformerConfig.transformResponse,
      },
    );

    const data = {
      ...payloadWithoutParsing,
      registrantKey: parseRegistrantKey(payloadWithoutParsing.registrantKey.c),
    };

    return {
      data,
    };
  },
});
