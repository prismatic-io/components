import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobResponse as updateJobResponse } from "../../examplePayloads";
import {
  businessUnitId,
  campaignId,
  connection,
  customerId,
  customerPo,
  customFields,
  externalData,
  jobGeneratedLeadSource,
  jobId,
  jobTypeId,
  locationId,
  priority,
  shouldUpdateInvoiceItems,
  summary,
  tagTypeIds,
} from "../../inputs";

export const updateJob = action({
  display: {
    label: "Update Job",
    description: "Update a job",
  },
  inputs: {
    connection,
    jobId,
    customerId: {
      ...customerId,
      required: false,
    },
    locationId: {
      ...locationId,
      required: false,
    },
    businessUnitId: {
      ...businessUnitId,
      comments: "ID of the job's business unit",
    },
    jobGeneratedLeadSource,
    jobTypeId: {
      ...jobTypeId,
      comments: "ID of the job's type",
    },
    priority: {
      ...priority,
      comments: "Priority of the job",
    },
    campaignId: {
      ...campaignId,
      comments: "ID of the job's campaign",
    },
    summary: {
      ...summary,
      required: false,
      comments: "Job summary",
    },
    shouldUpdateInvoiceItems,
    customFields: {
      ...customFields,
      comments: "Custom fields for the job",
    },
    tagTypeIds: {
      ...tagTypeIds,
      comments: "Tag type IDs for the job",
    },
    externalData,
    customerPo,
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      locationId,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      summary,
      tagTypeIds,
      jobId,
      shouldUpdateInvoiceItems,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.patch(`/jobs/${jobId}`, {
      customerId,
      locationId,
      businessUnitId,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      campaignId,
      summary,
      shouldUpdateInvoiceItems,
      customFields,
      tagTypeIds,
      externalData,
      customerPo,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateJobResponse,
  },
});
