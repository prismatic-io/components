





export const createChatCompletionExamplePayload = {
  data: {
    id: "a733959b-03c4-4944-b53a-af900075ba57",
    object: "chat.completion",
    created: 1743770302,
    model: "grok-3-mini-fast-beta",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "101 multiplied by 3 equals 303.",
          reasoning_content:
            'First, the user asked: "What is 101*3?" This is a simple multiplication question.\n\nI need to calculate 101 multiplied by 3. Let me do that mentally: 101 times 3 is 303.\n\nTo double-check: 100 times 3 is 300, and 1 times 3 is 3, so 300 + 3 = 303. Yes, that\'s correct.\n\nAs a helpful assistant, I should respond clearly and directly. Since this is straightforward, I don\'t need to add extra fluff unless it\'s necessary.\n\nThe system prompt says: "You are a helpful assistant that can answer questions and help with tasks." So, answering directly fits.\n\nI should ensure my response is polite and engaging, but keep it concise.\n\nPossible response: "101 multiplied by 3 equals 303."\n\nI could make it a bit more conversational: "Sure, let me calculate that for you. 101 times 3 is 303."\n\nSince the user might be testing basic math, I could explain briefly, but that might be overkill for such a simple operation.\n\nFinally, structure the response: Start with the answer, and if needed, add any follow-up.\n\nResponse: "The result of 101 multiplied by 3 is 303."',
          refusal: null,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 32,
      completion_tokens: 10,
      total_tokens: 299,
      prompt_tokens_details: {
        text_tokens: 32,
        audio_tokens: 0,
        image_tokens: 0,
        cached_tokens: 0,
      },
      completion_tokens_details: {
        reasoning_tokens: 257,
        audio_tokens: 0,
        accepted_prediction_tokens: 0,
        rejected_prediction_tokens: 0,
      },
    },
    system_fingerprint: "fp_11dc627712",
  },
};
