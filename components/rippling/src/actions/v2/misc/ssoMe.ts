import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getSsoMeExamplePayload } from "../../../examplePayloads";
import { getSsoMeInputs } from "../../../inputs";

export const getSsoMe = action({
  display: {
    label: "Get SSO Me (V2)",
    description: "Retrieve SSO information of the current user.",
  },
  inputs: getSsoMeInputs,
  examplePayload: getSsoMeExamplePayload,
  perform: async (context, { connection, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get("/sso-me", {
      params: {
        expand,
      },
    });
    return { data };
  },
});
