import { util, action, input } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { businessByNameResponse } from "../examplePayloads";
import { myConnectionField, version } from "../inputs";


export const businessByName = action({
  display: {
    label: "Get Business By Name",
    description: "Fetch an business with the provided name.",
  },
  inputs: {
    connection: myConnectionField,
    businessName: input({
      label: "Business Name",
      type: "string",
      clean: util.types.toString,
      required: true,
    }),
    version,
  },
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
