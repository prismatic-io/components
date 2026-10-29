import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectJobRequisitionExamplePayload } from "../examplePayloads";
import { selectJobRequisitionInputs } from "../inputs";
import { paginateData } from "../util";

export const selectJobRequisition = dataSource({
  display: {
    label: "Select Job Requisition",
    description: "A picklist of job requisitions in SAP SuccessFactors.",
  },
  inputs: selectJobRequisitionInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateData(client, "/JobRequisition", true, {});
    const result = (data as Record<string, unknown>[]).map<Element>(
      (jobRequisition) => ({
        label: `${jobRequisition.jobReqId} - ${jobRequisition.jobCode}`,
        key: jobRequisition.jobReqId as string,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectJobRequisitionExamplePayload,
});
