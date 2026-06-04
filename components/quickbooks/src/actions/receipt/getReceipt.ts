import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, receiptId } from "../../inputs";

export const getReceipt = action({
  display: {
    label: "Get Sales Receipt",
    description: "Retrieve the information and metadata of a Sales Receipt by ID.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    const { data } = await client.get(`/salesreceipt/${params.receiptId}`);
    return { data };
  },
  inputs: { quickbooksConnection: connectionInput, receiptId },
});
