import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, phoneNumber } from "../../inputs";

export const deletePhoneNumberAndAssociatedElements = action({
  display: {
    label: "Delete Phone Number and Associated Elements",
    description:
      "Given a phone number, this endpoint deletes from the Gong system any leads or contacts with a matching phone number or mobile phone number.",
  },
  perform: async (context, { connection, phoneNumber }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/data-privacy/erase-data-for-phone-number`,
      {
        params: { phoneNumber: encodeURIComponent(phoneNumber) },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    phoneNumber,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
    },
  },
});
