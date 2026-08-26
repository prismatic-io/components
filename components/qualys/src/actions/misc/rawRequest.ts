import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { createClassicClient, gatewayRequest } from "../../client";
import { ApiPlane } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Send a raw HTTP request to the Qualys API. Select the API plane (Gateway or Classic) since they differ in host, authentication, and content type.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, plane: selectedPlane, ...httpInputs },
  ) => {
    let baseUrl: string;
    let headers: Record<string, string>;
    if (selectedPlane === ApiPlane.Gateway) {
      const client = await gatewayRequest(connection, debug, async (c) => c);
      baseUrl = client.defaults?.baseURL || "";
      headers = (client.defaults?.headers as Record<string, string>) || {};
    } else {
      const client = createClassicClient(connection, debug);
      baseUrl = client.defaults?.baseURL || "";
      headers = (client.defaults?.headers as Record<string, string>) || {};
    }
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpInputs, debugRequest: debug },
      headers,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
