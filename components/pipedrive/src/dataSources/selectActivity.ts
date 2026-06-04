import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { WebhookVersion } from "../constants";

interface Activity {
  id: number;
  subject: string;
  type: string;
}

export const selectActivity = dataSource({
  display: {
    label: "Select Activity",
    description: "Select an Activity from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Activity>(client, "activities", {}, true);

    const objects = sortRecords(data, "subject").map<Element>((activity) => ({
      key: activity.id.toString(),
      label: activity.type ? `${activity.subject} (${activity.type})` : activity.subject,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Follow-up call (call)", key: "1" }],
  },
});
