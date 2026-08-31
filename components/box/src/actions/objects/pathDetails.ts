import { action, outputSchema, util } from "@prismatic-io/spectral";
import { FILE_TYPE, FOLDER_TYPE } from "../../constants";
import { createAuthorizedClient } from "../../client";
import { pathDetailsExamplePayload } from "../../examplePayloads";
import { pathDetailsInputs } from "../../inputs";
import { pathDetailsOutputSchema } from "../../outputSchemas";
import { getPathEntries, pathLeafName } from "../../util";
export const pathDetails = action({
  display: {
    label: "Get Path Details",
    description:
      "Get detailed information about folders/files in the specified path.",
  },
  performSafety: "notAllowed",
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    return {
      data: pathEntries,
    };
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => {
    const name = pathLeafName(path);
    return {
      data: [
        {
          ...pathDetailsExamplePayload.data[0],
          name,
          type: name.includes(".") ? FILE_TYPE : FOLDER_TYPE,
        },
      ],
    };
  },
  inputs: pathDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pathDetailsOutputSchema,
  }),
  examplePayload: pathDetailsExamplePayload,
});
