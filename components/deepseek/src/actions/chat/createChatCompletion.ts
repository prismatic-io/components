import { action, Connection } from "@prismatic-io/spectral";
import { CREATE_CHAT_COMPLETION_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createDeepSeekClient } from "../../client";
import createChatCompletionInputs from "../../inputs/chat/createChatCompletionInputs";

export const createChatCompletion = action({
  display: {
    label: "Create Chat Completion",
    description: "Creates a model response for the given chat conversation.",
  },
  inputs: createChatCompletionInputs,
  perform: async (
    context,
    {
      connection,
      messages,
      model,
      frequence_penalty,
      max_tokens,
      presence_penalty,
      response_format,
      stop,
      stream,
      include_usage,
      temperature,
      top_p,
      tools,
      tool_choice,
      log_probs,
      top_logprobs,
    }
  ) => {
    const client = createDeepSeekClient(
      connection as Connection,
      context.debug.enabled
    );

    const payload = {
      messages,
      model,
      frequence_penalty,
      max_tokens,
      presence_penalty,
      response_format: {
        type: response_format,
      },
      stop,
      stream,
      stream_options: stream ? { include_usage: include_usage } : undefined,
      temperature,
      top_p,
      tools,
      tool_choice,
      log_probs,
      top_logprobs,
    };

    const { data } = await client.post("/chat/completions", payload);

    return { data };
  },
  examplePayload: CREATE_CHAT_COMPLETION_EXAMPLE_PAYLOAD,
});
