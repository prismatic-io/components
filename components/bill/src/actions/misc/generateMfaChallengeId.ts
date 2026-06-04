import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { generateMfaChallengeIdInputs } from "../../inputs/misc";
import { generateMfaChallengeIdExamplePayload } from "../../examplePayloads";

export const generateMfaChallengeId = action({
  display: {
    label: "Generate an MFA Challenge ID",
    description: "Use this action to create a trusted MFA session.",
  },
  perform: async (context, { connection, useBackup }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const sessionId = loginData.sessionId;
    const sendData = { useBackup };
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
  inputs: generateMfaChallengeIdInputs,
  examplePayload: generateMfaChallengeIdExamplePayload,
});
