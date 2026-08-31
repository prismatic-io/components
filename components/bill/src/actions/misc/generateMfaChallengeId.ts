import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { generateMfaChallengeIdInputs } from "../../inputs/misc";
import { generateMfaChallengeIdExamplePayload } from "../../examplePayloads";
export const generateMfaChallengeId = action({
  display: {
    label: "Generate MFA Challenge ID",
    description:
      "Create a trusted MFA session. Secondary (backup) phone MFA is no longer supported.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const sessionId = loginData.sessionId;
    const sendData = {};
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId,
    });
    const { data } = await client.post("/MFAChallenge.json", stringifiedData);
    return {
      data: { ...cleanReturnData(data), sessionId },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: generateMfaChallengeIdExamplePayload.data,
  }),
  inputs: generateMfaChallengeIdInputs,
  examplePayload: generateMfaChallengeIdExamplePayload,
});
