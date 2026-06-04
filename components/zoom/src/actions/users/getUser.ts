import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  userId,
  loginType,
  encryptedEmail,
  searchByUniqueId,
} from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of a user by Id",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, userId, loginType, encryptedEmail, searchByUniqueId },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.get(`/users/${userId}`, {
      params: {
        login_type: loginType,
        encrypted_email: encryptedEmail,
        search_by_unique_id: searchByUniqueId,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    userId,
    loginType,
    encryptedEmail,
    searchByUniqueId,
  },
  examplePayload: getUserExamplePayload,
});
