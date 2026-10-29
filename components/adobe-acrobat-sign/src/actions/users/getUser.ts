import { action } from "@prismatic-io/spectral";
import { getUserInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { DetailedUserInfoResponse } from "../../types";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description:
      "Retrieves detailed information about the user in the caller account.",
  },
  inputs: getUserInputs,
  perform: async (context, { connection, userId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { data } = await client.get<DetailedUserInfoResponse>(
      `/users/${userId}`,
    );

    return {
      data,
    };
  },
  examplePayload: getUserExamplePayload,
});
