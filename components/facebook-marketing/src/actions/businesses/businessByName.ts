import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { businessByNameResponse } from "../../examplePayloads";
import { businessByNameInputs } from "../../inputs";
export const businessByName = action({
  display: {
    label: "Get Business By Name",
    description: "Fetch a business with the provided name.",
  },
  inputs: businessByNameInputs,
  perform: async (context, { version, connection, businessName }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const response = await client.get("/me/businesses");
    if (response.data.data) {
      for (const business of response.data.data) {
        if (business.name === businessName) {
          return { data: business };
        }
      }
    }
    throw new Error(`Unable to find a business with the name ${businessName}`);
  },
  examplePayload: businessByNameResponse,
});
