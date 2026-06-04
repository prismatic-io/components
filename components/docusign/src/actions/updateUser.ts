import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput, userId } from "../inputs";
import { userJson } from "../json/userJson";

export const updateUser = action({
  display: {
    label: "Update User",
    description:
      "To update user information for a specific user, submit a Users object with updated field values in the request body of this operation.",
  },
  perform: async (context, { connection, jsonInput, userId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/users/${userId}`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(userJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/users/users/update/",
    },
    userId,
  },
});
