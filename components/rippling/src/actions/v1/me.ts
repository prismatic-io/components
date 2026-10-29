import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getMeExamplePayload } from "../../examplePayloads";
import { getMeInputs } from "../../inputs";

const getMe = action({
  display: {
    label: "Get Me (V1)",
    description: "GET Current User.",
  },
  inputs: getMeInputs,
  examplePayload: getMeExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get("/me");
    return { data };
  },
});

export default {
  getMe,
};
