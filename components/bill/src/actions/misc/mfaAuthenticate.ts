import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { mfaAuthenticateInputs } from "../../inputs/misc";
import { mfaAuthenticateExamplePayload } from "../../examplePayloads";
export const mfaAuthenticate = action({
  display: {
    label: "Authenticate MFA Session",
    description: "Authenticate an MFA session. Sessions last only 30 days.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, challengeId, token, sessionId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const deviceId = `Device-${context.integration.name.replace(/\s/g, "")}`;
    const sendData = {
      rememberMe: true,
      challengeId,
      machineName: "Instance",
      token,
      deviceId,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId,
    });
    const { data } = await client.post(
      "/MFAAuthenticate.json",
      stringifiedData,
    );
    return {
      data: { ...cleanReturnData(data), deviceId },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: mfaAuthenticateExamplePayload.data,
  }),
  inputs: mfaAuthenticateInputs,
  examplePayload: mfaAuthenticateExamplePayload,
});
