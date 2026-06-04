






export const getCampaignResponse = {
  dateStart: "2017-02-01T00:00:00+00:00",
  description: "Campaign example",
  responsibleID: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  dateModified: "2017-01-10T07:43:12+00:00",
  dateCreated: "2017-01-10T07:43:12+00:00",
  ID: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
  presetID: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
  deadline: "2017-03-03T00:00:00",
  createdByID: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  accountID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
  closed: false,
  key: "excp",
  name: "Example campaign",
  thumbnailURL:
    "https://bynder-public-eu-central-1.s3.eu-central-1.amazonaws.com:443/workflow/campaign/988BBB04-F0E2-4A28-B5F892890849BAFE/FEE78434-649A-449B-A62A1C6C6D59CAC3/500x500.jpg",
  campaignMetaproperties: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
};

export const listCampaignsResponse = [
  getCampaignResponse,
  {
    dateStart: "2017-04-01T00:00:00+00:00",
    description: "Spring Campaign 2017",
    responsibleID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
    dateModified: "2017-03-15T09:22:00+00:00",
    dateCreated: "2017-03-15T09:22:00+00:00",
    ID: "A7B8C9D0-E1F2-3456-A7B8-C9D0E1F23456",
    deadline: "2017-05-01T00:00:00",
    createdByID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
    accountID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
    presetID: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    closed: false,
    key: "spr17",
    name: "Spring Campaign 2017",
    thumbnailURL:
      "https://bynder-public-eu-central-1.s3.eu-central-1.amazonaws.com:443/workflow/campaign/988BBB04-F0E2-4A28-B5F892890849BAFE/FEE78434-649A-449B-A62A1C6C6D59CAC3/500x500.jpg",
    campaignMetaproperties: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
  },
];

export const createCampaignResponse = {
  name: "Example campaign",
  key: "excp",
  description: "Campaign example",
  dateStart: "2015-01-01T00:00:00",
  deadline: "2015-09-04T00:00:00",
  responsibleID: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  campaignMetaproperties: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
};

export const selectCampaignResponse = [
  {
    key: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    label: "Example campaign (ID: B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901)",
  },
];
