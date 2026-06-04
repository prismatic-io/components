import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectContainerExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const selectContainer = dataSource({
  display: {
    label: "Select Container",
    description: "Select a container from your Azure Storage account",
  },
  inputs: {
    azureConnection: connectionInput,
  },
  perform: async (_context, { azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containers: Element[] = [];

    for await (const container of client.listContainers({})) {
      containers.push({
        label: container.name,
        key: container.name,
      });
    }

    return { result: containers };
  },
  dataSourceType: "picklist",
  examplePayload: selectContainerExamplePayload,
});
