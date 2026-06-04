import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { jobCancelReasonsDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { JobCancel } from "../interfaces";

export const selectJobCancelReason = dataSource({
  display: {
    label: "Select Job Cancel Reason",
    description:
      "Select a job cancel reason from a dropdown menu (up to 10,000 reasons)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "jpm");
    let reasons: JobCancel[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/job-cancel-reasons`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      reasons = [...reasons, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    const objects = reasons
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((reason) => ({
        key: reason.id.toString(),
        label: `${reason.name} (ID: ${reason.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: jobCancelReasonsDatasource,
  },
});
