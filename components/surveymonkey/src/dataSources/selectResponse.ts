import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { paginateResults } from "../util";
import { connectionInput, surveyId } from "../inputs";
import type { SurveyResponse } from "../types";




export const selectResponse = dataSource({
  display: {
    label: "Select Response",
    description:
      "A picklist of responses for the selected SurveyMonkey survey.",
  },
  inputs: {
    connection: connectionInput,
    surveyId: {
      ...surveyId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, surveyId }) => {
    const client = createClient(connection, false);

    const response = await paginateResults<SurveyResponse>(
      client,
      `/surveys/${surveyId}/responses`,
      true,
    );

    const result = response.data
      .map<Element>((item) => ({
        label: `${item.id} (${item.response_status}${item.date_created ? ` - ${item.date_created}` : ""})`,
        key: item.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "5007154402 (completed - 2026-01-15T10:30:00+00:00)",
        key: "5007154402",
      },
      {
        label: "5007154403 (partial - 2026-01-16T14:20:00+00:00)",
        key: "5007154403",
      },
    ],
  },
});
