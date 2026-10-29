import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserResponse as updateUserResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  email,
  firstname,
  id,
  lastname,
  password,
  profileId,
  username,
} from "../../inputs";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Edit an existing user",
  },
  inputs: {
    id: {
      ...id,
      comments: "The ID of the user to update",
      dataSource: "selectUser",
    },
    email: {
      ...email,
      required: false,
    },
    password: {
      ...password,
      required: false,
    },
    profileId: {
      ...profileId,
      required: false,
    },
    firstname: {
      ...firstname,
      required: false,
    },
    lastname: {
      ...lastname,
      required: false,
    },
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
      id,
      bodyData,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/users/${id}`, {
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
    data: updateUserResponse,
  },
});
