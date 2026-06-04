import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listHomeContentsExamplePayload } from "../../examplePayloads";
import { listHomeContentsInputs } from "../../inputs";

export const listHomeContents = action({
  display: {
    label: "List Home Contents",
    description:
      "Lists all Home objects, including dashboards, folders, reports, sheets, templates, and workspaces.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection }) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/home`);
    return { data };
  },
  inputs: listHomeContentsInputs,
  examplePayload: listHomeContentsExamplePayload,
});
