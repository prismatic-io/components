import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_COMPANY_EXAMPLE_PAYLOAD } from "../../examplePayloads/companies";
import { connectionInput } from "../../inputs";
import {
  industryInput,
  monthlySpendInput,
  planInput,
  remoteCreatedAtInput,
  sizeInput,
  websiteInput,
} from "../../inputs/companies";
import { nameInput } from "../../inputs/contacts";
import { companyIdInput } from "../../inputs/general";

export const updateCompany = action({
  display: {
    label: "Update Company",
    description: "Update an existing Company",
  },
  inputs: {
    connection: connectionInput,
    company_id: companyIdInput,
    remote_created_at: { ...remoteCreatedAtInput, required: false },
    name: { ...nameInput, required: false },
    monthly_spend: monthlySpendInput,
    plan: planInput,
    size: sizeInput,
    website: websiteInput,
    industry: industryInput,
  },
  perform: async (context, { connection, ...payload }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/companies", payload);
    return { data };
  },
  examplePayload: { data: CREATE_COMPANY_EXAMPLE_PAYLOAD },
});
