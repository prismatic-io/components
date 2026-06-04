import { action } from "@prismatic-io/spectral";
import createUserInputs from "../../inputs/users/createUser";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { createUserExamplePayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user",
  },
  inputs: {
    ...createUserInputs,
  },
  perform: async (context, { connection, userName, userEmail }) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.post("/v3/Users", {
      Name: userName,
      EmailAddress: userEmail,
    });
    return { data: cleanOdata(response.data) };
  },
  examplePayload: createUserExamplePayload,
});
