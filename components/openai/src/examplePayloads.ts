export const createChatCompletionExamplePayload = {
  data: {
    id: "chatcmpl-6vf993Onyn1Bwq67AYDTR6fIjzvBu",
    object: "chat.completion",
    created: 1679200883,
    model: "gpt-3.5-turbo-0301",
    usage: { prompt_tokens: 56, completion_tokens: 21, total_tokens: 77 },
    choices: [
      {
        message: {
          role: "assistant",
          content:
            "The 2020 World Series was played at the Globe Life Field in Arlington, Texas, USA.",
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  },
};

export const createImageExamplePayload = {
  data: {
    created: 1589478378,
    data: [
      {
        url: "https://...",
      },
      {
        url: "https://...",
      },
    ],
  },
};

const exampleModelObject = {
  id: "davinci",
  object: "model",
  created: 1649359874,
  owned_by: "openai",
  permission: [
    {
      id: "modelperm-U6ZwlyAd0LyMk4rcMdz33Yc3",
      object: "model_permission",
      created: 1669066355,
      allow_create_engine: false,
      allow_sampling: true,
      allow_logprobs: true,
      allow_search_indices: false,
      allow_view: true,
      allow_fine_tuning: false,
      organization: "*",
      group: null,
      is_blocking: false,
    },
  ],
  root: "davinci",
  parent: null,
};

export const listModelsExamplePayload = {
  data: {
    object: "list",
    data: [exampleModelObject],
  },
};

export const getModelByIdExamplePayload = {
  data: exampleModelObject,
};

export const uploadFileExamplePayload = {
  data: {
    id: "file-abc123",
    object: "file",
    bytes: 120000,
    created_at: 1677610602,
    filename: "training_data.jsonl",
    purpose: "fine-tune",
    status: "processed",
    status_details: null,
  },
};

export const listFilesExamplePayload = {
  data: {
    object: "list",
    data: [
      {
        id: "file-abc123",
        object: "file",
        bytes: 120000,
        created_at: 1677610602,
        filename: "training_data.jsonl",
        purpose: "fine-tune",
        status: "processed",
        status_details: null,
      },
      {
        id: "file-xyz456",
        object: "file",
        bytes: 250000,
        created_at: 1677610702,
        filename: "validation_data.jsonl",
        purpose: "fine-tune",
        status: "processed",
        status_details: null,
      },
    ],
  },
};

export const retrieveFileExamplePayload = uploadFileExamplePayload;

export const deleteFileExamplePayload = {
  data: {
    id: "file-abc123",
    object: "file",
    deleted: true,
  },
};

export const createResponseExamplePayload = {
  data: {
    id: "resp-123",
    object: "response",
    created: 1677652288,
    model: "gpt-4.1",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Here is the response to your input.",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 82,
      completion_tokens: 18,
      total_tokens: 100,
    },
  },
};
