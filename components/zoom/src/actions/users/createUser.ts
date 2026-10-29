import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  userAction,
  email,
  firstName,
  lastName,
  userType,
  zoomPhone,
  displayName,
  userPassword,
  zoomOneType,
  planUnitedType,
} from "../../inputs";
import { createUserExamplePayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      action,
      email,
      firstName,
      lastName,
      displayName,
      password,
      userType,
      zoomPhone,
      zoomOneType,
      planUnitedType,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.post(`/users`, {
      action,
      user_info: {
        email,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
        password,
        type: userType,
        feature: {
          zoom_phone: zoomPhone,
          zoom_one_type: zoomOneType,
        },
        plan_united_type: planUnitedType,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    action: userAction,
    email,
    firstName,
    lastName,
    displayName,
    password: userPassword,
    userType,
    zoomPhone,
    zoomOneType,
    planUnitedType,
  },
  examplePayload: createUserExamplePayload,
});
