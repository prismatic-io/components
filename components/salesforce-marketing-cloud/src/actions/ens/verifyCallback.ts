import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_VERIFY_PATH } from "../../constants";
import { verifyCallbackExamplePayload } from "../../examplePayloads";
import { verifyCallbackInputs } from "../../inputs";

export const verifyCallback = action({
  examplePayload: verifyCallbackExamplePayload,
  display: {
    label: "Verify ENS Callback",
    description:
      "Verify ownership of an ENS callback endpoint using the verification key.",
  },
  inputs: verifyCallbackInputs,
  perform: async (context, { connection, callbackId, verificationKey }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      callbackId,
      verificationKey,
    };

    const { data } = await client.post(ENS_VERIFY_PATH, body);

    return { data };
  },
});
