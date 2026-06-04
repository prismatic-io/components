import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { listSharedDocumentsExamplePayload } from "../examplePayloads/actions";

const listSharedDocuments = action({
  display: {
    label: "List Shared Documents",
    description: "Lists documents shared with the user.",
  },
  inputs: {
    connection,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/me/insights/shared");
    return { data };
  },
  examplePayload: listSharedDocumentsExamplePayload,
});

export default {
  listSharedDocuments,
};
