import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectJobRequisitionExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import { paginateData } from "../util";

export const selectJobRequisition = dataSource({
  display: {
    label: "Select Job Requisition",
    description: "Select a Job Requisition from the dropdown list",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateData(client, "/JobRequisition", true, {});
    const result = (data as Record<string, unknown>[]).map<Element>((jobRequisition) => ({
      label: `${jobRequisition.jobReqId} - ${jobRequisition.jobCode}`,
      key: jobRequisition.jobReqId as string,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectJobRequisitionExamplePayload,
});
