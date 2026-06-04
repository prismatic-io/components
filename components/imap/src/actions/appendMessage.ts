import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { appendMessageExamplePayload } from "../examplePayloads";
import { appendMessageInputs } from "../inputs/actions";

export const appendMessage = action({
  display: {
    label: "Append Message",
    description: "Appends a new message to an existing mailbox",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const data = await client.append(
        util.types.toString(params.path),
        Buffer.from(util.types.toString(params.content)),
      );
      return {
        data: JSON.parse(
          JSON.stringify(data, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        ),
      };
    } finally {
      client.close();
    }
  },
  inputs: appendMessageInputs,
  examplePayload: appendMessageExamplePayload,
});
