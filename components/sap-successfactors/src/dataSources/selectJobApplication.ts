import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectJobApplicationExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import { paginateData } from "../util";

export const selectJobApplication = dataSource({
  display: {
    label: "Select Job Application",
    description: "Select a Job Application from the dropdown list",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateData(client, "/JobApplication", true, {});
    const result = (data as Record<string, unknown>[]).map<Element>((jobApplication) => ({
      label: `${jobApplication.firstName} ${jobApplication.lastName} - Job Requisition #${jobApplication.jobReqId}`,
      key: jobApplication.applicationId as string,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectJobApplicationExamplePayload,
});
