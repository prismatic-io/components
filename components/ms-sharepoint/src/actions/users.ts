import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the user that is currently logged in",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/me");
    return { data };
  },
  inputs: { connection },
  examplePayload: {
    data: {
      businessPhones: ["+1 555 555 5555"],
      displayName: "exampleUser",
      givenName: "exampleUser",
      jobTitle: "Retail Manager",
      mail: "someoneV@example.onmicrosoft.com",
      mobilePhone: "+1 555 555 5555",
      officeLocation: "example",
      preferredLanguage: "en-US",
      surname: "Example",
      id: "3693-4789-a1c3-f4de565f",
    },
  },
});

export default { getCurrentUser };
