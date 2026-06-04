import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { registerPhoneNumberInputs } from "../inputs/registerPhoneNumberInputs";
import { registerPhoneNumberExamplePayload } from "../examplePayloads";

export const registerPhoneNumber = action({
  display: {
    label: "Register Phone Number",
    description: "Register a phone number for use with WhatsApp.",
  },
  perform: async (
    context,
    { connection, phoneNumberId, pin, dataLocalizationRegion },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const payload = {
      messaging_product: "whatsapp",
      pin,
      data_localization_region: dataLocalizationRegion,
    };
    const { data } = await client.post(`/${phoneNumberId}/register`, payload);
    return {
      data,
    };
  },
  inputs: registerPhoneNumberInputs,
  examplePayload: registerPhoneNumberExamplePayload,
});
