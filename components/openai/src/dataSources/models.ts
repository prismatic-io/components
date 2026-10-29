import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, timeout } from "../inputs";

const listModels = dataSource({
  display: {
    label: "List Models",
    description:
      "Lists the currently available models, and provides basic information about each one such as the owner and availability.",
  },
  inputs: {
    connection: connectionInput,
    timeout,
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.timeout);
    const { data } = await client.get<{ data: { id: string }[] }>("/v1/models");

    const models = data.data.map<string>(({ id }) => id).sort();
    const choices = models.map<Element>((id) => ({
      label: id,
      key: id,
    }));

    return { result: choices };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "gpt-4-turbo-preview", key: "gpt-4-turbo-preview" },
      { label: "gpt-4", key: "gpt-4" },
      { label: "gpt-3.5-turbo", key: "gpt-3.5-turbo" },
      { label: "dall-e-3", key: "dall-e-3" },
    ],
  },
});

export default { listModels };
