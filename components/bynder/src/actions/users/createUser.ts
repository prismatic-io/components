import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  email,
  firstname,
  lastname,
  password,
  profileId,
  username,
} from "../../inputs";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user",
  },
  inputs: {
    email,
    password,
    profileId,
    firstname,
    lastname,
    username,
    bodyData,
    connection,
  },
  perform: async (
    context,
    {
      connection,
      email,
      firstname,
      lastname,
      password,
      profileId,
      username,
      bodyData,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/users`, {
      email,
      firstname,
      lastname,
      password,
      profileId,
      username,
      ...bodyData,
    });
    return { data };
  },
  examplePayload: {
    data: createUserResponse,
  },
});
