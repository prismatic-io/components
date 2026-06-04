import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the user that is currently logged in",
  },
  perform: async (_context, params) => {
    const drive = createClient(params.connection);
    const {
      data: { user },
    } = await drive.about.get({ fields: "user" });

    return { data: user };
  },
  inputs: { connection },
  examplePayload: {
    data: {
      kind: "drive#user",
      displayName: "Example User",
      photoLink: "https://lh3.googleusercontent.com/a/Example",
      me: true,
      permissionId: "12345678901234567890",
      emailAddress: "example@gmail.com",
    },
  },
});
