import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { postMarkAppInstalledExamplePayload } from "../../examplePayloads";
import { postMarkAppInstalledInputs } from "../../inputs";

const postMarkAppInstalled = action({
  display: {
    label: "Post Mark App Installed (V1)",
    description: "Mark App Installed.",
  },
  inputs: postMarkAppInstalledInputs,
  examplePayload: postMarkAppInstalledExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.post("/mark_app_installed", {});
    return { data };
  },
});

export default {
  postMarkAppInstalled,
};
