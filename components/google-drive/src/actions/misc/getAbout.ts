import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAboutInputs } from "../../inputs";
import { getAboutOutputSchema } from "../../outputSchemas";
import { getAboutExamplePayload } from "../../examplePayloads";
export const getAbout = action({
  display: {
    label: "Get About",
    description:
      "Gets information about the user's Drive and system capabilities",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fields }) => {
    const drive = createClient(connection);
    const { data } = await drive.about.get({
      fields: util.types.toString(fields),
    });
    return {
      data,
    };
  },
  inputs: getAboutInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAboutOutputSchema,
  }),
  examplePayload: getAboutExamplePayload,
});
export default getAbout;
