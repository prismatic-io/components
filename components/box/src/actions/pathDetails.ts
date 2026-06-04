import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { pathDetailsExamplePayload } from "../examplePayloads";

export const pathDetails = action({
  display: {
    label: "Path Details",
    description:
      "Get detailed information about folders/files in the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));

    return {
      data: pathEntries,
    };
  },
  inputs: { path, boxConnection: connectionInput },
  examplePayload: pathDetailsExamplePayload,
});
