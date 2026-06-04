import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, dealIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const deleteDealProduct = action({
  display: {
    label: "Delete Deal Product",
    description: "Deletes an attached product from a deal.",
  },
  perform: async (context, { connection, id, productAttachmentId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.delete(`/deals/${id}/products/${productAttachmentId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    productAttachmentId: input({
      label: "Product Attachment ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The product attachment ID",
    }),
  },
});
