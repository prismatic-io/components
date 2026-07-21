import { action } from "@prismatic-io/spectral";
import { CREATE_REGISTRANT_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createGotoWebinarClient } from "../../client";
import { createRegistrantInputs } from "../../inputs";
import { bigIntTransformerConfig, parseRegistrantKey } from "../../util";
import type { Registrant } from "../../types";
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
      firstName,
      lastName,
      email,
      phone,
      mailingAddress,
      additionalFields,
      source,
    },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
    const payload = {
      firstName,
      lastName,
      email,
      source,
      address: mailingAddress.address,
      city: mailingAddress.city,
      state: mailingAddress.state,
      zipCode: mailingAddress.zipCode,
      country: mailingAddress.country,
      phone,
      organization: additionalFields.organization,
      jobTitle: additionalFields.jobTitle,
      questionAndComments: additionalFields.questionAndComments,
      industry: additionalFields.industry,
      numberOfEmployees: additionalFields.numberOfEmployees,
      purchasingTimeFrame: additionalFields.purchasingTimeFrame,
      purchasingRole: additionalFields.purchasingRole,
      responses: additionalFields.responses,
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
