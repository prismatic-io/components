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
      { label: "gpt-6-astra", key: "gpt-6-astra" },
      { label: "gpt-6.1-sol", key: "gpt-6.1-sol" },
      { label: "gpt-6-luna", key: "gpt-6-luna" },
      { label: "gpt-image-2.5-flare", key: "gpt-image-2.5-flare" },
    ],
  },
});

export default { listModels };
