import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_ROLE } from "../constants";
import {
  createCompletionsExamplePayload,
  summarizeTextExamplePayload,
} from "../examplePayloads";
import { connectionInput, messagesInput, modelInput } from "../inputs";

const createCompletions = action({
  display: {
    label: "Create Multiple Chat Completions",
    description: "Generate multiple completions for a set of prompts",
  },
  inputs: {
    connection: connectionInput,
    model: modelInput,
    messages: {
      ...messagesInput,
      default: JSON.stringify(
        [
          "How are you today?",
          "What is Azure OpenAI?",
          "Why do children love dinosaurs?",
          "Generate a proof of Euler's identity",
          "Describe in single words only the good things that come into your mind about your mother.",
        ],
        null,
        2,
      ),
    },
  },
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const prompts = params.messages as string[];
    const data = await client.chat.completions.create({
      model: params.model,
      messages: prompts.map((prompt) => ({
        role: DEFAULT_ROLE,
        content: prompt,
      })),
    });
    return { data };
  },
  examplePayload: createCompletionsExamplePayload,
});

const summarizeText = action({
  display: {
    label: "Summarize Text",
    description: "Summarize a given text",
  },
  inputs: {
    connection: connectionInput,
    model: modelInput,
    textToSummarize: input({
      label: "Text to Summarize",
      type: "string",
      required: true,
      example:
        "Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists. As a layman I would say: 'I think we have it'. Would you agree? Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.",
      clean: util.types.toString,
    }),
  },
  perform: async (context, params) => {
    const client = createClient(params.connection);
    const data = await client.chat.completions.create({
      model: params.model,
      messages: [
        {
          role: DEFAULT_ROLE,
          content: `Summarize the following text.\n\nText:\n""""""\n${params.textToSummarize}\n""""""\n\nSummary:`,
        },
      ],
    });
    return { data: data.choices };
  },
  examplePayload: summarizeTextExamplePayload,
});

export default { createCompletions, summarizeText };
