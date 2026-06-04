import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_COMPANY_EXAMPLE_PAYLOAD } from "../../examplePayloads/companies";
import { connectionInput } from "../../inputs";
import {
  industryInput,
  monthlySpendInput,
  nameInput,
  planInput,
  remoteCreatedAtInput,
  sizeInput,
  websiteInput,
} from "../../inputs/companies";
import { companyIdInput } from "../../inputs/general";

export const createCompany = action({
  display: {
    label: "Create Company",
    description: "Create a new Company",
  },
  inputs: {
    connection: connectionInput,
    company_id: companyIdInput,
    remote_created_at: remoteCreatedAtInput,
    name: nameInput,
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
