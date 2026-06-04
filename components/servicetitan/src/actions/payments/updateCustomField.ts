import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, operations } from "../../inputs";

export const updatePaymentCustomFields = action({
  display: {
    label: "Update Payment Custom Fields",
    description: "Update custom fields for specified payments",
  },
  inputs: {
    connection,
    operations,
  },
  perform: async (context, { connection, operations }) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.patch(`/payments/custom-fields`, {
      operations,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: {},
  },
});
