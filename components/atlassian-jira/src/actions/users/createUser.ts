import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../connections/auth";
import { createUserExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  displayName,
  dynamicValues,
  emailAddress,
  fieldValues,
  notifications,
  password,
  username,
} from "../../inputs";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user record.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.jiraConnection, context.debug.enabled);
    const { data } = await client.post("/user", {
      name: util.types.toString(params.username),
      password: util.types.toString(params.password),
      emailAddress: util.types.toString(params.emailAddress),
      displayName: util.types.toString(params.displayName),
      notification: util.types.toBool(params.notifications),
      ...params.fieldValues,
      ...params.dynamicValues,
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    emailAddress: { ...emailAddress, required: true },
    username,
    password,
    notifications,
    displayName,
    dynamicValues,
    fieldValues,
  },
  examplePayload: createUserExamplePayload,
});
