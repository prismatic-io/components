import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectMessageTemplateExamplePayload } from "../examplePayloads";
import { selectMessageTemplateInputs } from "../inputs";
import type { MessageTemplateSummary } from "../types";
import { toSortedPicklist } from "../util";
export const selectMessageTemplate = dataSource({
  display: {
    label: "Select Message Template",
    description: "A picklist of message templates in the Workday tenant.",
  },
  inputs: selectMessageTemplateInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.connect}/messageTemplates`);
    return {
      result: toSortedPicklist(data.data, (item: MessageTemplateSummary) => ({
        key: item.id,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectMessageTemplateExamplePayload,
});
