import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createV3Client } from "../client";
import { selectVersionExamplePayload } from "../examplePayloads";
import { selectVersionInputs } from "../inputs";

const selectVersion = dataSource({
  display: {
    label: "Select Version",
    description: "Select a version from the specified project.",
  },
  inputs: selectVersionInputs,
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
  examplePayload: selectVersionExamplePayload,
});

export default {
  selectVersion,
};
