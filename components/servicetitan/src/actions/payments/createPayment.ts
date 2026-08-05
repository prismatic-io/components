import { action } from "@prismatic-io/spectral";
import { createPaymentExamplePayload } from "../../examplePayloads";
import { createPaymentInputs } from "../../inputs";
export const createPayment = action({
  display: {
    label: "Create Payment (Deprecated)",
    description:
      "Deprecated: ServiceTitan removed the POST /payments endpoint from the V2 API. Payment creation is no longer supported via the API",
  },
  inputs: createPaymentInputs,
  perform: async () => {
    throw new Error(
      "ServiceTitan removed the Create Payment endpoint (POST /payments) from the V2 API. Payment creation is no longer supported via the API.",
    );
  },
  examplePayload: createPaymentExamplePayload,
});
