import { action } from "@prismatic-io/spectral";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooks } from "../../utils/webhooks";

export default action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks configured for a specific list/audience.",
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
  perform: async (_context, { connection, listId }) => {
    const webhooks = await listWebhooks(connection, listId);
    return { data: webhooks };
  },
});
