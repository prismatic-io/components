import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createResponseExamplePayload } from "../examplePayloads";
import { connectionInput, modelInput, timeout } from "../inputs";

const createFunctionCallingResponse = action({
  display: {
    label: "Create Response",
    description: "Create a response using the responses endpoint",
  },
  inputs: {
    connection: connectionInput,
    model: { ...modelInput, default: "gpt-4.1" },
    input: input({
      label: "Input",
      type: "string",
      comments: "The input text to process",
      required: true,
    }),
    timeout,
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );
    const { data } = await client.post("/v1/responses", {
      model: params.model,
      input: params.input,
    });
    return { data };
  },
  examplePayload: createResponseExamplePayload,
});

export default { createFunctionCallingResponse };
