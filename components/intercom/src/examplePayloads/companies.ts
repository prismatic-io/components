export const CREATE_COMPANY_EXAMPLE_PAYLOAD = {
  type: "company",
  id: "531ee472cce572a6ec000006",
  name: "Blue Sun",
  plan: "plan1",
  company_id: "6",
  remote_created_at: 1394531169,
  created_at: 1394533506,
  updated_at: 1396874658,
  size: 85,
  website: "http://www.example.com",
  industry: "Manufacturing",
  monthly_spend: 49,
  session_count: 26,
  user_count: 10,
  custom_attributes: {
    paid_subscriber: true,
    team_mates: 0,
  },
};

export const GET_COMPANY_EXAMPLE_PAYLOAD = {
  data: {
    type: "company",
    company_id: "1",
    id: "667d60808a68186f43bafd31",
    app_id: "this_is_an_id128_that_should_be_at_least_",
    name: "company1",
    remote_created_at: 1719492736,
    created_at: 1719492736,
    updated_at: 1719492736,
    monthly_spend: 0,
    session_count: 0,
    user_count: 1,
    tags: {
      type: "tag.list",
      tags: [],
    },
    segments: {
      type: "segment.list",
      segments: [],
    },
    plan: {},
    custom_attributes: {},
  },
};

export const DELETE_COMPANY_EXAMPLE_PAYLOAD = {
  data: {
    id: "5ba682d23d7cf92bef87bfd4",
    object: "company",
    deleted: "true",
  },
};
