import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, userIdInput } from "../inputs";
import { listLabelsExamplePayload, getLabelByNameExamplePayload } from "../examplePayloads";

const listLabels = action({
  display: {
    label: "List Labels",
    description: "List all labels within this account",
  },
  inputs: { connection: connectionInput, userId: userIdInput },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.labels.list({
      userId: params.userId,
    });
    return { data };
  },
  examplePayload: listLabelsExamplePayload,
});

const getLabelByName = action({
  display: {
    label: "Get Label by Name",
    description: "Get a label (including ID) by its name",
  },
  inputs: {
    connection: connectionInput,
    labelName: input({
      label: "Label Name",
      type: "string",
      required: true,
    }),
    userId: userIdInput,
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.labels.list({
      userId: params.userId,
    });
    const labels = data.labels.filter((label) => label.name === params.labelName);
    if (labels.length > 0) {
      return { data: labels[0] };
    }
    throw new Error(`Unable to find a label with name ${params.labelName}`);
  },
  examplePayload: getLabelByNameExamplePayload,
});

export default { getLabelByName, listLabels };
