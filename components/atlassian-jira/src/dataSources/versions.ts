import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createV3Client } from "../connections/auth";
import { connectionInput, projectId } from "../inputs";

const selectVersion = dataSource({
  display: {
    label: "Select Version",
    description: "Select a version from the specified project.",
  },
  inputs: {
    jiraConnection: connectionInput,
    projectId: {
      ...projectId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { jiraConnection, projectId }) => {
    const client = await createV3Client(jiraConnection);

    let nextPage = 0;
    let versions: { id: string; name: string }[] = [];
    let shouldContinue = true;

    do {
      const {
        data,
      }: {
        data: {
          values: {
            id: string;
            name: string;
          }[];
          maxResults: number;
          startAt: number;
          isLast: boolean;
        };
      } = await client.get(`/project/${projectId}/version`, {
        params: {
          startAt: nextPage,
        },
      });

      versions = [...versions, ...data.values];
      nextPage = data.maxResults + data.startAt;
      shouldContinue = !data.isLast;
    } while (shouldContinue);

    const result = versions
      .map<Element>(({ name, id }) => ({
        label: name,
        key: util.types.toString(id),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "New Version 1", key: "10000" },
      { label: "New Version 5", key: "10005" },
    ],
  },
});

export default {
  selectVersion,
};
