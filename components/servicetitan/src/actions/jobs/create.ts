import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobResponse } from "../../examplePayloads";
import {
  appointments,
  businessUnitId,
  campaignId,
  connection,
  customerId,
  customerPo,
  customFields,
  externalData,
  invoiceSignatureIsRequired,
  jobGeneratedLeadSource,
  jobTypeId,
  locationId,
  priority,
  projectId,
  summary,
  tagTypeIds,
} from "../../inputs";

export const createJob = action({
  display: {
    label: "Create Job",
    description: "Create a job",
  },
  inputs: {
    connection,
    customerId,
    locationId,
    businessUnitId: {
      ...businessUnitId,
      required: true,
      comments: "ID of the job's business unit",
    },
    jobTypeId: {
      ...jobTypeId,
      required: true,
      comments: "ID of the job's type",
    },
    priority: {
      ...priority,
      required: true,
      comments: "Priority of the job",
    },
    campaignId: {
      ...campaignId,
      required: true,
      comments: "ID of the job's campaign",
    },
    appointments,
    jobGeneratedLeadSource,
    projectId,
    summary: {
      ...summary,
      required: false,
      comments: "Job summary",
    },
    customFields: {
      ...customFields,
      comments: "Custom fields for the job",
    },
    tagTypeIds: {
      ...tagTypeIds,
      comments: "Tag type IDs for the job",
    },
    externalData,
    invoiceSignatureIsRequired,
    customerPo,
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      locationId,
      appointments,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      invoiceSignatureIsRequired,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      projectId,
      summary,
      tagTypeIds,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.post(`/jobs`, {
      customerId,
      locationId,
      appointments,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      invoiceSignatureIsRequired,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      projectId,
      summary,
      tagTypeIds,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createJobResponse,
  },
});
