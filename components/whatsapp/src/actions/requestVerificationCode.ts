import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { requestVerificationCodeInputs } from "../inputs/requestVerificationCodeInputs";
import { requestVerificationCodeExamplePayload } from "../examplePayloads";
import FormData from "form-data";

export const requestVerificationCode = action({
  display: {
    label: "Request Verification Code",
    description: "Send a verification code to verify a phone number.",
  },
  perform: async (
    context,
    { connection, phoneNumberId, codeMethod, language },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const formData = new FormData();
    formData.append("code_method", codeMethod);
    formData.append("language", language);

    const { data } = await client.post(
      `/${phoneNumberId}/request_code`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    return {
      data,
    };
  },
  inputs: requestVerificationCodeInputs,
  examplePayload: requestVerificationCodeExamplePayload,
});
