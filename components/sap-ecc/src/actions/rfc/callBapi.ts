import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { callBapiExamplePayload } from "../../examplePayloads";
import { callBapiInputs } from "../../inputs";
import {
  buildSoapAction,
  buildSoapEnvelope,
  getResponseBody,
  parseAndCheckFault,
  performCommit,
} from "../../util";

export const callBapi = action({
  display: {
    label: "Call BAPI",
    description:
      "Call any SAP BAPI or RFC function module by name with XML parameters.",
  },
  inputs: callBapiInputs,
  examplePayload: callBapiExamplePayload,
  perform: async (
    context,
    {
      connection,
      endpoint,
      bapiName,
      bapiParameters,
      commitTransaction,
      waitOnCommit,
    },
  ) => {
    const debug = context.debug.enabled;
    const client = createClient(connection, context, debug);

    const soapBody = buildSoapEnvelope(bapiName, bapiParameters || "");

    const { data } = await client.post(endpoint, soapBody, {
      headers: { SOAPAction: buildSoapAction(bapiName) },
    });

    const parsed = await parseAndCheckFault(data);
    const bapiResponse = getResponseBody(parsed);

    if (commitTransaction) {
      const commitResponse = await performCommit(
        client,
        endpoint,
        waitOnCommit,
      );
      return { data: { bapiResponse, commitResponse } };
    }

    return { data: bapiResponse };
  },
});
