import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { myConnectionField, userId, version } from "../inputs";

export const getUserById = action({
  display: {
    label: "Get User By Id",
    description: "Get the information and metadata of a given user.",
  },
  perform: async (context, { version, connection, userId }) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.get(`/${userId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    userId,
    version,
  },
});
