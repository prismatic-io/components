import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { sendIdocExamplePayload } from "../../examplePayloads";
import { sendIdocInputs } from "../../inputs";
import { parseAndCheckFault, parseHtmlResponse } from "../../util";

export const sendIdoc = action({
  display: {
    label: "Send IDoc",
    description:
      "Send an IDoc XML payload to SAP ECC for inbound processing via IDOC_INBOUND_ASYNCHRONOUS.",
  },
  inputs: sendIdocInputs,
  examplePayload: sendIdocExamplePayload,
  perform: async (context, { connection, idocData, endpoint }) => {
    const debug = context.debug.enabled;
    const client = createClient(connection, context, debug);

    const { data } = await client.post(endpoint, idocData);

    const html = parseHtmlResponse(data);
    if (html) {
      if (html.title.toLowerCase().includes("not ok")) {
        throw new Error(`SAP Error: ${html.body || html.title}`);
      }
      return { data: html.body || html.title };
    }

    await parseAndCheckFault(data);

    return { data };
  },
});
