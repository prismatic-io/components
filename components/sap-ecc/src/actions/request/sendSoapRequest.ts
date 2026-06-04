import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";

import { sendSoapRequestExamplePayload } from "../../examplePayloads";
import { sendSoapRequestInputs } from "../../inputs";
import { performCommit } from "../../util/soap";
import { getResponseBody, parseAndCheckFault } from "../../util/xml";

export const sendSoapRequest = action({
  display: {
    label: "Send SOAP Request",
    description:
      "Send a SOAP XML request to an SAP ECC RFC endpoint and return the raw XML response.",
  },
  inputs: sendSoapRequestInputs,
  examplePayload: sendSoapRequestExamplePayload,
  perform: async (
    context,
    {
      connection,
      soapBody,
      soapAction,
      endpoint,
      responseAsJson,
      commitTransaction,
      waitOnCommit,
    },
  ) => {
    const debug = context.debug.enabled;
    const client = createClient(connection, context, debug);

    const { data } = await client.post(endpoint, soapBody, {
      headers: {
        SOAPAction: soapAction,
      },
    });

    let soapResponse: unknown = data;

    if (responseAsJson) {
      const parsed = await parseAndCheckFault(data);
      soapResponse = getResponseBody(parsed);
    } else if (typeof data === "string" && data.includes("Fault")) {
      await parseAndCheckFault(data);
    }

    if (commitTransaction) {
      const commitResponse = await performCommit(
        client,
        endpoint,
        waitOnCommit,
      );
      return { data: { soapResponse, commitResponse } };
    }

    return { data: soapResponse };
  },
});
