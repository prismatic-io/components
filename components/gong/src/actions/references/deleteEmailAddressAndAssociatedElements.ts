import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, emailAddress } from "../../inputs";

export const deleteEmailAddressAndAssociatedElements = action({
  display: {
    label: "Delete Email Address and Associated Elements",
    description:
      "Given an email address, this endpoint deletes from the Gong system any calls or email messages that reference this address.",
  },
  perform: async (context, { connection, emailAddress }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/data-privacy/erase-data-for-email-address`,
      {
        params: { emailAddress },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    emailAddress,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
    },
  },
});
