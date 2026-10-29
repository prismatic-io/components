import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { healthcheckExamplePayload } from "../../examplePayloads/misc";
import { healthCheckInputs } from "../../inputs";

export const healthCheck = action({
  display: {
    label: "Health Check",
    description: "Check the health of the System Surveyor API connection.",
  },
  inputs: healthCheckInputs,
  perform: async (context, { ssvConnection }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get("/");

    return { data };
  },
  examplePayload: healthcheckExamplePayload,
});
