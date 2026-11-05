import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { unenrollUserFactorExamplePayload } from "../../examplePayloads/users";
import { unenrollUserFactorInputs } from "../../inputs/users";

export const unenrollUserFactor = action({
  display: {
    label: "Unenroll User Factor",
    description: "Unenrolls a specific factor for the specified user.",
  },
  inputs: unenrollUserFactorInputs,
  perform: async (context, { connection, userId, factorId, removeRecoveryEnrollment }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(
      `/users/${encodeURIComponent(userId)}/factors/${encodeURIComponent(factorId)}`,
      {
        params: { removeRecoveryEnrollment },
      },
    );

    return {
      data: {
        id: factorId,
        status: "UNENROLLED",
      },
    };
  },
  examplePayload: unenrollUserFactorExamplePayload,
});
