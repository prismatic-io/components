import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getTeamInfoExamplePayload } from "../../examplePayloads";
import { getTeamMembersInputs } from "../../inputs";
import { getTeamMembersOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const getTeamMembers = action({
  display: {
    label: "Get Team Members",
    description: "Get Team Members by Member ID, External ID, or Email",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);
    try {
      const data = await dbx.teamMembersGetInfoV2({
        members: [
          {
            ".tag": params.lookupKey,
            [params.lookupKey]: params.lookupValue,
          },
        ] as any,
      });
      return {
        data,
      };
    } catch (err) {
      handleDropboxError(err);
    }
  },
  inputs: getTeamMembersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTeamMembersOutputSchema,
  }),
  examplePayload: {
    data: getTeamInfoExamplePayload,
  },
});
